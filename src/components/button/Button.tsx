import type { ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button({ children, variant = "primary", type = "button", onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.root} ${variant === "secondary" ? styles.secondary : styles.primary}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
