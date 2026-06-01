"use client";

import { useState } from "react";
import { deleteApplication } from "@/lib/actions";
import { ApplicationForm } from "./applicationForm";
import type { Application } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  applied: "secondary",
  interviewing: "outline",
  offer: "default",
  rejected: "destructive",
};

type Props = {
  data: Application[];
};

export function ApplicationTable({ data }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-16 text-sm">
        No applications yet. Add one above.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {data.map((app) => (
        <Card key={app.id}>
          <CardContent className="p-0">
            {editingId === app.id ? (
              <div className="p-4 flex flex-col gap-3">
                <ApplicationForm editing={app} onDone={() => setEditingId(null)} />
                <Button
                  variant="ghost"
                  size="sm"
                  className="self-start text-muted-foreground"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{app.company}</p>
                    <p className="text-sm text-muted-foreground truncate">{app.role}</p>
                  </div>

                  <Badge variant={STATUS_VARIANTS[app.status] ?? "secondary"} className="capitalize shrink-0">
                    {app.status}
                  </Badge>

                  <p className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </p>

                  {app.url && (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline shrink-0 hidden sm:block"
                    >
                      Link ↗
                    </a>
                  )}

                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => setEditingId(app.id)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteApplication(app.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {app.notes && (
                  <div className="px-4 pb-3 border-t pt-2">
                    <p className="text-xs text-muted-foreground">{app.notes}</p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}