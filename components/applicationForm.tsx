"use client";

import { useState } from "react";
import { createApplication, updateApplication } from "@/lib/actions";
import type { Application } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  editing?: Application | null;
  onDone?: () => void;
};

const STATUSES = ["applied", "interviewing", "offer", "rejected"];

export function ApplicationForm({ editing, onDone }: Props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(editing?.status ?? "applied");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const data = {
      company: fd.get("company") as string,
      role: fd.get("role") as string,
      status,
      url: (fd.get("url") as string) || undefined,
      notes: (fd.get("notes") as string) || undefined,
    };

    if (editing) {
      await updateApplication(editing.id, data);
    } else {
      await createApplication({
        ...data,
        appliedAt: new Date().toISOString(),
      });
      (e.target as HTMLFormElement).reset();
      setStatus("applied");
    }

    setLoading(false);
    onDone?.();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          name="company"
          defaultValue={editing?.company}
          placeholder="Company"
          required
        />
        <Input
          name="role"
          defaultValue={editing?.role}
          placeholder="Role / Position"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="url"
          defaultValue={editing?.url ?? ""}
          placeholder="Job URL (optional)"
        />
      </div>

      <Textarea
        name="notes"
        defaultValue={editing?.notes ?? ""}
        placeholder="Notes (optional)"
        rows={2}
        className="resize-none"
      />

      <Button type="submit" disabled={loading} className="self-end">
        {loading ? "Saving..." : editing ? "Update" : "Add Application"}
      </Button>
    </form>
  );
}