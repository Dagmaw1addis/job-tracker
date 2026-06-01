"use client";

type SortKey = "newest" | "oldest" | "company";

type Props = {
  value: SortKey;
  onChange: (val: SortKey) => void;
};

const OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Company A–Z", value: "company" },
];

export function SortDropdown({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      className="input text-sm py-1.5 w-auto"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}