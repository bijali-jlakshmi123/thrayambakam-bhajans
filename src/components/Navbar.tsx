"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Music,
  Calendar,
  Image as ImageIcon,
  Video,
  Info,
  Phone,
  Home,
  Menu,
  X,
  Flower2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Library", href: "/library", icon: Music },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Gallery", href: "/gallery", icon: ImageIcon },
  { name: "Videos", href: "/videos", icon: Video },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-100 transition-all duration-500 ${
        scrolled
          ? "bg-primary/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center group transition-all duration-500"
          >
            <div className="relative h-14 w-auto min-w-[200px] md:min-w-[280px]">
              <Image
                src="/logo.png"
                alt="Thrayambakam Official Logo"
                fill
                sizes="(max-width: 768px) 200px, 280px"
                className="object-contain filter drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(255,215,0,0.65)] group-hover:scale-105 transition-all duration-500"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative group px-5 py-2 overflow-hidden"
              >
                <div className="flex items-center space-x-2 text-[10px] font-black text-white/70 uppercase tracking-[.2em] group-hover:text-accent transition-colors duration-300">
                  <item.icon className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span>{item.name}</span>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}

            <Link href="/admin" className="ml-8 translate-y-px">
              <div className="px-8 py-3 bg-white/5 border border-white/10 hover:border-accent/30 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent hover:text-primary transition-all duration-500">
                Admin
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-3 bg-white/5 rounded-2xl border border-white/10"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 w-full h-screen bg-primary z-200 flex flex-col p-6 sm:p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-primary text-xl">
                  T
                </div>
                <span className="text-lg font-black text-white uppercase tracking-widest">
                  MENU
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-4">
              {navItems.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between group p-4 border-b border-white/5"
                  >
                    <div className="flex items-center space-x-6">
                      <item.icon className="w-6 h-6 text-accent group-hover:scale-125 transition-transform" />
                      <span className="text-3xl font-black text-white group-hover:text-accent uppercase tracking-tighter">
                        {item.name}
                      </span>
                    </div>
                    <X className="w-4 h-4 text-white/10 -rotate-45" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full bg-accent text-primary p-6 rounded-4xl font-black text-sm uppercase tracking-[0.5em] shadow-[0_20px_40px_rgba(255,215,0,0.1)]"
              >
                ACCESS ADMIN
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
