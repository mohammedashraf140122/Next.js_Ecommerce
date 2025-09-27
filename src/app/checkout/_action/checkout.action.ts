"use server";
import getMyToken from "@/utilities/token";

type ShippingAddressType = {
    details: string;
    city: string;
    phone: string;
}

export interface CheckoutResponse {
    status: string;
    session: {
        url: string;
    };
}

export async function checkoutOnline({
    cartId, 
    url, 
    shippingAddress
}: {
    cartId: string, 
    url: string, 
    shippingAddress: ShippingAddressType
}) {
    try {
        const token = await getMyToken();
        
        if (!token) {
            throw new Error("Authentication token not found");
        }

        const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";
        
        const response = await fetch(`${API_BASE_URL}/orders/checkout-session/${cartId}?url=${encodeURIComponent(url)}`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
                "Content-Type": "application/json",
                token: token as string,
            },
        });

            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                // إذا لم يكن response.ok، حاول قراءة الـ response كـ text
                const errorText = await response.text();
                console.error("Checkout API error response:", errorText);
                // إذا كان JSON، حاول طباعته بشكل أوضح
                if (contentType && contentType.includes("application/json")) {
                    try {
                        const errorData = JSON.parse(errorText);
                        throw new Error(errorData.message || `Checkout failed: ${response.status}`);
                    } catch {
                        throw new Error(`Checkout failed: ${response.status}`);
                    }
                } else {
                    throw new Error(`Checkout failed: ${response.status}. Response was not JSON.`);
                }
            }

            if (contentType && contentType.includes("application/json")) {
                const data: CheckoutResponse = await response.json();
                return { success: true, data };
            } else {
                const text = await response.text();
                console.error("Unexpected checkout response:", text);
                throw new Error("Checkout API did not return JSON");
            }
    } catch (error) {
        console.error("Checkout error:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Checkout failed" 
        };
    }
}