"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Flower2,
  Users,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

import { getEvents } from "@/app/actions/events";
import { Loader2 } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "UPCOMING" | "PAST">("ALL");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return {
      day: d.getDate().toString().padStart(2, "0"),
      month: d.toLocaleString("default", { month: "short" }),
      year: d.getFullYear().toString(),
    };
  };

  const filteredEvents = events.filter((e) => {
    if (filter === "ALL") return true;
    return e.type === filter;
  });

  return (
    <div className="bg-background-warm min-h-screen relative overflow-hidden mandala-bg">
      <PageHeader
        subtitle="Divine Gatherings"
        title={
          <>
            DIVINE <br />
            <span className="bg-clip-text text-transparent bg-linear-to-b from-accent to-white">
              GATHERINGS
            </span>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-12 md:pt-20">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 md:mb-28 gap-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5 }}
              className="text-primary/70 text-lg md:text-2xl font-medium max-w-xl leading-relaxed"
            >
              Experience the collective energy of congregational devotion in our
              upcoming spiritual gatherings.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex bg-white/40 p-1.5 md:p-2 rounded-2xl md:rounded-4xl border border-primary/5 spiritual-shadow backdrop-blur-xl shrink-0 w-full lg:w-auto overflow-x-auto no-scrollbar"
          >
            {(["ALL", "UPCOMING", "PAST"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`relative flex-1 lg:flex-none px-6 md:px-12 py-3.5 md:py-5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black tracking-[0.2em] transition-all uppercase overflow-hidden whitespace-nowrap ${
                  filter === t
                    ? "text-white"
                    : "text-primary/40 hover:text-primary"
                }`}
              >
                <span className="relative z-10">{t}</span>
                {filter === t && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-primary shadow-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-20">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, idx) => {
                const formatted = formatDate(event.date);
                const isPast = event.type === "LATEST";
                return (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col lg:flex-row bg-white/60 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden spiritual-shadow border border-white/50 group h-full backdrop-blur-md ${
                      isPast ? "opacity-90 grayscale-[0.3]" : ""
                    }`}
                  >
                    {/* Image Section */}
                    <div className="lg:w-[45%] relative h-[300px] sm:h-[400px] lg:h-auto overflow-hidden">
                      {event.imageUrl ? (
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <Flower2 className="w-16 md:w-20 h-16 md:h-20 text-primary/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-r from-primary/60 via-transparent to-transparent hidden lg:block" />
                      <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent lg:hidden" />

                      {/* Status Badge */}
                      <div className="absolute top-6 md:top-10 right-6 md:right-10">
                        <div
                          className={`px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-xl border ${
                            event.type === "UPCOMING"
                              ? "bg-accent/90 text-primary border-accent"
                              : "bg-black/40 text-white/60 border-white/10"
                          }`}
                        >
                          {event.type}
                        </div>
                      </div>

                      {/* Date Overlay */}
                      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 flex flex-col">
                        <div className="flex items-center gap-3 md:gap-4 mb-2">
                          <span className="text-5xl md:text-7xl font-black text-white leading-none drop-shadow-2xl">
                            {formatted.day}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-lg md:text-xl font-black text-accent uppercase tracking-widest drop-shadow-lg">
                              {formatted.month}
                            </span>
                            <span className="text-[10px] md:text-sm font-bold text-white/60 uppercase tracking-[0.3em]">
                              {formatted.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-[55%] p-8 sm:p-12 lg:p-20 flex flex-col">
                      <div className="flex flex-wrap gap-4 md:gap-8 mb-8 md:mb-12">
                        <div className="flex items-center gap-3 px-4 md:px-5 py-2 md:py-3 bg-primary/5 rounded-xl md:rounded-2xl border border-primary/5">
                          <Clock className="w-4 h-4 text-accent" />
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary/60">
                            {new Date(event.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 px-4 md:px-5 py-2 md:py-3 bg-primary/5 rounded-xl md:rounded-2xl border border-primary/5">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary/60">
                            {event.location || "To be announced"}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-primary mb-6 md:mb-8 tracking-tighter leading-tight group-hover:text-accent transition-colors duration-500">
                        {event.title}
                      </h2>
                      <p className="text-primary/60 text-base md:text-xl font-medium leading-[1.6] md:leading-[1.8] mb-10 md:mb-14 flex-1 max-w-2xl">
                        {event.description}
                      </p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10 pt-10 md:pt-12 border-t border-primary/5">
                        <div className="flex items-center gap-6 md:gap-8">
                          <div className="flex -space-x-3 md:-space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                              <div
                                key={i}
                                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-linear-to-br from-accent to-[#D4AF37] border-2 md:border-4 border-white flex items-center justify-center text-[10px] md:text-xs font-black text-primary shadow-lg ring-1 ring-primary/5"
                              >
                                {String.fromCharCode(64 + i)}
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Users className="w-3 h-3 text-accent" />
                              <span className="text-primary font-black text-base md:text-lg tracking-tight leading-none">
                                1250+ Devotees
                              </span>
                            </div>
                            <span className="text-primary/30 text-[8px] uppercase font-black tracking-[0.2em] mt-1 md:mt-2">
                              Expected Attendance
                            </span>
                          </div>
                        </div>

                        <button
                          className={`w-full sm:w-auto group/btn relative flex items-center justify-center gap-6 px-10 md:px-14 py-5 md:py-7 rounded-3xl md:rounded-4xl text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-all overflow-hidden active:scale-95 ${
                            event.type === "UPCOMING"
                              ? "bg-primary text-white shadow-[0_25px_50px_-12px_rgba(17,45,28,0.3)]"
                              : "bg-primary/10 text-primary/40"
                          }`}
                        >
                          <span className="relative z-10">
                            {event.type === "UPCOMING"
                              ? "Join Congregation"
                              : "Explore Gallery"}
                          </span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover/btn:translate-x-2 transition-transform" />
                          {event.type === "UPCOMING" && (
                            <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 md:mt-32 p-10 sm:p-20 bg-primary rounded-[2.5rem] md:rounded-[4rem] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

          <Sparkles className="w-10 md:w-12 h-10 md:h-12 text-accent mx-auto mb-8 md:mb-10 animate-spin-slow" />
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight">
            Want to Host a <span className="text-accent italic">Satsang?</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 md:mb-14">
            Bring the divine vibrations of Thrayambakam to your home or temple.
            Contact us to organize a spiritual gathering.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-6 bg-accent text-primary px-10 md:px-16 py-6 md:py-8 rounded-2xl md:rounded-4xl font-black text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] hover:scale-105 transition-all shadow-2xl active:scale-95"
          >
            Call for Seva
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
