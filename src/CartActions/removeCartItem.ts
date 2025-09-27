// Client-safe action: call local server proxy so client doesn't need to supply token
export async function removeCartItemAction(productId: string) {
  const response = await fetch(`/api/cart/${productId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    const text = await response.text();
    let body: any;
    try {
      body = JSON.parse(text);
    } catch (e) {
      body = { raw: text };
    }
    if (response.status === 401) return body;
    throw new Error(body?.message || `Failed to remove cart item: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
