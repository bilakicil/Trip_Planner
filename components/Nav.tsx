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
    <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-7 items-start sm:items-center">
      {menuOptions.map((menu, index) => {
        const isActive = pathname === menu.path;
        return (
          <Link
            key={index}
            href={menu.path}
            className={
              isActive
                ? "text-primary font-semibold text-xs sm:text-sm md:text-base"
                : "text-gray-700 hover:scale-105 transition-all hover:text-primary text-xs sm:text-sm md:text-base"
            }
          >
            {menu.name}
          </Link>
        );
      })}
    </nav>
  );
}
