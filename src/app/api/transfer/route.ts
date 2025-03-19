import { NextResponse } from "next/server";
// import { sendUSDT } from "@/lib/covalent/transfer";
export async function POST() {
  // await sendUSDT();
  return NextResponse.json({ message: 'Transfer' });
}

