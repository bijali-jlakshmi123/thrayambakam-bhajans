"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Play,
  Music,
  Mic2,
  FileText,
  ChevronRight,
  Flower2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAudioStore } from "@/lib/store";

import PageHeader from "@/components/PageHeader";
import { Loader2 } from "lucide-react";
import { getBhajans, getCategories } from "@/app/actions/bhajans";

const getCategoryColor = (categoryName: string) => {
  const colors: Record<string, string> = {
    Shiva: "from-blue-500/20",
    Krishna: "from-purple-500/20",
    Devi: "from-red-500/20",
    Ganapathy: "from-orange-500/20",
    Ayyappa: "from-emerald-500/20",
  };
  return colors[categoryName] || "from-slate-500/20";
};

export default function LibraryPage() {
  const [bhajans, setBhajans] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { setTrack, currentTrack, isPlaying, togglePlay } = useAudioStore();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [b, c] = await Promise.all([getBhajans(), getCategories()]);
      setBhajans(b);
      setCategories([{ id: "all", name: "All" }, ...c]);
      setLoading(false);
    }
    loadData();
  }, []);

  const handlePlay = (e: React.MouseEvent, bhajan: any) => {
    e.preventDefault();
    if (currentTrack?.id === bhajan.id) {
      togglePlay();
    } else {
      setTrack(
        {
          ...bhajan,
          color: getCategoryColor(bhajan.category.name),
          duration: "Digital Audio",
        },
        bhajans.map((b) => ({
          ...b,
          color: getCategoryColor(b.category.name),
          duration: "Digital Audio",
        })),
      );
    }
  };

  const filteredBhajans = bhajans.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.singer?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || b.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePlayAll = () => {
    if (filteredBhajans.length > 0) {
      const playlist = filteredBhajans.map((b) => ({
        ...b,
        color: getCategoryColor(b.category.name),
        duration: "Digital Audio",
      }));
      setTrack(playlist[0], playlist);
    }
  };

  return (
    <div className="bg-background-warm min-h-screen relative overflow-hidden mandala-bg">
      <PageHeader
        subtitle="Divine Library"
        title={
          <>
            DIVINE <br />
            <span className="text-accent not-italic">LIBRARY</span>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-10 mb-12 sm:mb-20">
          <div className="flex flex-col sm:flex-row items-center gap-6 max-w-5xl mx-auto w-full">
            <div className="relative group flex-1 w-full">
              <div className="absolute inset-0 bg-accent/5 blur-2xl group-focus-within:bg-accent/10 transition-all rounded-4xl" />
              <Search className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-accent transition-colors w-5 h-5 md:w-6 md:h-6" />
              <input
                type="text"
                placeholder="Search sacred melodies..."
                className="w-full pl-16 md:pl-20 pr-6 md:pr-8 py-6 md:py-8 bg-white/40 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] border border-primary/5 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/40 focus:bg-white transition-all shadow-2xl font-black text-xs md:text-sm uppercase tracking-widest text-primary placeholder:text-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayAll}
              className="w-full sm:w-auto px-8 md:px-12 py-6 md:py-8 bg-primary text-accent rounded-3xl md:rounded-[2.5rem] shadow-2xl font-black text-xs md:text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 group transition-all hover:bg-accent hover:text-primary border border-accent/20 active:scale-95"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              <span>Play All</span>
            </motion.button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-2">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-6 py-3 md:px-10 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black tracking-[0.2em] transition-all uppercase active:scale-95 ${
                  selectedCategory === cat.name
                    ? "bg-primary text-white shadow-2xl translate-y-[-2px]"
                    : "bg-white/40 backdrop-blur-sm text-primary/40 hover:bg-white hover:text-primary border border-primary/5"
                }`}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bhajan List */}
        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          ) : (
            <>
              {filteredBhajans.map((bhajan, idx) => {
                const isCurrentTrack = currentTrack?.id === bhajan.id;
                return (
                  <motion.div
                    key={bhajan.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className={`group relative p-6 md:p-10 rounded-4xl border transition-all flex flex-col md:flex-row items-center gap-10 shadow-lg hover:shadow-2xl overflow-hidden ${
                      isCurrentTrack
                        ? "bg-white border-accent shadow-[0_0_50px_rgba(255,215,0,0.15)] ring-2 ring-accent/20"
                        : "bg-white/60 backdrop-blur-md border-primary/5 hover:border-accent/30 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-r ${bhajan.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-4xl`}
                    />

                    <button
                      onClick={(e) => handlePlay(e, bhajan)}
                      className={`relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-3xl md:rounded-4xl flex items-center justify-center transition-all duration-500 shrink-0 ${
                        isCurrentTrack && isPlaying
                          ? "bg-accent text-primary scale-110 shadow-[0_0_40px_rgba(255,215,0,0.5)]"
                          : "bg-primary text-white group-hover:bg-accent group-hover:text-primary shadow-xl"
                      }`}
                    >
                      {isCurrentTrack && isPlaying ? (
                        <div className="flex gap-1 items-end h-6 md:h-8">
                          <motion.div
                            animate={{ height: [10, 28, 10] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              ease: "easeInOut",
                            }}
                            className="w-1.5 md:w-2 bg-current rounded-full"
                          />
                          <motion.div
                            animate={{ height: [15, 20, 15] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.6,
                              ease: "easeInOut",
                            }}
                            className="w-1.5 md:w-2 bg-current rounded-full"
                          />
                          <motion.div
                            animate={{ height: [20, 10, 20] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.7,
                              ease: "easeInOut",
                            }}
                            className="w-1.5 md:w-2 bg-current rounded-full"
                          />
                          <motion.div
                            animate={{ height: [12, 24, 12] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.9,
                              ease: "easeInOut",
                            }}
                            className="w-1.5 md:w-2 bg-current rounded-full"
                          />
                        </div>
                      ) : (
                        <Play className="w-6 h-6 md:w-8 md:h-8 fill-current ml-1" />
                      )}
                    </button>

                    <div className="relative z-10 flex-1 flex flex-col md:grid md:grid-cols-12 gap-6 items-center w-full">
                      <div className="md:col-span-6 w-full text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                          <span className="text-[9px] md:text-[10px] font-black text-accent uppercase tracking-[.3em] opacity-60">
                            {bhajan.category.name} Melodies
                          </span>
                          {isCurrentTrack && (
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="px-2 md:px-3 py-1 bg-accent text-primary text-[7px] md:text-[8px] font-black rounded-full tracking-widest"
                            >
                              {isPlaying ? "NOW PLAYING" : "PAUSED"}
                            </motion.span>
                          )}
                        </div>
                        <h4
                          className={`text-2xl md:text-3xl font-black tracking-tighter leading-none transition-colors duration-300 ${isCurrentTrack ? "text-accent" : "text-primary group-hover:text-accent"}`}
                        >
                          {bhajan.title}
                        </h4>
                      </div>

                      <div className="md:col-span-3 w-full flex justify-center md:justify-start">
                        <div
                          className={`flex items-center transition-colors ${isCurrentTrack ? "text-primary/60" : "text-primary/40 group-hover:text-primary/60"}`}
                        >
                          <Mic2 className="w-3 md:w-4 h-3 md:h-4 mr-2 md:mr-3" />
                          <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">
                            {bhajan.singer}
                          </span>
                        </div>
                      </div>

                      <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6 w-full pt-4 md:pt-0 border-t md:border-t-0 border-primary/5">
                        <span
                          className={`font-black text-[10px] md:text-xs tracking-widest transition-colors ${isCurrentTrack ? "text-primary/40" : "text-primary/20 group-hover:text-primary/40"}`}
                        >
                          {bhajan.duration}
                        </span>
                        <div className="flex gap-2">
                          <Link
                            href={`/library/${bhajan.id}`}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
                              isCurrentTrack
                                ? "bg-primary/10 text-primary/60 shadow-inner"
                                : "bg-primary/5 text-primary/20 group-hover:text-primary/40 hover:bg-accent hover:text-primary"
                            }`}
                          >
                            <FileText className="w-5 h-5" />
                          </Link>
                          <div
                            className={`w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-xl md:rounded-2xl flex items-center justify-center transition-all ${isCurrentTrack ? "opacity-100 text-accent" : "opacity-0 group-hover:opacity-100 text-primary/20"}`}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {filteredBhajans.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-32 text-center"
                >
                  <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-10">
                    <Music className="w-12 h-12 text-primary/10" />
                  </div>
                  <h3 className="text-2xl font-black text-primary/20 uppercase tracking-[0.5em]">
                    No Melodies Found
                  </h3>
                  <p className="text-primary/20 text-xs font-black uppercase tracking-widest mt-4">
                    Try adjusting your spiritual search
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
