"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Bookmark,
  Split,
  NotepadText,
  Landmark,
  ListChecks,
  Power,
  Settings,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "Accounts", icon: Users, href: "/accounts" },
  { name: "Batches", icon: Bookmark, href: "/batches" },
  { name: "Resolution", icon: Split, href: "/resolution" },
  { name: "Assessments", icon: NotepadText, href: "/assessments" },
  { name: "Appeal Letter", icon: Landmark, href: "/AppealLetter" },
  { name: "Summary", icon: ListChecks, href: "/summary" },
  { name: "Schedule", icon: Calendar, href: "/Schedule" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "relative flex flex-col justify-between h-screen bg-[#2C4A65] text-white transition-all duration-300 rounded-xl mx-2",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-5 z-10 bg-white text-gray-700 shadow-md rounded-full w-6 h-6 flex items-center justify-center"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-[#4ED6BE]" strokeWidth={3.5} />
        ) : (
          <ChevronLeft className="w-4 h-4 text-[#4ED6BE]" strokeWidth={3.5} />
        )}
      </button>

      {/* Top Section */}
      <div className="pt-6">
        <nav className="mt-4 space-y-1">
          {menuItems.map(({ name, icon: Icon, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={name}
                href={href}
                className={clsx(
                  "flex items-center gap-3 rounded-lg text-sm transition-all",
                  isActive ? "bg-[#3F6E8C] font-semibold" : "hover:bg-white/10",
                  collapsed
                    ? "justify-center p-3 mx-auto w-11 h-11"
                    : "justify-start px-4 py-3 mx-3"
                )}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mb-6">
        <Link
          href="/settings"
          className={clsx(
            "flex items-center gap-3 text-sm hover:bg-white/10 rounded transition",
            collapsed
              ? "justify-center p-3 mx-auto w-11 h-11"
              : "justify-start px-4 py-3 mx-3"
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span>Settings</span>}
        </Link>

        <button
          className={clsx(
            "flex items-center gap-2 bg-[#32D399] text-white rounded-lg hover:bg-[#2ebd8f] transition",
            collapsed
              ? "justify-center p-3 mx-auto w-11 h-11 mt-2"
              : "justify-center w-[calc(100%-24px)] px-4 py-3 mx-3 mt-2"
          )}
        >
          <Power className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}
