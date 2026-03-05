"use client";

import { motion } from "framer-motion";
import { Camera, Maximize2, Flower2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";

import { getGalleryItems } from "@/app/actions/gallery";
import { Loader2 } from "lucide-react";

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getGalleryItems();
      setItems(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="bg-background-warm min-h-screen relative overflow-hidden mandala-bg">
      <PageHeader
        subtitle="Visual Devotion"
        title={
          <>
            DIVINE <br />
            <span className="bg-clip-text text-transparent bg-linear-to-b from-accent to-white">
              GALLERY
            </span>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-12 md:pt-20">
        <div className="text-center mb-16 md:mb-28">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="text-primary/70 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest"
          >
            Capturing the moments of spiritual ecstasy and community devotion.
          </motion.p>
        </div>

        {/* Stunning Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-primary animate-spin" />
            </div>
          ) : (
            items.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer overflow-hidden rounded-3xl md:rounded-[3.5rem] spiritual-shadow temple-border bg-white ring-1 ring-primary/5 shadow-2xl"
              >
                <div className="relative aspect-4/5 overflow-hidden">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.description || "Divine Moment"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Spiritual Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Corner Ornaments */}
                  <div className="absolute top-6 md:top-8 left-6 md:left-8 w-8 h-8 md:w-10 md:h-10 border-t-2 border-l-2 border-accent/40 rounded-tl-xl md:rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0" />
                  <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 w-8 h-8 md:w-10 md:h-10 border-b-2 border-r-2 border-accent/40 rounded-br-xl md:rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-4 group-hover:translate-x-0" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-accent text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 md:mb-3 block opacity-0 group-hover:opacity-60 transition-opacity duration-500 delay-100">
                      Visual Devotion
                    </span>
                    <h3 className="text-white font-black text-2xl md:text-3xl mb-4 md:mb-6 tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {photo.description || "Divine Moment"}
                    </h3>
                    <div className="flex items-center text-white/40 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      <Maximize2 className="w-3 md:w-4 h-3 md:h-4 mr-2 md:mr-3 text-accent" />
                      <span>View Immersive Size</span>
                    </div>
                  </div>

                  {/* Camera Icon Badge */}
                  <div className="absolute top-6 md:top-8 right-6 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 duration-500 ring-1 ring-white/20 shadow-2xl">
                    <Camera className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Visual Experience Footer */}
        <div className="mt-40 text-center relative py-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/10 to-transparent" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative"
          >
            <Flower2 className="w-10 h-10 text-accent mx-auto mb-8 opacity-40" />
            <p className="text-primary/30 text-xs font-black uppercase tracking-[1em]">
              Capturing Divine Moments
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
