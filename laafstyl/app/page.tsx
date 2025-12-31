"use client"
import Link from "next/link";
import { Panda } from "lucide-react";
import { Button } from "@/components/ui/Button/button";

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-8">
        {/* Logo with bouncing panda */}
        <div className="flex flex-col items-center gap-4">
          <div className=" flex size-16 items-center justify-center ">
            <Panda className="size-10 animate-bounce" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">LaafStyl</h1>
        </div>

        {/* Continue Button */}
        <Button asChild size="lg" className="mt-4">
          <Link href="/login">Continue</Link>
        </Button>
      </div>
    </div>
  )
}
