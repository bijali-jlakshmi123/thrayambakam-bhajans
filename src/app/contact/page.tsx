"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Flower2,
  Sparkles,
  Youtube,
  Facebook,
  Instagram,
} from "lucide-react";
import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-background-warm min-h-screen relative overflow-hidden mandala-bg">
      <PageHeader
        subtitle="Divine Conversation"
        title={
          <>
            SAY <br />
            <span className="bg-clip-text text-transparent bg-linear-to-b from-accent to-white">
              HELLO
            </span>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-12 md:pt-20">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20">
          {/* Information & Social Side */}
          <div className="lg:w-1/3 flex flex-col gap-10 md:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-white p-10 md:p-14 rounded-3xl md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(17,45,28,0.3)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
              <h2 className="text-3xl md:text-4xl font-black mb-10 md:mb-14 relative z-10 tracking-tight">
                Seva <br />
                <span className="text-accent italic">Connection</span>
              </h2>

              <div className="space-y-8 md:space-y-12 relative z-10">
                <div className="flex items-start gap-6 md:gap-8 group/item">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-accent group-hover/item:bg-accent group-hover/item:text-primary transition-all duration-500">
                    <Phone className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover/item:text-primary transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 md:mb-2">
                      Call Us Direct
                    </span>
                    <span className="text-lg md:text-xl font-black">
                      +91 1234 567 890
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-6 md:gap-8 group/item">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-accent group-hover/item:bg-accent group-hover/item:text-primary transition-all duration-500">
                    <Mail className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover/item:text-primary transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 md:mb-2">
                      Send an Email
                    </span>
                    <span className="text-lg md:text-xl font-black break-all">
                      seva@thrayambakam.com
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-6 md:gap-8 group/item">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-accent group-hover/item:bg-accent group-hover/item:text-primary transition-all duration-500">
                    <MapPin className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover/item:text-primary transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/30 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-1 md:mb-2">
                      Sacred Location
                    </span>
                    <span className="text-lg md:text-xl font-black leading-tight">
                      Ramapuram, Kerala, India <br />
                      686576
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/40 backdrop-blur-xl p-10 md:p-14 rounded-3xl md:rounded-[4rem] border border-white/60 spiritual-shadow group"
            >
              <div className="flex items-center gap-6 mb-8 md:mb-10">
                <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-accent animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
                  Divine Socials
                </h3>
              </div>
              <p className="text-primary/60 mb-8 md:mb-10 text-base md:text-lg font-medium">
                Follow our daily moments of spiritual ecstasy.
              </p>
              <div className="grid grid-cols-3 gap-4 md:gap-6">
                <a
                  href="https://www.facebook.com/share/18EuvCdYNb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-500 shadow-xl border border-primary/5 active:scale-95"
                >
                  <Facebook className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="https://www.instagram.com/thrayambakambhajans?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-500 shadow-xl border border-primary/5 active:scale-95"
                >
                  <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:-translate-y-2 transition-all duration-500 shadow-xl border border-primary/5 active:scale-95"
                >
                  <Youtube className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Cinematic Form Side */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-2xl p-10 sm:p-16 md:p-24 rounded-[3rem] md:rounded-[5rem] spiritual-shadow border border-white/80 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 border-t-2 md:border-t-4 border-l-2 md:border-l-4 border-accent/20 rounded-tl-[3rem] md:rounded-tl-[5rem]" />
              <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 border-b-2 md:border-b-4 border-r-2 md:border-r-4 border-accent/20 rounded-br-[3rem] md:rounded-br-[5rem]" />

              <p className="text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-accent mb-10 md:mb-12">
                Message of Faith
              </p>

              <form className="space-y-10 md:space-y-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] md:text-xs font-black text-primary/30 uppercase tracking-[0.2em] md:tracking-[0.3em] ml-6">
                      Your Identity
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      className="w-full px-6 md:px-10 py-5 md:py-7 bg-primary/5 rounded-2xl md:rounded-4xl border-2 border-transparent focus:outline-none focus:bg-white focus:border-accent transition-all duration-500 text-base md:text-lg font-bold placeholder:text-primary/20 text-primary"
                    />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] md:text-xs font-black text-primary/30 uppercase tracking-[0.2em] md:tracking-[0.3em] ml-6">
                      Email Channel
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-6 md:px-10 py-5 md:py-7 bg-primary/5 rounded-2xl md:rounded-4xl border-2 border-transparent focus:outline-none focus:bg-white focus:border-accent transition-all duration-500 text-base md:text-lg font-bold placeholder:text-primary/20 text-primary"
                    />
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <label className="text-[10px] md:text-xs font-black text-primary/30 uppercase tracking-[0.2em] md:tracking-[0.3em] ml-6">
                    Spiritual Subject
                  </label>
                  <input
                    type="text"
                    placeholder="How can we assist your journey?"
                    className="w-full px-6 md:px-10 py-5 md:py-7 bg-primary/5 rounded-2xl md:rounded-4xl border-2 border-transparent focus:outline-none focus:bg-white focus:border-accent transition-all duration-500 text-base md:text-lg font-bold placeholder:text-primary/20 text-primary"
                  />
                </div>

                <div className="space-y-3 md:space-y-4">
                  <label className="text-[10px] md:text-xs font-black text-primary/30 uppercase tracking-[0.2em] md:tracking-[0.3em] ml-6">
                    Divine Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Share your heart here..."
                    className="w-full px-6 md:px-10 py-5 md:py-7 bg-primary/5 rounded-2xl md:rounded-4xl border-2 border-transparent focus:outline-none focus:bg-white focus:border-accent transition-all duration-500 text-base md:text-lg font-bold placeholder:text-primary/20 min-h-[200px] md:min-h-[250px] text-primary"
                  ></textarea>
                </div>

                <div className="pt-6 md:pt-8">
                  <button className="group/btn relative w-full md:w-auto px-12 md:px-20 py-6 md:py-8 bg-primary text-white font-black text-xs md:text-sm uppercase tracking-[0.4em] md:tracking-[0.5em] rounded-2xl md:rounded-4xl hover:scale-105 transition-all shadow-[0_30px_60px_-15px_rgba(17,45,28,0.4)] overflow-hidden active:scale-95">
                    <span className="relative z-10 flex items-center justify-center gap-4">
                      <Send className="w-5 h-5 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                      Manifest Seva Request
                    </span>
                    <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Divine Greeting Footer */}
        <div className="mt-48 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block relative"
          >
            <div className="flex items-center gap-6 mb-10">
              <div className="h-px w-32 bg-primary/10" />
              <Flower2 className="w-10 h-10 text-accent opacity-40 animate-pulse" />
              <div className="h-px w-32 bg-primary/10" />
            </div>
            <p className="text-primary/20 text-sm font-black uppercase tracking-[1.5em] text-center">
              Loka Samasta Sukhino Bhavantu
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
