import styles from "./TextField.module.css";

export type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number";
  min?: number;
  max?: number;
  autoComplete?: string;
};

export function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  autoComplete,
}: TextFieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        min={min}
        max={max}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
