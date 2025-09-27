// Client-safe: call local server proxy to update cart item
export async function updateCartAction(productId: string, quantity: number) {
  const response = await fetch(`/api/cart/${productId}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count: quantity }),
  });
  if (!response.ok) {
    const text = await response.text();
    let body: any;
    try {
      body = JSON.parse(text);
    } catch (e) {
      body = { raw: text };
    }
    // If unauthenticated, return body so caller can prompt login instead of throwing
    if (response.status === 401) return body;
    throw new Error(body?.message || `Failed to update cart item: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
