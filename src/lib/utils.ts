import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as auth from "../../auth";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export * as auth from "../../auth";

export async function isLoggedIn() {
  const session = await auth.auth();
  return session ? true : false;
}

