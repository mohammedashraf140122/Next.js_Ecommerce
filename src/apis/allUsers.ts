const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export default async function getAllUsers(): Promise<any[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch users: ${response.status}`);
    }

    const result = await response.json();
    // API responses in this project usually wrap data in `data`
    return result.data || result;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
