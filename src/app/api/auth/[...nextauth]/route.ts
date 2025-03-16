import { auth } from "@/lib/utils";
import { NextResponse } from "next/server";
export async function GET() {
  const session = await auth.auth();
  return NextResponse.json(session);
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const result = await auth.signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("登入錯誤:", error);

    if (error instanceof Response && error.status === 302) {
      const session = await auth.auth();
      return NextResponse.json({ success: true, session });
    }

    return NextResponse.json(
      { success: false, error: "帳號或密碼錯誤" },
      { status: 500 }
    );
  }
}
