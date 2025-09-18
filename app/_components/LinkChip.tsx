import * as React from "react";
import styles from "../page.module.css";
import Image from "next/image";
import Link from "next/link";

export interface ILinkChipProps {
  imageUrl?: string;
  title: string;
  description: string;
  color: string;
  url: string;
  small?: boolean;
  cropImage?: boolean;
}

export function LinkChip(props: ILinkChipProps) {
  return (
    <Link
      href={props.url}
      className={
        (props.small ? styles.linkChipSmall : styles.linkChip) +
        " " +
        (props.imageUrl ? "" : styles.linkChipNoThumbnail)
      }
    >
      <div
        className={styles.linkHighlight}
        style={{ backgroundColor: props.color }}
      />
      {props.imageUrl && !props.small && (
        <Image
          src={props.imageUrl}
          width={50}
          height={50}
          alt={`Logo of ${props.title}`}
          className={
            styles.linkChipImg + " " + (props.cropImage ? styles.crop : "")
          }
        />
      )}
      <h3 style={{ gridArea: "title" }}>{props.title}</h3>
      <p style={{ gridArea: "description", whiteSpace: "pre-line" }}>
        {props.description}
      </p>
    </Link>
  );
}
