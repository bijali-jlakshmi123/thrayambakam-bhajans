"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Users,
  Target,
  Music,
  Flower2,
  Sparkles,
  Quote,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

const VALUES = [
  {
    icon: Heart,
    title: "Pure Devotion",
    description:
      "Every note we sing is an offering to the Divine consciousness.",
  },
  {
    icon: Users,
    title: "One Community",
    description:
      "Dissolving boundaries through the power of collective spiritual vibration.",
  },
  {
    icon: Music,
    title: "Sacred Tradition",
    description:
      "Preserving the ancient art of Sankirtana for the future generations.",
  },
  {
    icon: Target,
    title: "Global Vision",
    description:
      "To be a beacon of spiritual peace starting from our roots in Ramapuram.",
  },
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-background-warm min-h-screen relative overflow-hidden mandala-bg">
      <PageHeader
        subtitle="Divine Legacy"
        title={
          <>
            OUR SACRED <br />
            <span className="bg-clip-text text-transparent bg-linear-to-b from-accent to-white">
              STORY
            </span>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-12 md:pt-20">
        {/* Story Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24 mb-24 md:mb-48">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative p-6 md:p-12 lg:p-0"
            >
              <Quote className="absolute -top-12 -left-12 w-24 h-24 md:w-32 md:h-32 text-accent/10 -z-10" />
              <h2 className="text-4xl md:text-6xl font-black text-primary mb-8 md:mb-10 leading-tight tracking-tighter">
                Heart of Devotion in{" "}
                <span className="text-accent italic">Ramapuram</span>
              </h2>
              <div className="space-y-6 md:space-y-8">
                <p className="text-xl md:text-2xl text-primary/70 leading-relaxed font-medium">
                  Thrayambakam Bhajans started as a small group of devotees
                  sharing their love for God through music. Today, it has grown
                  into a vibrant community movement that touches hundreds of
                  lives through regular gatherings and divine celebrations.
                </p>
                <p className="text-lg md:text-xl text-primary/50 leading-relaxed">
                  Our mission is to keep the sacred tradition of Nama-Sankirtana
                  alive, making it accessible to the modern generation while
                  maintaining its deep spiritual roots and authenticity. We
                  believe that music is the ultimate bridge to the divine.
                </p>
              </div>

              <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-primary/5 grid grid-cols-2 gap-8 md:gap-12">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-primary mb-1">
                    10+
                  </div>
                  <div className="text-primary/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    Years of Seva
                  </div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-primary mb-1">
                    500+
                  </div>
                  <div className="text-primary/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    Bhajan Sandhyas
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-3xl ring-1 ring-primary/5 aspect-square"
            >
              <Image
               src="/images/about.jpg"
                alt="Thrayambakam Group"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-primary/10 transition-colors" />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />

              <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-xl md:rounded-2xl flex items-center justify-center text-primary shadow-xl">
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="text-white font-black text-base md:text-lg tracking-tight">
                    Our Core Mission
                  </span>
                </div>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                  Let the rhythm of devotion be the only beat your heart
                  follows.
                </p>
              </div>
            </motion.div>

            {/* Corner Decorative */}
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-24 h-24 md:w-40 md:h-40 border-t-2 md:border-t-4 border-r-2 md:border-r-4 border-accent/20 rounded-[2.5rem] md:rounded-[4rem] group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-24 h-24 md:w-40 md:h-40 border-b-2 md:border-b-4 border-l-2 md:border-l-4 border-accent/20 rounded-[2.5rem] md:rounded-[4rem] group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {VALUES.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-white/40 backdrop-blur-xl p-10 md:p-14 rounded-3xl md:rounded-[3.5rem] shadow-2xl border border-white/50 hover:bg-white hover:border-accent/30 transition-all duration-500 hover:-translate-y-4"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-2xl md:rounded-4xl flex items-center justify-center text-primary mb-8 md:mb-10 group-hover:bg-accent group-hover:rotate-12 transition-all duration-500">
                <val.icon className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-primary mb-4 md:mb-6 tracking-tight group-hover:text-accent transition-colors">
                {val.title}
              </h3>
              <p className="text-primary/50 text-base md:text-lg font-medium leading-relaxed group-hover:text-primary/70 transition-colors">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Signature Footer */}
        <div className="mt-48 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block relative"
          >
            <div className="flex items-center gap-6 mb-10">
              <div className="h-px w-24 bg-primary/10" />
              <Flower2 className="w-8 h-8 text-accent opacity-40 animate-pulse" />
              <div className="h-px w-24 bg-primary/10" />
            </div>
            <p className="text-primary/20 text-sm font-black uppercase tracking-[1.5em] text-center">
              Thrayambakam Bhajans
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
