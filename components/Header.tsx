"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Nav from "./Nav";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const menuOptions = [
  { name: "Home", path: "/" },
  { name: "Planner", path: "/planner" },
  { name: "Panduan Pengguna", path: "/panduan" },
];

const Header = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error(error)
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md w-full">
      <div className="flex justify-between items-center px-3 sm:px-4 md:px-6 py-2 sm:py-3">
        {/* Logo */}
        <div className="flex gap-1 sm:gap-2 items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={40}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
          />
          <h2 className="font-bold text-sm sm:text-lg md:text-xl">
            ZenTrip AI
          </h2>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:block">
          <Nav menuOptions={menuOptions} />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-1 sm:p-2 hover:bg-gray-100 rounded-md transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Login / Logout Button */}
        <div className="hidden sm:block">
          {session?.user ? (
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="text-sm"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </Button>
          ) : (
            <Link href="/login">
              <Button className="text-sm">Login</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-3">
            {menuOptions.map((menu, index) => (
              <Link
                key={index}
                href={menu.path}
                className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {menu.name}
              </Link>
            ))}

            {/* Mobile Login/Logout */}
            <div className="pt-3 border-t">
              {session?.user ? (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <>
                      <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    "Logout"
                  )}
                </Button>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
