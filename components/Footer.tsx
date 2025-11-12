"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700 ">
      <div className="w-full mx-auto px-6 py-10 place-items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-content-center">
          {/* Logo + Description Section */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={"/logo.png"} alt="logo" width={40} height={40} />
              <span className="font-bold text-xl">ZenTrip AI</span>
            </Link>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs">
              Your ultimate AI-powered travel companion for seamless trip
              planning and unforgettable adventures.
            </p>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Menu
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/planner"
                  className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors"
                >
                  Trip Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/panduan"
                  className="text-neutral-600 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors"
                >
                  Panduan Pengguna
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-blue-400 dark:text-neutral-400 dark:hover:text-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-pink-500 dark:text-neutral-400 dark:hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-neutral-700 my-6" />

        {/* Copyright */}
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} ZenTrip AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
