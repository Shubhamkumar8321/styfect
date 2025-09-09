"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <nav className="w-full bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.jpg" // apna logo "public/logo.png" me daal do
            alt="Logo"
            width={150}
            height={40}
            className="cursor-pointer"
          />
        </div>

        {/* Search Bar (Desktop only) */}
        <div className="hidden md:flex items-center w-1/4  rounded-full px-4 py-2 bg-[#dadada] focus-within:ring-2 focus-within:ring-[#0c655c]">
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
          <a href="#" className="hover:text-[#0c655c]">
            Home
          </a>
          <a href="#" className="hover:text-[#0c655c]">
            About
          </a>
          <a href="#" className="hover:text-[#0c655c]">
            Gallery
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-sm px-6 py-4 space-y-4">
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
          <div className="flex flex-col space-y-3 text-gray-700 font-medium">
            <a href="#" className="hover:text-[#0c655c]">
              Home
            </a>
            <a href="#" className="hover:text-[#0c655c]">
              About
            </a>
            <a href="#" className="hover:text-[#0c655c]">
              Gallery
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
