import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signOut } from "@/auth"; // pastikan signOut diexport dari auth.ts
import Nav from "./Nav";

const menuOptions = [
  { name: "Home", path: "/" },
  { name: "Planner", path: "/planner" },
  { name: "Panduan Pengguna", path: "/panduan" },
];

const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md w-full">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <h2 className="font-bold text-xl">ZenTrip AI</h2>
        </div>

        {/* Menu */}
        <Nav menuOptions={menuOptions} />

        {/* Login / Logout Button */}
        {session?.user ? (
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button variant="secondary" type="submit">
              Logout
            </Button>
          </form>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
