import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const allCookies = await cookies();
    const cookieList: Record<string, string> = {};
    for (const c of allCookies.getAll()) {
      cookieList[c.name] = c.value;
    }

    return NextResponse.json({
      serverSession: !!session,
      session: session ? { user: session.user, accessTokenPresent: !!session.accessToken } : null,
      cookies: cookieList,
      nodeEnv: process.env.NODE_ENV || null,
      nextAuthSecretSet: !!process.env.NEXTAUTH_SECRET,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
