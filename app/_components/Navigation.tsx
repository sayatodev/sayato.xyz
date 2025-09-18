"use client";

import Link from "next/link";
import { SectionContainer } from "./SectionContainer";

import styles from "@/app/page.module.css";
import { useConfig } from "@/app/_contexts/Config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

export function Navigation() {
  const config = useConfig();
  const activeSegment = useSelectedLayoutSegment();
  const [isMobile, setIsMobile] = useState(false);
  const toggleCursorAnimation = () => {
    config.setCursorAnimationEnabled(!config.cursorAnimationEnabled);
  };

  useEffect(() => {
    setIsMobile(
      !!window.matchMedia("only screen and (max-width: 760px)").matches
    );
  }, []);

  const navItems = [
    { title: "Home", url: "/", activeSegment: null },
    { title: "Blog", url: "/blog", activeSegment: "blog" },
  ];

  return (
    <SectionContainer mono noAnimation>
      <div className={styles.navContainer}>
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={styles.navItem}
            data-active={item.activeSegment === activeSegment ? true : undefined}
          >
            {item.title}
          </Link>
        ))}
        <div className={styles.navSpacer} />
        {!isMobile && (
          <div
            onClick={toggleCursorAnimation}
            className={
              styles.navItem +
              " " +
              (config.cursorAnimationEnabled ? styles.inactive : "")
            }
            title="Toggle Cursor Animation"
          >
            <FontAwesomeIcon icon={faArrowPointer} />
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
