"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Cart, ProductCart } from "@/types/cart.type";
import { toast } from "sonner";
import { removeCartItemAction } from "@/CartActions/removeCartItem";
import { useSession } from "next-auth/react";
import { updateCartAction } from "@/CartActions/updateCart";
import { clearCartAction } from "@/CartActions/clearCart";

interface CartContextType {
  numOfCartItems: number;
  totalCartPrice: number;
  products: ProductCart[];
  cartId: string;
  getUserCart: () => Promise<void>;
  isLoading: boolean;
  removeCartItem: (productId: string) => Promise<Cart | null>;
  updateCartItem: (productId: string, quantity: number) => Promise<Cart | null>;
  clearCart: () => Promise<Cart | null>;
}

export const cartContext = createContext<CartContextType | undefined>(
  undefined
);

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [cartId, setCartId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function removeCartItem(productId: string): Promise<Cart | null> {
    try {
      // Call server proxy; server will authenticate using cookies/session
      const data: Cart | { message?: string } = await removeCartItemAction(productId);
      // If unauthenticated, server may return { message: 'Login First' }
  if ((data as any)?.message === "Login First") {
        toast.error("Please login to remove items from cart");
        // Clear cart view when server says unauthenticated
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProducts([]);
        setCartId("");
        return null;
      }
  const cart = data as Cart;
  setNumOfCartItems(cart.numOfCartItems);
  setTotalCartPrice(cart.data.totalCartPrice);
  setProducts(cart.data.products);
  setCartId(cart.cartId);
  toast.success("Item removed from cart successfully");
  return cart;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      return null;
    }
  }

  async function clearCart(): Promise<Cart | null> {
    setIsLoading(true);
    try {
      const data: Cart | { message?: string } = await clearCartAction();
      if ((data as any)?.message === "Login First") {
        toast.error("Please login to clear cart");
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProducts([]);
        setCartId("");
        return null;
      }
      // Successful clear - return the cart response as Cart
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      setProducts([]);
      setCartId("");
      toast.success("Cart cleared successfully");
      return data as Cart;
    } catch(error){
        toast.error("Something went wrong");
        console.log(error);
        return null;
    } finally {
        setIsLoading(false);
    }
  }

  async function updateCartItem(productId: string, quantity: number): Promise<Cart | null> {
    try {
      const data: Cart | { message?: string } = await updateCartAction(productId, quantity);
      if ((data as any)?.message === "Login First") {
        toast.error("Please login to update cart items");
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProducts([]);
        setCartId("");
        return null;
      }
      const cart = data as Cart;
      setNumOfCartItems(cart.numOfCartItems);
      setTotalCartPrice(cart.data.totalCartPrice);
      setProducts(cart.data.products);
      setCartId(cart.cartId);
      toast.success("Cart item updated successfully");
      return cart;
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      return null;
    }
  }

  async function getUserCart() {
    setIsLoading(true);
    try {
      // Call our server route which invokes the server action safely.
      // Don't rely on client-side accessToken; server will use its session cookie.
  const response = await fetch(`/api/cart`, { cache: "no-store", credentials: "include" });
  console.log("CartContext - GET /api/cart status:", response.status);
  const data: Cart = await response.json();
      if (response.status === 401) {
        // Not authenticated on server; clear cart view
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProducts([]);
        setCartId("");
        return;
      }
      if (!response.ok) {
        throw new Error(
          (data as unknown as { message?: string })?.message ||
            "Failed to load cart"
        );
      }
      setNumOfCartItems(data.numOfCartItems);
      setTotalCartPrice(data.data.totalCartPrice);
      setProducts(data.data.products);
      setCartId(data.cartId);
    } catch (error) {
      toast.error("Something went wrong while fetching cart");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.accessToken]);

  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        totalCartPrice,
        products,
        cartId,
        getUserCart,
        isLoading,
        removeCartItem,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
