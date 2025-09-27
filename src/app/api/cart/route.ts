import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import getMyToken from "@/utilities/token";
import { authOptions } from "@/auth";

export async function GET() {
  try {
    // Debug: check cookies available in server-side request
    try {
  // Note: attempt to read cookies; detailed enumeration may be blocked by types in this environment
  console.log("/api/cart GET - cookies() was called to check for session cookie");
    } catch (e) {
      console.log("/api/cart GET - failed to read cookies", e);
    }

    const session = await getServerSession(authOptions);

    // Prefer token on session, fall back to cookie-extracted token
    let token = session?.accessToken as string | undefined;
    if (!token) {
      try {
        const fallback = await getMyToken();
        if (fallback && typeof fallback === "string") token = fallback;
        console.log("/api/cart GET - used fallback token present:", typeof fallback === "string");
      } catch (e) {
        console.log("/api/cart GET - fallback token read failed", e);
      }
    }

    if (!token) {
      return NextResponse.json({ message: "Login First" }, { status: 401 });
    }

    // Call the cart API directly with the token (from session or cookie fallback)
    const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";
    const forwardedHeaders: Record<string, string> = {
      Authorization: `Bearer ${token as string}`,
      token: token as string,
    };
    console.log("/api/cart GET - forwarding headers:", forwardedHeaders);
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers: forwardedHeaders,
    });

    const text = await response.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { raw: text };
    }
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to load cart");
    }
    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load cart";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Debug: log request cookie header to check if browser sent session cookie
    try {
      const cookieHeader = request.headers.get("cookie");
      console.log("/api/cart POST - request cookie header:", cookieHeader);
    } catch (e) {
      console.log("/api/cart POST - failed to read request cookie header", e);
    }

    const session = await getServerSession(authOptions);
    // Debug: log session presence and whether accessToken exists
    console.log("/api/cart POST - server session:", !!session);
    console.log("/api/cart POST - session.accessToken present:", !!session?.accessToken);

    // Prefer token on session, fall back to cookie-extracted token
    let token = session?.accessToken as string | undefined;
    if (!token) {
      try {
        const fallback = await getMyToken();
        if (fallback && typeof fallback === "string") token = fallback;
        console.log("/api/cart POST - used fallback token present:", typeof fallback === "string");
      } catch (e) {
        console.log("/api/cart POST - fallback token read failed", e);
      }
    }

    if (!token) {
      console.log("/api/cart POST - No token available, returning 401");
      // Provide a small debug hint in dev to help diagnosis
      if (process.env.NODE_ENV !== "production") {
        const cookieHeader = request.headers.get("cookie") || null;
        const secretSet = !!process.env.NEXTAUTH_SECRET;
        return NextResponse.json(
          {
            message: "Login First",
            _debug: {
              cookiePresent: !!cookieHeader,
              cookieLength: cookieHeader ? cookieHeader.length : 0,
              serverSession: !!session,
              nextAuthSecretSet: secretSet,
            },
          },
          { status: 401 }
        );
      }

      return NextResponse.json({ message: "Login First" }, { status: 401 });
    }

    const body = await request.json();
    const productId = body?.productId;
    if (!productId) {
      return NextResponse.json({ message: "productId is required" }, { status: 400 });
    }

    const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";
    // Forward token as Authorization and also keep legacy `token` header in case API expects it.
    const forwardedHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token as string}`,
      token: token as string,
    };

    console.log("/api/cart POST - forwarding headers:", forwardedHeaders);

    // Some external APIs expect a quantity field; include a default of 1.
    const forwardedBody = JSON.stringify({ productId, quantity: 1 });

    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: forwardedHeaders,
      body: forwardedBody,
    });

  console.log("/api/cart POST - forwarded request to external API, status:", response.status);
    const text = await response.text();
    let data: any = undefined;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { raw: text };
    }
    if (!response.ok) {
      console.log("/api/cart POST - external API error body:", data);
      return NextResponse.json({ message: data?.message || data?.raw || "Failed to add to cart" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to add to cart";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Log incoming cookie header for debugging
    try {
      const cookieHeader = request.headers.get("cookie");
      console.log("/api/cart DELETE - request cookie header:", cookieHeader);
    } catch (e) {
      console.log("/api/cart DELETE - failed to read request cookie header", e);
    }

    const session = await getServerSession(authOptions);
    console.log("/api/cart DELETE - server session present:", !!session);

    let token = session?.accessToken as string | undefined;
    if (!token) {
      try {
        const fallback = await getMyToken();
        if (fallback && typeof fallback === "string") token = fallback;
        console.log("/api/cart DELETE - used fallback token present:", typeof fallback === "string");
      } catch (e) {
        console.log("/api/cart DELETE - fallback token read failed", e);
      }
    }

    if (!token) {
      console.log("/api/cart DELETE - No token available, returning 401");
      return NextResponse.json({ message: "Login First" }, { status: 401 });
    }

    const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

    const forwardedHeaders: Record<string, string> = {
      Authorization: `Bearer ${token as string}`,
      token: token as string,
    };

    console.log("/api/cart DELETE - forwarding headers:", forwardedHeaders);

    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "DELETE",
      headers: forwardedHeaders,
    });

    const text = await response.text();
    let data: any = undefined;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { raw: text };
    }

    if (!response.ok) {
      console.log("/api/cart DELETE - external API error body:", data);
      return NextResponse.json({ message: data?.message || data?.raw || "Failed to clear cart" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to clear cart";
    return NextResponse.json({ message }, { status: 500 });
  }
}


