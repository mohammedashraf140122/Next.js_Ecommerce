import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import getMyToken from "@/utilities/token";
import { authOptions } from "@/auth";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // Log incoming request cookie header for debugging
    try {
      const cookieHeader = request.headers.get("cookie");
      console.log(`/api/cart/${id} PUT - request cookie header:`, cookieHeader);
    } catch (e) {
      console.log(`/api/cart/${id} PUT - failed to read cookie header`, e);
    }

    const session = await getServerSession(authOptions);
    console.log(`/api/cart/${id} PUT - server session present:`, !!session);

    let token = session?.accessToken as string | undefined;
    if (!token) {
      const fallback = await getMyToken();
      if (fallback && typeof fallback === "string") token = fallback;
      console.log(`/api/cart/${id} PUT - used fallback token present:`, !!fallback);
    }

    if (!token) {
      return NextResponse.json({ message: "Login First" }, { status: 401 });
    }

    const body = await request.json();
    // Accept either `count` or `quantity` from client, forward as `count` to external API
    const count = body?.count ?? body?.quantity ?? null;
    if (count == null) {
      return NextResponse.json({ message: "count (quantity) is required" }, { status: 400 });
    }

    const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

    const forwardedHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      token: token,
    };

    console.log(`/api/cart/${id} PUT - forwarding headers:`, forwardedHeaders);

    const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
      method: "PUT",
      headers: forwardedHeaders,
      body: JSON.stringify({ count }),
    });

    const text = await response.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { raw: text };
    }

    if (!response.ok) {
      console.log(`/api/cart/${id} PUT - external API error body:`, data);
      return NextResponse.json({ message: data?.message || data?.raw || "Failed to update cart item" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update cart item";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // Log incoming cookie header for debugging
    try {
      const cookieHeader = request.headers.get("cookie");
      console.log(`/api/cart/${id} DELETE - request cookie header:`, cookieHeader);
    } catch (e) {
      console.log(`/api/cart/${id} DELETE - failed to read cookie header`, e);
    }

    const session = await getServerSession(authOptions);
    console.log(`/api/cart/${id} DELETE - server session present:`, !!session);

    let token = session?.accessToken as string | undefined;
    if (!token) {
      const fallback = await getMyToken();
      if (fallback && typeof fallback === "string") token = fallback;
      console.log(`/api/cart/${id} DELETE - used fallback token present:`, !!fallback);
    }

    if (!token) {
      return NextResponse.json({ message: "Login First" }, { status: 401 });
    }

    const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

    const forwardedHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      token: token,
    };

    console.log(`/api/cart/${id} DELETE - forwarding headers:`, forwardedHeaders);

    const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
      method: "DELETE",
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
      console.log(`/api/cart/${id} DELETE - external API error body:`, data);
      return NextResponse.json({ message: data?.message || data?.raw || "Failed to delete cart item" }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete cart item";
    return NextResponse.json({ message }, { status: 500 });
  }
}
