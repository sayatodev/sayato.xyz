import * as React from "react";
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
}

export function SectionContainer(props: ISectionContainerProps) {
  const classes =
    styles.section_container +
    " " +
    (props.mono ? firaCode.className : NotoSans.className) +
    " " +
    (props.bordered ? styles.bordered : "");

  return <div className={classes}>{props.children}</div>;
}
