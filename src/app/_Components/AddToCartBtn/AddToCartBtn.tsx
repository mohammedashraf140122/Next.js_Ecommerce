"use client";
import AddToCart from "@/CartActions/addToCart";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { useCart } from "@/Context/CartContext";

const AddToCartBtn = ({ productId }: { productId: string }) => {
  const { data: session, status } = useSession();
  const { getUserCart } = useCart();
  const router = useRouter();
  const [didReload, setDidReload] = React.useState(false);
  const [authDialog, setAuthDialog] = useState({
    isOpen: false,
  });

  const closeDialog = () => {
    setAuthDialog({ isOpen: false });
  };

  const goToLogin = () => {
    closeDialog();
    router.push("/login");
  };

  async function handleAddCart() {
    if (status === "loading") {
      return;
    }
  console.log("[AddToCartBtn] session:", session, "status:", status);
    
    // If user is unauthenticated, show login dialog. Don't require client accessToken here
    // because server forwarding uses the server session to authenticate.
    if (status === "unauthenticated") {
      setAuthDialog({ isOpen: true });
      return;
    }

    try {
  const data = await AddToCart(productId);

      // If backend indicates login is required, show auth dialog
      if (data?.message === "Login First" || data?.status === 401) {
        // If server provided a debug hint, show a toast with it before opening login dialog
        const hint = (data as any)?._debug;
        if (hint) {
          toast.error(`Login required. Debug: cookie=${hint.cookiePresent}, secretSet=${hint.nextAuthSecretSet}`, { duration: 4000 });
        }
        setAuthDialog({ isOpen: true });
        return;
      }

      // Refresh cart data to update the badge in navbar
      await getUserCart();

      toast.success("Product has been successfully added to your cart.", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fas fa-check-circle text-[#0AAD0A]"></i>,
        style: {
          color: "#0AAD0A",
        },
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
      console.log("Added to cart:", data);
    } catch (error) {
      console.error("Failed to add to cart:", error);
  // If server responded with 401-like error, try refreshing client session once
      const msg = (error as any)?.message || "";
      if (msg.toLowerCase().includes("login") || (error as any)?.status === 401) {
        try {
          const refreshed = await getSession();
          console.log("AddToCart - session refresh result:", refreshed);
          // If refresh returned a session with token or user, retry once
          if (refreshed) {
            try {
              const data2 = await AddToCart(productId);
              if (data2?.message === "Login First" || (data2 as any)?.status === 401) {
                setAuthDialog({ isOpen: true });
                return;
              }
              await getUserCart();
              toast.success("Product has been successfully added to your cart.", {
                position: "top-center",
                duration: 3000,
                icon: <i className="fas fa-check-circle text-[#0AAD0A]"></i>,
                style: { color: "#0AAD0A" },
                action: { label: "View Cart", onClick: () => router.push("/cart") },
              });
              return;
            } catch (e2) {
              console.error("Retry AddToCart failed:", e2);
            }
          }
        } catch (e) {
          console.error("Session refresh failed:", e);
        }

  // If client thinks it's authenticated but server rejected, don't force a reload.
  // Instead show auth dialog if refresh and retry didn't help.
  console.log("AddToCart - server rejected request even after retry; showing auth dialog");
  setAuthDialog({ isOpen: true });
  return;
      }

      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fas fa-times-circle text-red-600"></i>,
        style: {
          color: "#dc2626", // Red color for message
        },
        action: {
          label: "Retry",
          onClick: () => handleAddCart(),
        },
      });
    }
  }
  
  return (
    <>
      <Button
  type="button"
  onClick={handleAddCart}
        size="lg"
        disabled={status === "loading"}
        className="w-full bg-[#0AAD0A] hover:bg-[#089A08] disabled:opacity-50 cursor-copy text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
      >
        <i className="fas fa-shopping-cart mr-3"></i>
        {status === "loading" ? "Loading..." : "Add to Cart"}
      </Button>

      <Dialog open={authDialog.isOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <i className="fas fa-lock text-blue-500 text-xl"></i>
              Authentication Required
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Please login to add items to your cart.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button 
              onClick={goToLogin}
              className="bg-[#0AAD0A] hover:bg-[#089A08]"
            >
              Go to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddToCartBtn;
