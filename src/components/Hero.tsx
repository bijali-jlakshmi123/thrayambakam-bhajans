"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Play, Calendar, Flower2 } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-primary"
    >
      {/* Parallax Background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-primary/95 via-primary/30 to-primary/95 z-10" />
        <Image
          src="/hero-bg.png"
          alt="Majestic Shiva Temple"
          fill
          sizes="100vw"
          className="object-cover object-center scale-110"
          priority
        />
      </motion.div>

      {/* Cinematic Light Beams */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[10%] w-[40%] h-[150%] bg-linear-to-b from-accent/20 to-transparent rotate-35 blur-[120px]" />
        <div className="absolute top-[-30%] right-[5%] w-[30%] h-[150%] bg-linear-to-b from-accent/15 to-transparent rotate-25 blur-[100px]" />
      </div>

      {/* Floating Divine Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mounted &&
          [...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [Math.random() * 1000, Math.random() * 1000 - 300],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 10,
              }}
              className="absolute w-1.5 h-1.5 bg-accent rounded-full blur-[2px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
      </div>

      {/* Sanskrit Shloka Aura */}
      <motion.div
        animate={{ opacity: [0.02, 0.05, 0.02], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-[35%] left-1/2 -translate-x-1/2 w-full text-center z-10 select-none pointer-events-none"
      >
        <div className="text-[14vw] md:text-[12vw] lg:text-[10vw] font-black leading-none tracking-[0.3em] text-accent uppercase opacity-50 filter blur-[2px]">
          ॐ नमः शिवाय
        </div>
      </motion.div>

      {/* Decorative Pillar Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 z-10 hidden xl:block">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]),
            backgroundImage: "url('/pillar.png')",
          }}
          className="absolute top-1/2 left-0 -translate-y-1/2 w-64 xl:w-80 h-[90%] bg-contain bg-no-repeat"
        />
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]),
            backgroundImage: "url('/pillar.png')",
          }}
          className="absolute top-1/2 right-0 -translate-y-1/2 w-64 xl:w-80 h-[90%] bg-contain bg-no-repeat scale-x-[-1]"
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-20 max-w-7xl mx-auto px-6 text-center"
      >
        {/* Cinematic Heading Reveal */}
        <div className="relative mt-20 mb-12 sm:mb-16">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-20"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-black text-white leading-[0.85] sm:leading-[0.8] tracking-tighter italic"
          >
            THRAYAMBAKAM <br />
            <span className="text-accent bg-clip-text bg-linear-to-b from-accent via-white to-accent drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]">
              BHAJANS
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg sm:text-2xl md:text-3xl text-white/60 max-w-4xl mx-auto mb-16 sm:mb-20 leading-relaxed font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] px-4"
        >
          Elevating Souls <span className="text-accent">/</span> Spreading
          Devotion <span className="text-accent">/</span> Ancient Vibrations
        </motion.p>

        {/* Glassmorphic Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-12"
        >
          <Link
            href="/library"
            className="group relative px-16 py-7 bg-accent text-primary font-black text-sm rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-[0_25px_80px_-20px_rgba(255,215,0,0.4)] uppercase tracking-[0.4em]"
          >
            <div className="relative z-10 flex items-center">
              <Play className="w-5 h-5 mr-4 fill-current" />
              Listen Now
            </div>
            <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 skew-x-12" />
          </Link>

          <Link
            href="/events"
            className="group px-16 py-7 border-2 border-white/10 text-white font-black text-sm rounded-2xl hover:bg-white/5 transition-all flex items-center uppercase tracking-[0.4em] backdrop-blur-xl hover:border-accent/40"
          >
            <Calendar className="w-5 h-5 mr-4 text-accent group-hover:scale-110 transition-transform" />
            Join Seva
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating Branding Overlay */}
      <div className="absolute right-12 bottom-12 hidden xl:flex flex-col items-end z-30">
        <span className="text-white/20 text-xs font-black tracking-[1.5em] uppercase mb-4">
          Ramapuram
        </span>
        <div className="h-[2px] w-20 bg-accent/20 mb-4" />
        <span className="text-accent text-6xl font-black opacity-30 tracking-widest">
          2026
        </span>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6"
      >
        <div className="w-[1px] h-24 bg-linear-to-b from-accent/0 via-accent to-accent/0" />
        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.8em] rotate-180 [writing-mode:vertical-lr]">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
