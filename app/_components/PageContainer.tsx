"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { useConfig } from "../_contexts/Config";

export interface IPageContainerProps {
  children: React.ReactNode;
}

export function PageContainer(props: IPageContainerProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { cursorAnimationEnabled } = useConfig();

  useEffect(() => {
    document.onmousemove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };
  });

  useEffect(() => {
    const body = document.querySelector("body");
    body?.style.setProperty("--x", `${cursorPos.x}`);
    body?.style.setProperty("--y", `${cursorPos.y}`);
  }, [cursorPos]);

  return (
    <div
      className={styles.page}
      data-cursor-animation={cursorAnimationEnabled || undefined}
    >
      {props.children}
    </div>
  );
}
