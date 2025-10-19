"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav({
  menuOptions,
}: {
  menuOptions: { name: string; path: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-7 items-center">
      {menuOptions.map((menu, index) => {
        const isActive = pathname === menu.path;
        return (
          <Link
            key={index}
            href={menu.path}
            className={
              isActive
                ? "text-primary  font-semibold"
                : "text-gray-700 hover:scale-105 transition-all hover:text-primary"
            }
          >
            {menu.name}
          </Link>
        );
      })}
    </nav>
  );
}
