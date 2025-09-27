"use client";
import React, { useState } from "react";
import { useCart } from "@/Context/CartContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const Cart = () => {
  const { status } = useSession();
  const {
    numOfCartItems,
    totalCartPrice,
    products,
    removeCartItem,
    updateCartItem,
    clearCart,
    cartId,
  } = useCart();
  const [clearCartDialog, setClearCartDialog] = useState(false);

  async function removeItem(productId: string) {
    await removeCartItem(productId);
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-[#0AAD0A] mb-4"></i>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full md:w-4/5 mx-auto py-8 px-5 md:px-0">
        {/* Cart Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#21313C] mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">
                {numOfCartItems === 0
                  ? "Your cart is empty"
                  : `${numOfCartItems} item${
                      numOfCartItems > 1 ? "s" : ""
                    } in your cart`}
              </p>
            </div>

            {numOfCartItems > 0 && (
              <div className="flex flex-row gap-4 items-baseline justify-between">
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50"
                  onClick={() => setClearCartDialog(true)}
                >
                  <i className="fas fa-trash mr-2"></i>
                  Clear Cart
                </Button>

                <div className="bg-white p-6 rounded-xl shadow-md border">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-[#21313C]">
                      {totalCartPrice}
                    </p>
                    <p className="text-sm text-gray-500">EGP</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Empty Cart */}
        {numOfCartItems === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-6"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link href="/">
              <Button className="bg-[#0AAD0A] hover:bg-[#089A08]">
                <i className="fas fa-arrow-left mr-2"></i>
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {products.map((item) => (
                <Card
                  key={item._id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-full sm:w-24 h-48 sm:h-24 bg-white rounded-lg overflow-hidden border">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={96}
                            height={96}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                          <div className="flex-grow">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-[#21313C] text-lg leading-tight">
                                {item.product.title}
                              </h3>

                              <Button
                                variant="outline"
                                size="sm"
                                className="ml-2 text-red-600 hover:text-red-700 hover:border-red-300 hover:bg-red-50"
                                onClick={() => {
                                  removeItem(item.product.id);
                                }}
                              >
                                <i className="fas fa-times text-xs"></i> Remove
                              </Button>
                            </div>

                            <Badge
                              variant="secondary"
                              className="mb-3 bg-[#0AAD0A]/10 text-[#0AAD0A]"
                            >
                              {item.product.category.name}
                            </Badge>

                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <i className="fas fa-tag text-gray-400"></i>
                                <span>Unit Price:</span>
                                <span className="font-medium">
                                  {item.price} EGP
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Price & Quantity Controls */}
                          <div className="flex flex-col items-center lg:items-end gap-3">
                            <div className="text-right">
                              <p className="text-lg font-bold text-[#21313C]">
                                {item.price * item.count} EGP
                              </p>
                              <p className="text-sm text-gray-500">
                                Total for {item.count} item
                                {item.count > 1 ? "s" : ""}
                              </p>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <label className="text-xs text-gray-500  px-8 font-medium">
                                Quantity
                              </label>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-8 h-8 p-0 text-gray-600 hover:text-[#21313C] hover:border-gray-400"
                                  onClick={() =>
                                    updateCartItem(
                                      item.product.id,
                                      item.count - 1
                                    )
                                  }
                                  disabled={item.count <= 1}
                                >
                                  <i className="fas fa-minus text-xs"></i>
                                </Button>

                                <span className="w-8 text-center text-sm font-medium text-[#21313C]">
                                  {item.count}
                                </span>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-8 h-8 p-0 text-gray-600 hover:text-[#21313C] hover:border-gray-400"
                                  onClick={() =>
                                    updateCartItem(
                                      item.product.id,
                                      item.count + 1
                                    )
                                  }
                                >
                                  <i className="fas fa-plus text-xs"></i>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#21313C] mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({numOfCartItems} items)</span>
                      <span>{totalCartPrice} EGP</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-[#0AAD0A]">Free</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between text-lg font-bold text-[#21313C]">
                      <span>Total</span>
                      <span>{totalCartPrice} EGP</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link href={`/checkout/${cartId}`}>
                      <Button className="w-full bg-[#0AAD0A] hover:bg-[#089A08] py-3">
                        <i className="fas fa-credit-card mr-2"></i>
                        Proceed to Checkout
                      </Button>
                    </Link>

                    <Link href="/" className="block">
                      <Button variant="outline" className="w-full">
                        <i className="fas fa-arrow-left mr-2"></i>
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Clear Cart Confirmation Dialog */}
        <Dialog open={clearCartDialog} onOpenChange={setClearCartDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-trash text-red-600"></i>
                </div>
                Clear Cart
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to remove all items from your cart? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:gap-2">
              <Button
                variant="outline"
                onClick={() => setClearCartDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  clearCart();
                  setClearCartDialog(false);
                }}
                className="flex-1"
              >
                <i className="fas fa-trash mr-2"></i>
                Clear Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Cart;
