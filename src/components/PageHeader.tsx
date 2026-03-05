"use client";

import { motion } from "framer-motion";
import { Flower2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-primary pt-20">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-primary/95 via-primary/70 to-primary/95 z-10" />
        <Image
          src="/hero-bg.png"
          alt="Divine Background"
          fill
          className="object-cover object-center scale-110 opacity-30 shadow-2xl"
          priority
        />
      </div>

      {/* Cinematic Light Beams */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[10%] w-[40%] h-[150%] bg-linear-to-b from-accent/20 to-transparent rotate-35 blur-[120px]" />
        <div className="absolute top-[-30%] right-[5%] w-[30%] h-[150%] bg-linear-to-b from-accent/15 to-transparent rotate-25 blur-[100px]" />
      </div>

      {/* Divine Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted &&
          [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                y: [Math.random() * 600, Math.random() * 600 - 200],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
              className="absolute w-1 h-1 bg-accent rounded-full blur-[1px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
      </div>

      {/* Decorative Pillar Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-10 hidden lg:block">
        <div
          style={{ backgroundImage: "url('/pillar.png')" }}
          className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-[80%] bg-contain bg-no-repeat opacity-40"
        />
        <div
          style={{ backgroundImage: "url('/pillar.png')" }}
          className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-[80%] bg-contain bg-no-repeat scale-x-[-1] opacity-40"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-6 justify-center mb-8"
          >
            <div className="h-px w-16 bg-accent/40" />
            <Flower2 className="w-6 h-6 text-accent animate-spin-slow" />
            <span className="text-xs font-black tracking-[0.5em] uppercase text-accent/80">
              {subtitle}
            </span>
            <div className="h-px w-16 bg-accent/40" />
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter italic leading-[0.8]">
            {title}
          </h1>
        </motion.div>
      </div>

      {/* Bottom Glow Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background-warm to-transparent z-10" />
    </section>
  );
}
