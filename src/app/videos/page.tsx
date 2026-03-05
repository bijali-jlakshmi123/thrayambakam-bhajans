"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { Youtube, Play, ArrowUpRight, Flower2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

import { getVideos } from "@/app/actions/videos";
import { Loader2 } from "lucide-react";

export default function VideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getVideos();
      setVideos(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="bg-background-warm min-h-screen relative overflow-hidden mandala-bg">
      <PageHeader
        subtitle="Divine Cinema"
        title={
          <>
            DIVINE <br />
            <span className="bg-clip-text text-transparent bg-linear-to-b from-accent to-white">
              CINEMA
            </span>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20">
        <div className="text-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-8 md:w-12 h-px bg-accent/30" />
            <Flower2 className="w-5 h-5 md:w-6 md:h-6 text-accent animate-spin-slow" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] md:tracking-[0.5em] uppercase text-accent/80">
              Live vibrations
            </span>
            <div className="w-8 md:w-12 h-px bg-accent/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-7xl md:text-[10rem] font-black text-primary tracking-tighter mb-8 italic leading-[0.9] md:leading-[0.8]"
          >
            DIVINE <br />
            <span className="bg-clip-text text-transparent bg-linear-to-b from-accent via-white to-accent drop-shadow-sm">
              CINEMA
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="text-primary/70 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed px-4"
          >
            Watch our spiritual journeys and musical expressions on YouTube.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-primary animate-spin" />
            </div>
          ) : (
            videos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/60 backdrop-blur-md rounded-[2.5rem] md:rounded-[4rem] overflow-hidden spiritual-shadow border border-white/50 group h-full shadow-2xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <iframe
                    className="w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>

                  {/* Floating Play Indicator Backdrop */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-accent/90 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500 ring-4 ring-white/20">
                      <Play className="w-6 h-6 md:w-10 md:h-10 text-primary fill-current" />
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-6 md:top-8 left-6 md:left-8 p-2 md:p-3 bg-red-600 rounded-xl md:rounded-2xl shadow-xl shadow-red-600/20">
                    <Youtube className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                </div>

                <div className="p-10 md:p-14 lg:p-16">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <span className="text-accent text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] bg-primary px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
                          {new Date(video.createdAt).toLocaleString("default", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <div className="h-px w-8 md:w-12 bg-primary/10" />
                      </div>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-primary leading-tight mb-4 md:mb-6 tracking-tight group-hover:text-accent transition-colors duration-500">
                        {video.title}
                      </h3>
                      <p className="text-primary/50 text-base md:text-lg font-medium leading-relaxed line-clamp-2">
                        {video.description ||
                          "A soulful spiritual expression from Thrayambakam."}
                      </p>
                    </div>
                    <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-primary/5 flex items-center justify-center text-primary/20 group-hover:bg-accent group-hover:text-primary transition-all duration-500 group-hover:rotate-12 active:scale-95">
                      <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Cinematic Subscribe Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 p-24 bg-linear-to-br from-primary to-secondary rounded-[5rem] text-center relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full group-hover:scale-125 transition-transform duration-1000" />

          <div className="relative z-10">
            <Youtube className="w-20 h-20 text-red-600 mx-auto mb-12 animate-pulse" />
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter italic">
              Experience the{" "}
              <span className="text-accent not-italic">Journey</span>
            </h2>
            <p className="text-white/60 text-2xl font-medium max-w-3xl mx-auto mb-16 leading-relaxed">
              Join our community of thousands who experience the divine through
              our weekly video uploads and live streams.
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              className="inline-flex items-center gap-8 px-20 py-8 bg-red-600 text-white font-black text-sm uppercase tracking-[0.5em] rounded-[2.5rem] hover:scale-105 transition-all shadow-3xl hover:shadow-red-600/40 group/btn"
            >
              <Sparkles className="w-5 h-5 text-accent animate-spin-slow" />
              Subscribe to Thrayambakam
              <ArrowUpRight className="w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
