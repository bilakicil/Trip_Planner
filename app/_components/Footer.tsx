"use client";

import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Logo + Deskripsi */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-600">ZenTrip AI</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              Teman perjalanan cerdasmu. Rencanakan trip lebih mudah dan seru ✈️
            </p>
          </div>

          {/* Sosmed */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="#" className="text-neutral-500 hover:text-blue-600">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-500 hover:text-blue-600">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-neutral-500 hover:text-pink-500">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Garis */}
        <div className="border-t border-gray-200 dark:border-neutral-700 my-6" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row md:justify-between text-sm text-neutral-500 dark:text-neutral-400">
          <p>© 2024 ZenTrip AI. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
