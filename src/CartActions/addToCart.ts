export default async function AddToCart(productId: string) {
  try {
  console.log("AddToCart (client) - productId:", productId);
    const response = await fetch(`/api/cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });
  console.log("AddToCart (client) - /api/cart response status:", response.status);
  // Read response body safely (may be JSON or plain text)
  const text = await response.text();
  let data: any = undefined;
  try {
    data = JSON.parse(text);
  } catch (e) {
    data = { raw: text };
  }

  if (!response.ok) {
    // If unauthenticated, return parsed body so UI can handle login flow gracefully
    if (response.status === 401) {
      return data;
    }

    // If the server returned an empty object or empty raw body, treat as unauthenticated to surface login modal
    const isEmptyObject = data && typeof data === "object" && Object.keys(data).length === 0;
    const isEmptyRaw = data && data.raw !== undefined && String(data.raw).trim().length === 0;
    if (isEmptyObject || isEmptyRaw) {
      // Treat as unauthenticated: return payload so caller can decide
      return data;
    }

    // Safely extract an error message if available; avoid complex inspections that can throw
    try {
      if (data && typeof data === "object") {
        if (data.message) {
          console.warn("AddToCart (client) - error response body:", data);
          throw new Error(`Failed to add to cart (status ${response.status}): ${data.message}`);
        }
        if (data.raw && String(data.raw).trim().length > 0) {
          console.warn("AddToCart (client) - error response body:", data);
          throw new Error(`Failed to add to cart (status ${response.status}): ${data.raw}`);
        }
        // empty object or unhelpful payload
      } else if (data && typeof data === "string" && data.trim().length > 0) {
        console.warn("AddToCart (client) - error response body:", data);
        throw new Error(`Failed to add to cart (status ${response.status}): ${data}`);
      }
    } catch (e) {
      // If our inspection threw, fall back to a generic error message below
      console.warn("AddToCart (client) - error while inspecting response body:", e);
    }

    // Generic fallback
    throw new Error(`Failed to add to cart (status ${response.status})`);
  }

  return data;
  } catch (error) {
    console.error("AddToCart failed:", error);
    throw error;
  }
}
