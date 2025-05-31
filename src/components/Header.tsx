"use client";

import { Bell,  Grip, Search } from "lucide-react";
import Image from "next/image";
import ClientWorkspaceDropdown from "./ClientWorkspaceDropdown";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white m-2 px-6 py-3 shadow-sm rounded-lg">
      {/* Left: Logo */}
      <div className="items-center space-x-2">
        <Image
          src="/images/AppealsLogo.png"
          alt="Appeals Logo"
          width={158}
          height={36}
          className="object-contain"
        />
      </div>

      {/* Center: Client Workspace + Search */}
      <div className="flex items-center flex-1 max-w-3xl ml-10 space-x-4">
        {/* Client Workspace Dropdown */}
        <ClientWorkspaceDropdown />

        {/* Search Input - now takes remaining space */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C4A65]" />
        </div>
      </div>

      {/* Right: Icons and Profile */}
      <div className="flex items-center space-x-4">
        <Image
          src="/images/GWLogo.png"
          alt="client"
          className="w-6 h-6 rounded-full"
          height={500}
          width={500}
        />
        <div className="w-7 h-7 bg-blue-400 text-white rounded-full flex items-center justify-center text-sm font-semibold">
          AK
        </div>
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
        <Grip className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>
    </header>
  );
}
