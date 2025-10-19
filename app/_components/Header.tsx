import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import Nav from "./Nav";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Planner",
    path: "/planner",
  },
  {
    name: "Panduan Pengguna",
    path: "/panduan",
  },
];

const Header = async () => {
  const session = await auth();
  return (
    <header className="fixed top-0 z-50 bg-white shadow-md w-full">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image src={"/logo.png"} alt="logo" width={40} height={40} />
          <h2 className="font-bold text-xl">ZenTrip AI</h2>
        </div>

        {/* Menu Option */}
        <Nav menuOptions={menuOptions} />

        {/* Login Button */}
        {session?.user ? (
          <Link href={"/planner"}>
            <Button variant={"outline"}>Dashboard</Button>
          </Link>
        ) : (
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
