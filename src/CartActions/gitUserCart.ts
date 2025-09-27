"use server";
import getMyToken from "@/utilities/token";

export async function getUserCartAction() {
  const token = await getMyToken();
  if (!token) {
    throw Error("Login First");
  }
  const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";
  const cartAPI = `${API_BASE_URL}/cart`;
  const response = await fetch(cartAPI, {
    headers: {
      token: token as string,
    },
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) {
    throw Error(data.message);
  }
  return data;
}
