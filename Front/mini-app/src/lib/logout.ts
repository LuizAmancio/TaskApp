"use client";
import { mutate } from "swr";

export async function logout() {
  await fetch("/api/logout", { method: "POST" });
  mutate("/api/me"); // força revalidação no SWR
}
