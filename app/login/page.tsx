"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { loginWithGoogle } from "@/lib/actions/auth-actions";

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginWithGoogle();
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="md:w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <p className="text-gray-600">Login ke akun anda</p>
        <form onSubmit={handleSubmit}>
          <Button
            variant="default"
            size={"lg"}
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <FaGoogle className="mr-2" /> Login with Google
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
