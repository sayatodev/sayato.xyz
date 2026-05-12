---
title: "Write-up: Jersey CTF VI (OSINT) Talking Portraits"
date: "2026-05-12"
tags: ["CTF", "Write-up", "OSINT"]
---

# Jersey CTF VI: Talking Portraits

Deadlines are always the procrastination killer.  
As the COMP3633 deadline for write-up submission is approaching, I am finally writing my CTF write-ups, ending the long-lived "Stay tuned for future updates" screen at `/blog`.

---

## The Challenge

> There were 8 solves in this challenge.

In this OSINT challenge, our goal is to find:

- The year in which the 2nd volume of a certain book was created
- The author's last name
- The meeting location based on the instructions given to two groups
- The name of a deceased person based on the description

We'll solve it step-by-step.

### 1. The 2nd Volume

From the challenge description, there are some clues about the book:

- _"the volumes are related to images placed on exterior walls of someone meaningful to the inhabitants."_
- the two groups are traveling within the Via della Lungara-Lungaretta & neighborhoods area.
- The 2nd volume is from the 19th century.

From the above clues, after some extensive googling, we found the book _Indicazione delle immagini di Maria Santissima: collocate sulle mure esterne di taluni edifici dell'alma città di Roma: con appendice_ (available [here](https://archive.org/details/indicazionedelle00rufi)) is an exact match of the description. It is an 1853 guidebook in Italian, detailing the street-side images of the Virgin Mary on buildings throughout the area, with notes on their locations, appearance, and local devotion.

Now we already have:

- The year in which volume 2 was created - `1853`
- The author's last name - `Rufini`

With the book identified, solving the remaining parts should not be too hard. Right?  
Unfortunately not. The pain only starts here.

### 2. Meeting Location

Let's look at the provided description about the two groups' routes.

> One group was given the following instructions:  
> Start at a building that previously had an image supported by four cherubs covered by a canopy in a stucco frame. There previously was a shelf underneath.  
> End at a building that previously had an image of a decorated woman painted on canvas. Two other panels are attached and an inscription was able to be read invoking mercy for a guilty man. Afterwards, head west and wait at the intersection.  

> The other group was given the following instructions:  
> Start at a building previously related to a Fratellini family near where a stucco frame was found, directly on the main road.  
> You will see the other group on your left, continue with them to the final location.  
> Your final location previously had a wooden canopy with a inscription asking someone from Carmel to pray for them. There was also a marble kneeler, cup for holy water, and lamp.


The Internet Archive nicely provides us with a [full OCR text](https://archive.org/stream/indicazionedelle00rufi/indicazionedelle00rufi_djvu.txt) of the book. So we downloaded it, processed the text with GPT-5.4 to identify the locations, and quickly plotted their routes on Google Maps.

![Plot of the two routes](/blog_assets/2026/jersey-ctf-talking-portraits/routes.png)

#### Where Do They _Meet_ ?
We had a real debate on this.  
The flag requires us to provide the `MeetingLocation`. But where do they meet?

- It could be the intersection, where they physically meet... but the intersection did not really have a name. Could it be the buildings nearby? Maybe the plaza?
- It could also be the artwork, their final destination... but the artwork is hung on the wall of the church. Do we just use the church's name?

This was ambiguous, and we, mostly me, Fai and Vow[^1], had a real debate on it. We even brought it to the organizers through their ticketing system at one point, but it did not help much.

All until we realized:

> Upon reaching the final location, leave a message at the place to your left that mentions a well known man that passed away last year.  

This sentence from the challenge description might actually mean the intended _meeting location_ is the _place to your left_.

#### _What's Left_?
So we thought, perhaps it is better to find the _place to your left_ first. And then... we got another debate.

Assuming we are facing the entrance of the church, which had the artwork, our left would be... the Community of Sant'Egidio, which shares the same building, or the Museum of Rome in Trastevere.

Now the Community of Sant'Egidio did indeed mention Pope Francis, who passed away in 2025. Surely that counts as a famous person. We could not really instantly find any matching person that the museum mentions, but we still thought it could be a huge possibility.

Obviously, the Community of Sant'Egidio did not give us the correct flag. We tried tens, if not hundreds, of possible combinations of the flag, but still could not solve it.

So then, you might ask, what if it is the _left_ when viewed facing the artwork? For sure we considered that. But there was not really a spot that matched the description too well.

Or was there? Several hours into this challenge, my guy Vow sent this [link](https://www.palazzopallavicini.com/events/jack-vettriano-a-roma/), a webpage about an event held in the Piazza di Sant'Egidio area that mentions a Scottish artist who passed away last year. According to the website, it is held in _PALAZZO VELLI_. So we tried the new flags, but to no avail.

So I suddenly remembered seeing a similar venue on Google Maps previously, and decided to dig deeper. In fact, the venue is located... not directly left, but in the front-left direction when viewed facing the artwork. And... it is called "Palazzo Velli Expo" on Google Maps.

![Map with spots](/blog_assets/2026/jersey-ctf-talking-portraits/map_spots.png)

So I tried plugging in all the values again to the flag format:

`jctf{1853_Rufini_PalazzoVelliExpo_JackVettriano}`

Profit!

There goes my 14-hour journey in Sant'Egidio.

[^1]: Fai and Vow are firebird members who joined the competition with us.      
