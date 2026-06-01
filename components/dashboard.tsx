"use client";

import { useState, useMemo } from "react";
import { ApplicationForm } from "./applicationForm";
import { ApplicationTable } from "./applicationTable";
import { StatusFilter } from "./statusFilter";
import { SortDropdown } from "./sortDropdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Application } from "@/db/schema";

type SortKey = "newest" | "oldest" | "company";

const STATS_CONFIG = [
  { label: "Total", key: "all" },
  { label: "Applied", key: "applied" },
  { label: "Interviewing", key: "interviewing" },
  { label: "Offers", key: "offer" },
];

export function Dashboard({ initialData }: { initialData: Application[] }) {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    let rows = filter === "all" ? initialData : initialData.filter((a) => a.status === filter);

    rows = [...rows].sort((a, b) => {
      if (sort === "newest") return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
      if (sort === "oldest") return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
      return a.company.localeCompare(b.company);
    });

    return rows;
  }, [initialData, filter, sort]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Tracker</h1>
          <p className="text-sm text-muted-foreground mt-1">Keep tabs on every application.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {STATS_CONFIG.map(({ label, key }) => (
            <Card key={key}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">
                  {key === "all"
                    ? initialData.length
                    : initialData.filter((a) => a.status === key).length}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add form */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">New Application</CardTitle>
          </CardHeader>
          <CardContent>
            <ApplicationForm />
          </CardContent>
        </Card>

        {/* Filter + sort */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <StatusFilter value={filter} onChange={setFilter} />
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {/* Table */}
        <ApplicationTable data={filtered} />
      </div>
    </main>
  );
}