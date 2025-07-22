"use client";

import LoginForm from "@/components/custom/LoginForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="max-w-screen flex flex-col items-center justify-center min-h-screen px-5 md:px-10 lg:px-20">
        <div className="w-full max-w-6xl flex rounded-2xl shadow-2xl">
          {/* Login Form */}
          <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-4 ">
            <h1 className="text-3xl lg:text-4xl font-bold">Log In</h1>
            <LoginForm />

            <div className="w-full flex flex-col items-center px-4 mt-10">
              <h2 className="text-2xl font-bold drop-shadow-lg">Don't have an Account?</h2>
              <Link href="/sign-up" className="w-full">
                <Button className="w-full mt-4 cursor-pointer" variant="default" size="lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Banner Image */}
          <div className="relative hidden lg:w-1/2 lg:flex items-center justify-center overflow-hidden rounded-r-2xl bg-primary/50">
            <Image
              src="/login-banner.jpg"
              alt="Login Banner Image"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute z-10 text-white px-10 text-center">
              <h2 className="text-4xl font-bold drop-shadow-lg">HomeOrHoliday</h2>
              <p className="mt-5 text-xl drop-shadow-md">
                The place to find your perfect home or build your perfect holiday!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
