"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <nav className="w-full bg-white md:shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/Logo.jpg"
            alt="Logo"
            width={150}
            height={40}
            className="cursor-pointer"
          />
        </div>

        {/* Search Bar (Desktop only) */}
        <div className="hidden md:flex items-center w-1/4 rounded-full px-4 py-2 bg-[#dadada] focus-within:ring-2 focus-within:ring-[#0c655c]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to search..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
          <Search className="text-gray-500" size={18} />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-bold">
          <a href="#" className="hover:text-[#0c655c]">Home</a>
          <a href="#" className="hover:text-[#0c655c]">About</a>
          <a href="#" className="hover:text-[#0c655c]">Gallery</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex">
          {/* Side Drawer */}
          <div className="bg-white w-3/4 max-w-xs h-full shadow-lg p-6 space-y-6 animate-slideIn">
            {/* Top Row: Logo + Close */}
            <div className="flex items-center justify-between">
              <Image
                src="/Logo.jpg"
                alt="Logo"
                width={120}
                height={35}
                className="cursor-pointer"
              />
              <button
                className="text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            {/* Mobile Search Bar */}
            <div className="flex items-center border rounded-full px-4 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#0c655c]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type to search..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              />
              <Search className="text-gray-500" size={18} />
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col space-y-4 text-gray-700 font-medium text-lg">
              <a href="#" className="hover:text-[#0c655c]">Home</a>
              <a href="#" className="hover:text-[#0c655c]">About</a>
              <a href="#" className="hover:text-[#0c655c]">Gallery</a>
            </div>
          </div>

          {/* Clickable background to close */}
          <div
            className="flex-1"
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
      )}
    </nav>
  );
}
