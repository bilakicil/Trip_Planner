"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

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

function Header() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 z-50 bg-white shadow-md w-full">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image src={"/logo.png"} alt="logo" width={40} height={40} />
          <h2 className="font-bold text-xl">ZenTrip AI</h2>
        </div>

        {/* Menu Option */}
        <nav className="flex gap-7 items-center">
          {menuOptions.map((menu, index) => (
            <Link key={index} href={menu.path}>
              <h2
                className={
                  `text-base font-medium hover:scale-105 transition-all hover:text-primary ` +
                  (pathname === menu.path ? "text-primary" : "text-gray-700")
                }
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </nav>

        {/* Login Button */}
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
