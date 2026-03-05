"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Play,
  ArrowLeft,
  Mic2,
  Music,
  Download,
  Share2,
  Heart,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock data for lyric display
const BHAJAN_DETAILS = {
  "1": {
    title: "Shiva Shambho",
    singer: "Vineeth Sreedhar",
    category: "Shiva",
    lyrics: `Shiva Shambho Shambho Shiva Shambho Mahadeva
Hara Hara Hara Hara Mahadeva
Shiva Shambho Shambho Shiva Shambho Mahadeva
Gangaadhara Hara Gauri Vara
Shiva Shambho Shambho Shiva Shambho Mahadeva

Vishweswara Shambho Mahadeva
Shiva Shambho Shambho Shiva Shambho Mahadeva`,
    duration: "5:24",
  },
};

export default function BhajanDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const bhajan =
    BHAJAN_DETAILS[id as keyof typeof BHAJAN_DETAILS] || BHAJAN_DETAILS["1"];

  return (
    <div className="pt-28 pb-24 bg-background-warm min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary/40 hover:text-primary mb-12 font-bold transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Library
        </button>

        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-primary/5">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
            <div className="flex gap-8 items-center">
              <div className="w-24 h-24 bg-accent rounded-3xl flex items-center justify-center text-primary shadow-xl">
                <Music className="w-10 h-10" />
              </div>
              <div>
                <span className="bg-accent/10 text-accent text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-3 inline-block">
                  {bhajan.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {bhajan.title}
                </h1>
                <div className="flex items-center text-primary/60 font-medium">
                  <Mic2 className="w-4 h-4 mr-2" />
                  <span>Singer: {bhajan.singer}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                <Play className="w-6 h-6 fill-current" />
              </button>
              <button className="w-14 h-14 bg-white border border-primary/5 rounded-2xl flex items-center justify-center text-primary/40 hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-8 text-primary/30">
                <FileText className="w-5 h-5" />
                <h2 className="font-bold uppercase tracking-[.3em] text-xs">
                  Bhajan Lyrics
                </h2>
              </div>
              <div className="whitespace-pre-line text-xl md:text-2xl text-primary/80 leading-[1.8] font-medium font-serif">
                {bhajan.lyrics}
              </div>
            </div>

            <div className="lg:col-span-1 border-l border-primary/5 pl-8 space-y-12 hidden lg:block">
              <div>
                <h4 className="text-xs font-black text-primary/20 uppercase tracking-widest mb-6">
                  Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-accent uppercase mb-1">
                      Duration
                    </p>
                    <p className="font-bold text-primary">{bhajan.duration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-accent uppercase mb-1">
                      Deity
                    </p>
                    <p className="font-bold text-primary">{bhajan.category}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button className="flex items-center justify-center w-full py-4 rounded-2xl bg-primary/5 text-primary font-bold hover:bg-accent hover:text-primary transition-all text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Audio
                </button>
                <button className="flex items-center justify-center w-full py-4 rounded-2xl border border-primary/5 text-primary/60 font-medium hover:bg-slate-50 transition-all text-sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Bhajan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
