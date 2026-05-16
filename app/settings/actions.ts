"use server";

import { revalidatePath } from "next/cache";
import { scanMediaRoots } from "@/lib/media/scanner";

export async function runMediaScan() {
  await scanMediaRoots();
  revalidatePath("/");
  revalidatePath("/settings");
}
