import type { ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeProps = { children: ReactNode };

export function Badge({ children }: BadgeProps) {
  return <span className={styles.root}>{children}</span>;
}
