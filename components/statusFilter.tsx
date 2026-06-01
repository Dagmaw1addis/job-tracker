"use client";

import { Badge } from "@/components/ui/badge";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const OPTIONS = ["all", "applied", "interviewing", "offer", "rejected"];

export function StatusFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {OPTIONS.map((opt) => (
        <Badge
          key={opt}
          variant={value === opt ? "default" : "outline"}
          className="cursor-pointer capitalize text-xs px-3 py-1.5"
          onClick={() => onChange(opt)}
        >
          {opt}
        </Badge>
      ))}
    </div>
  );
}