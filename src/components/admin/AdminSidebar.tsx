"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  Music,
  Calendar,
  Image as ImageIcon,
  Video,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/login/actions";

const menuItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Bhajans", href: "/admin/bhajans", icon: Music },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Videos", href: "/admin/videos", icon: Video },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-6 z-110 p-4 bg-primary text-white rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center transition-all active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100"
        />
      )}

      <aside
        className={`w-72 bg-primary min-h-screen flex flex-col p-6 fixed left-0 top-0 z-105 transition-transform duration-500 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center space-x-3 mb-12 px-2">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-bold text-primary">
            T
          </div>
          <span className="text-xl font-bold text-white uppercase tracking-wider">
            Admin Panel
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                  isActive
                    ? "bg-accent text-primary"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-primary" : "group-hover:text-accent"}`}
                  />
                  <span className="font-bold">{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="pt-8 border-t border-white/10 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-4 w-full text-white/40 hover:text-red-400 transition-colors uppercase text-xs font-black tracking-[.2em]"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
