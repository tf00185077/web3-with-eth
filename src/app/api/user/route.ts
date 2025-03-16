import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
const schema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});
// 註冊用戶
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, email, password } = body;
  const { success } = schema.safeParse(body);
  if (!success) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
  const isEmailExists = await db.user.findUnique({
    where: { email },
  });
  if (isEmailExists) {
    return NextResponse.json({ message: "Email already exists" }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await db.user.create({
      data: { name: username, email, password: hashedPassword },
    });
    console.log(user);
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}