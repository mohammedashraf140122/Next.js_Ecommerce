const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export interface VerifyTokenResponse {
  status: string;
  message?: string;
  data?: any;
}

// Client-side function - token passed from caller
export default async function verifyToken(token: string): Promise<VerifyTokenResponse | null> {
  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await fetch(`${API_BASE_URL}/auth/verifyToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || `Failed to verify token: ${response.status}`);
    }

    const data = await response.json();
    return data as VerifyTokenResponse;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
