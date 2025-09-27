const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export interface SignupData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone?: string;
}

export interface SignupResponse {
  message?: string;
  data?: any;
}

export async function signup(data: SignupData): Promise<SignupResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // API returns { message } on error in this project pattern
      const msg = result?.message || `Signup failed: ${response.status}`;
      throw new Error(msg);
    }

    return result as SignupResponse;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}
