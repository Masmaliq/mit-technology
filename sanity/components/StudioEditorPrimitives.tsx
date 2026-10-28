"use client";

import type { ReactNode } from "react";
import styles from "./StudioEditorSystem.module.css";

type StudioBackLinkProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
};

export function StudioBackLink({ children, href, onClick }: StudioBackLinkProps) {
  if (href) {
    return <a className={styles.backLink} href={href}><span aria-hidden="true">←</span>{children}</a>;
  }

  return <button className={styles.backLink} onClick={onClick} type="button"><span aria-hidden="true">←</span>{children}</button>;
}
