"use server";
import { cookies } from "next/headers";
import { COOKIE } from "./consts";

export const setCookie = async (name: string, value: string, hours: number) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { ...COOKIE, maxAge: hours * 60 * 60 });
}

export const getCookie = async (name: string): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}
export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}