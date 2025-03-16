import { auth } from "@/lib/utils";
import { NextResponse } from "next/server";
export async function GET() {
  const session = await auth.auth();
  return NextResponse.json(session);
}
