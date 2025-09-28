import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { Button } from "@/components/ui/button";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Harga",
    path: "/harga",
  },
  {
    name: "Hubungi Kami",
    path: "/hubungi-kami",
  },
];

function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      {/* {Logo} */}
      <div className="flex gap-2 items-center">
        <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <h2 className="font-bold text-2xl">ZenTrip AI</h2>
      </div>

      {/* {Menu Option} */}
      <div className="flex gap-7 items-center">
        {menuOptions.map((menu, index) => (
          <Link key={index} href={menu.path}>
            <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">{menu.name}</h2>
          </Link>
        ))}
      </div>

      {/* {Get Started Button} */}
      <Button>Login</Button>
    </div>
  );
}

export default Header;
