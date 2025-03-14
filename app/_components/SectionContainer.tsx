import * as React from "react";
import styles from "../page.module.css";

export interface ISectionContainerProps {
  children: React.ReactNode;
}

export function SectionContainer(props: ISectionContainerProps) {
  return <div className={styles.section_container}>{props.children}</div>;
}
