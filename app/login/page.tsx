import React from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "@/auth";

function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <p className="text-gray-600">Login ke akun anda</p>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button variant="default" size={"lg"} className="w-full mt-6">
            <FaGoogle className="mr-2" /> Login with Google
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
