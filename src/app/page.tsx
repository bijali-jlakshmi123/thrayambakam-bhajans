"use client";

import Hero from "@/components/Hero";
import CategoryPreview from "@/components/CategoryPreview";
import {
  Music,
  Calendar,
  Video,
  ArrowRight,
  Flower2,
  Sparkles,
  Play,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-background-warm overflow-hidden">
      <Hero />
      <CategoryPreview />

      {/* Events Quick Peek */}
      <section className="py-32 bg-primary relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-background-warm to-transparent opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 md:mb-24 gap-12 text-center lg:text-left">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-4 mb-6"
              >
                <div className="h-px w-8 md:w-12 bg-accent/30" />
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                <span className="text-[10px] md:text-xs font-black tracking-[0.5em] uppercase text-accent/80">
                  Divine Congregation
                </span>
              </motion.div>
              <h3 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter italic leading-[0.9] sm:leading-[0.8] mb-4">
                LATEST <br />
                <span className="text-accent not-italic bg-clip-text text-transparent bg-linear-to-b from-accent to-white">
                  EVENTS
                </span>
              </h3>
            </div>
            <Link
              href="/events"
              className="group flex flex-col sm:flex-row items-center gap-6 text-white/40 hover:text-accent transition-all duration-500 uppercase font-black text-[10px] md:text-sm tracking-[0.3em]"
            >
              <span>Explore All Gatherings</span>
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                <ArrowRight className="w-6 h-6" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            {/* Featured Event Card */}
            <div className="group/card relative bg-white/5 backdrop-blur-2xl rounded-3xl md:rounded-4xl p-8 md:p-12 border border-white/10 spiritual-shadow hover:bg-white/10 transition-all duration-700 flex flex-col md:flex-row gap-10 md:gap-12 items-center md:items-start ring-1 ring-white/5">
              <div className="relative w-32 h-32 md:w-40 md:h-40 bg-accent rounded-2xl md:rounded-4xl flex flex-col items-center justify-center shrink-0 shadow-3xl group-hover/card:scale-105 transition-transform duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-accent via-[#FFD700] to-accent opacity-50" />
                <span className="relative z-10 text-4xl md:text-5xl font-black text-primary leading-none">
                  15
                </span>
                <span className="relative z-10 text-[8px] md:text-xs uppercase font-black tracking-[0.2em] text-primary/60 mt-1 md:mt-2">
                  MARCH
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-accent/20 rounded-full border border-accent/20 mb-6 group-hover/card:bg-accent group-hover/card:text-primary transition-colors duration-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Upcoming Program
                  </span>
                </div>
                <h4 className="text-2xl md:text-4xl font-black text-white mb-6 group-hover/card:text-accent transition-colors duration-500 tracking-tight leading-tight">
                  Maha Shivaratri <br />
                  Celebrations
                </h4>
                <p className="text-white/50 text-base md:text-xl font-medium mb-10 md:mb-12 line-clamp-2 leading-relaxed">
                  Join us for a night of divine bhajans and powerful vibrations
                  on the auspicious occasion.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-white/30 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>Ramapuram Temple Grounds</span>
                </div>
              </div>
            </div>

            {/* Past Highlight Card */}
            <div className="group/card relative bg-white/5 backdrop-blur-2xl rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 border border-white/10 spiritual-shadow hover:bg-white/10 transition-all duration-700 flex flex-col md:flex-row gap-10 md:gap-12 items-center md:items-start ring-1 ring-white/5 opacity-80 hover:opacity-100">
              <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center justify-center shrink-0 group-hover/card:scale-105 transition-transform duration-500 border border-white/10">
                <span className="text-4xl md:text-5xl font-black text-white/40 leading-none">
                  28
                </span>
                <span className="text-[8px] md:text-xs uppercase font-black tracking-[0.2em] text-white/20 mt-1 md:mt-2">
                  FEB
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 rounded-full border border-white/5 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
                    Past Reflection
                  </span>
                </div>
                <h4 className="text-2xl md:text-4xl font-black text-white/60 mb-6 transition-colors duration-500 tracking-tight leading-tight">
                  Krishna Bhajan <br />
                  Sandhya
                </h4>
                <p className="text-white/40 text-base md:text-xl font-medium mb-10 md:mb-12 line-clamp-2 leading-relaxed">
                  A beautiful evening of melodies dedicated to Lord Krishna
                  performed by our lead singers.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-white/20 font-black text-[10px] md:text-xs uppercase tracking-[0.2em]">
                  <Calendar className="w-4 h-4" />
                  <span>Town Hall, Ramapuram</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library CTA - Cinematic Experience */}
      <section className="py-40 relative px-6 group overflow-hidden">
        <div className="absolute inset-0 bg-background-warm" />
        <div className="max-w-7xl mx-auto relative">
          <div className="bg-linear-to-br from-primary to-[#1a422a] rounded-[3rem] md:rounded-[5rem] p-10 sm:p-16 md:p-32 relative overflow-hidden ring-1 ring-white/10 shadow-[0_80px_150px_-30px_rgba(17,45,28,0.5)] transition-all duration-1000 group-hover:scale-[1.01]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 p-20 opacity-10 group-hover:scale-110 transition-transform duration-1000 hidden lg:block">
              <Music className="w-96 h-96 text-white rotate-12" />
            </div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 blur-[150px] rounded-full animate-pulse" />

            <div className="relative z-10 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-12 h-px bg-accent/40" />
                <span className="text-[10px] md:text-xs font-black text-accent tracking-[0.6em] uppercase">
                  Bhajan Library
                </span>
              </motion.div>

              <h4 className="text-4xl sm:text-5xl md:text-9xl font-black text-white mb-8 md:mb-12 tracking-tighter leading-[0.9] sm:leading-[0.8] italic">
                DIVINE <br />
                <span className="text-accent not-italic">VIBRATIONS</span>
              </h4>
              <p className="text-lg md:text-2xl text-white/60 font-medium mb-12 md:mb-20 leading-relaxed max-w-2xl">
                Access hundreds of curated bhajans, view multi-lingual lyrics,
                and find your favorite singers in our massive digital temple.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 md:gap-8">
                <Link
                  href="/library"
                  className="group/btn relative px-8 py-6 md:px-16 md:py-8 bg-accent text-primary rounded-3xl md:rounded-4xl font-black text-[10px] md:text-sm uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-3xl hover:shadow-accent/40 overflow-hidden flex items-center justify-center gap-4 active:scale-95"
                >
                  <span className="relative z-10">Open Library</span>
                  <Play className="w-4 h-4 fill-current relative z-10" />
                </Link>
                <Link
                  href="/videos"
                  className="group/btn relative px-8 py-6 md:px-16 md:py-8 bg-white/10 backdrop-blur-xl text-white rounded-3xl md:rounded-4xl font-black text-[10px] md:text-sm uppercase tracking-[0.4em] hover:bg-white hover:text-primary transition-all border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center gap-4 active:scale-95"
                >
                  <Video className="w-4 h-4" />
                  <span className="relative z-10">Watch Bhajans</span>
                </Link>
              </div>
            </div>

            {/* Signature Accent */}
            <div className="absolute bottom-16 right-16">
              <Flower2 className="w-20 h-20 text-accent/10 animate-spin-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Divine Footer Divider */}
      <div className="text-center pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-block relative"
        >
          <div className="flex items-center gap-8 justify-center mb-8">
            <div className="h-px w-32 bg-primary/10" />
            <Flower2 className="w-8 h-8 text-accent opacity-40 animate-pulse" />
            <div className="h-px w-32 bg-primary/10" />
          </div>
          <p className="text-primary/20 text-sm font-black uppercase tracking-[1em] text-center">
            Thrayambakam Bhajans
          </p>
        </motion.div>
      </div>
    </div>
  );
}
