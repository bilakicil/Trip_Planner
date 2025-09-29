import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const menuOptions = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Planner",
    path: "/planner",
  },
  {
    name: "Panduan Pengguna",
    path: "/panduan-pengguna",
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md rounded-b-lg w-full">
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
              <h2 className="text-base font-medium hover:scale-105 transition-all hover:text-primary">
                {menu.name}
              </h2>
            </Link>
          ))}
        </nav>

        {/* Login Button */}
        <Button>
          Login
        </Button>
      </div>
    </header>
  );
}

export default Header;
