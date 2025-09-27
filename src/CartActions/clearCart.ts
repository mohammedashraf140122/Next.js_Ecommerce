// Client-safe action: call local server proxy to clear the cart
export async function clearCartAction() {
  const response = await fetch(`/api/cart`, {
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
    throw new Error(body?.message || `Failed to clear cart: ${response.status}`);
  }
  const data = await response.json();
  return data;
}