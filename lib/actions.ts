"use server";

import { db } from "@/db";
import { applications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getApplications() {
  return db.select().from(applications).all();
}

export async function createApplication(formData: {
  company: string;
  role: string;
  status: string;
  appliedAt: string;
  url?: string;
  notes?: string;
}) {
  await db.insert(applications).values({
    company: formData.company,
    role: formData.role,
    status: formData.status,
    appliedAt: formData.appliedAt,
    url: formData.url ?? null,
    notes: formData.notes ?? null,
  });
  revalidatePath("/");
}

export async function updateApplication(
  id: number,
  data: {
    company?: string;
    role?: string;
    status?: string;
    url?: string;
    notes?: string;
  }
) {
  await db.update(applications).set(data).where(eq(applications.id, id));
  revalidatePath("/");
}

export async function deleteApplication(id: number) {
  await db.delete(applications).where(eq(applications.id, id));
  revalidatePath("/");
}