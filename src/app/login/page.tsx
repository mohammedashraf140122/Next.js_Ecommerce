"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";
//!====== End of imports =======//

const Login = () => {
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const handleLogin = async (values: LoginSchemaType) => {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (res?.ok) {
      // Success toast
      toast.success("Login successful!", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fas fa-check-circle text-[#0AAD0A]"></i>,
        style: {
          color: "#0AAD0A", // Green color for message
        },
      });
      window.location.href = res.url || "/";
    } else {
      console.log(res);
      toast.error("Invalid credentials!", {
        position: "top-center",
        duration: 3000,
        icon: <i className="fas fa-times-circle text-red-600"></i>,
        action: {
          label: "Retry",
          onClick: () => {
            form.reset();
          },
        },
        style: {
          color: "#dc2626", // Red color for message
        },
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[#0AAD0A] rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-sign-in-alt text-white text-xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-[#21313C] mb-2">
            Login to your account
          </h2>
          <p className="text-gray-600">Welcome back to FreshCart</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-6"
            >
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-12 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                          {...field}
                        />
                        <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      </div>
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="pl-12 h-12 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                          {...field}
                        />
                        <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                      </div>
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-[#0AAD0A] hover:bg-[#089A08] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 mt-8"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Logging in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Login
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#21313C] font-medium hover:underline transition-colors hover:text-[#0AAD0A]"
              >
                Sign up here
              </Link>
            </p>
          </div>
          {/* Forgot Password Section */}
          <div className="text-center mt-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-center mb-2">
                <i className="fas fa-key text-gray-600 mr-2"></i>
                <span className="text-gray-700 font-medium">
                  Need help accessing your account?
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Don&apos;t worry! It happens to the best of us.
              </p>
              <Link
                href="/reset-password"
                className="inline-flex items-center px-4 py-2 bg-[#0AAD0A] hover:bg-[#089A08] text-white font-medium rounded-lg transition-colors duration-300 text-sm"
              >
                <i className="fas fa-unlock-alt mr-2"></i>
                Reset Your Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
