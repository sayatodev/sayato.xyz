"use client"; // motion requires client rendering

import * as React from "react";
import { motion } from "motion/react";
import styles from "../page.module.css";

import { Fira_Code, Noto_Sans_JP } from "next/font/google";

const firaCode = Fira_Code({
  preload: false,
});
const NotoSans = Noto_Sans_JP({
  preload: false,
});

export interface ISectionContainerProps {
  children: React.ReactNode;
  mono?: boolean;
  bordered?: boolean;
  noAnimation?: boolean;
  coloured?: boolean;
  noMargin?: boolean;
}

export function SectionContainer(props: ISectionContainerProps) {
  const classes =
    styles.section_container +
    " " +
    (props.mono ? firaCode.className : NotoSans.className) +
    " " +
    (props.bordered ? styles.bordered : "") +
    " " +
    (props.coloured ? styles.coloured : "") +
    " " +
    (props.noMargin ? styles.noMarginBottom : "");

  const animated = !props.noAnimation;
  const Element = animated ? motion.div : "div";

  return (
    <Element
      className={classes}
      {...(animated && {
        initial: { y: 70, opacity: 0 },
        whileInView: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeInOut" },
        },
      })}
    >
      {props.children}
    </Element>
  );
}
