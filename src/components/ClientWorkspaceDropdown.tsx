"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const workspaces = [
  {
    id: "1",
    value: "gw",
    icon: "/images/GWLogo.png",
  },
  {
    id: "2",
    value: "gw",
    icon: "/images/GWLogo.png",
  },
  {
    id: "3",
    value: "gw",
    icon: "/images/GWLogo.png",
  },
];

export default function ClientWorkspaceDropdown() {
  const [selected, setSelected] = useState(workspaces[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2 text-sm">
      <label className="text-[#2C4A65] font-semibold whitespace-nowrap hidden sm:block">
        Client Workspace:
      </label>

      <div className="relative w-[100px]">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="bg-white border border-gray-300 rounded-[5px] w-full h-[40px] px-[12px] py-[10px] flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Image
              src={selected.icon}
              alt={"Client Workspace Icon"}
              width={20}
              height={20}
              className="rounded-full"
            />
            {/* <span className="text-sm font-medium">{selected.label}</span> */}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {/* Dropdown menu */}
        {open && (
          <ul className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md w-full shadow-lg">
            {workspaces.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setSelected(item);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <Image
                  src={item.icon}
                  alt={"Client Workspace Icon"}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                {/* <span className="text-sm font-medium">{item.label}</span> */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
