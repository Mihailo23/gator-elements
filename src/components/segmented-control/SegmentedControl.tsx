import styles from "./SegmentedControl.module.css";

export type SegmentedOption = { value: string; label: string };

export type SegmentedControlProps = {
  label: string;
  value: string;
  options: SegmentedOption[];
  onChange: (value: string) => void;
};

export function SegmentedControl({ label, value, options, onChange }: SegmentedControlProps) {
  const labelId = `${label.replace(/\s+/g, "-").toLowerCase()}-seg`;
  return (
    <div className={styles.wrap}>
      <div className={styles.caption} id={labelId}>
        {label}
      </div>
      <div className={styles.row} role="group" aria-labelledby={labelId}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={opt.value === value}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
