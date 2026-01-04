"use client"
import { ForgotPassword } from "@/components/ui/Auth/forgot-password";
import { Panda } from "lucide-react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();

  useEffect(()=>{
    const checkUser = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/initialize/check`);
      const data = await response.json();
      if (!data.success) {
        router.push("/signup");
      }
    }
    checkUser();
  },[])


  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium ">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Panda className="size-4" />
            </div>
            LaafStyl
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPassword  />
          </div>
        </div>
      </div>
      <div className=" relative hidden lg:block m-auto">
        <img src="/Logo.jpeg" alt="logo" width={512} height={512} className="m-auto" />
      </div>
    </div>
  )
}
