"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  try {
    const allCookies = await cookies();
    const encodedToken = allCookies.get(cookieName)?.value;

    if (!encodedToken) {
      console.log("getMyToken - no session cookie found for:", cookieName);
      return null;
    }

    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-key-for-development-only";
    if (!secret) {
      console.log("getMyToken - NEXTAUTH_SECRET is not set; cannot decode session cookie");
      return null;
    }

    try {
      // decode accepts a string or Uint8Array for the secret. Try with the raw secret first.
      let decoded = await decode({ token: encodedToken, secret });

      if (!decoded) {
        // If decode returned falsy, try a Buffer fallback (some runtimes expect Uint8Array)
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          decoded = await decode({ token: encodedToken, secret: Buffer.from(secret) as any });
        } catch (innerErr) {
          console.log("getMyToken - decode (Buffer fallback) failed:", innerErr);
        }
      }

      return (decoded as any)?.accessToken ?? null;
    } catch (err) {
      console.log("getMyToken - decode failed:", err);
      return null;
    }
  } catch (err) {
    console.log("getMyToken - unexpected error reading cookies:", err);
    return null;
  }
}
