"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700">
      <div className="w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 place-items-center md:place-items-start">
          {/* Logo + Description Section */}
          <div className="flex flex-col space-y-3 sm:space-y-4 text-center sm:text-left md:text-center lg:text-left">
            <Link
              href="/"
              className="flex items-center space-x-2 justify-center sm:justify-start md:justify-center lg:justify-start"
            >
              <Image
                src={"/logo.png"}
                alt="logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="font-bold text-lg sm:text-xl">ZenTrip AI</span>
            </Link>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xs mx-auto sm:mx-0 md:mx-auto lg:mx-0">
              Teman perjalanan terbaik anda untuk perencanaan perjalanan yang
              terencana dan petualangan yang tak terlupakan.
            </p>
          </div>

          {/* Menu Links */}
          <div className="text-center sm:text-left md:text-center lg:text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-base sm:text-lg">
              Menu
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm sm:text-base text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/planner"
                  className="text-sm sm:text-base text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors"
                >
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/panduan"
                  className="text-sm sm:text-base text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors"
                >
                  Panduan Pengguna
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-left md:text-center lg:text-left sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 text-base sm:text-lg">
              Ikuti Kami
            </h3>
            <div className="flex space-x-4 justify-center sm:justify-start md:justify-center lg:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-blue-400 dark:text-neutral-400 dark:hover:text-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-pink-500 dark:text-neutral-400 dark:hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-neutral-700 my-4 sm:my-6" />

        {/* Copyright */}
        <div className="text-center text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} ZenTrip AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
