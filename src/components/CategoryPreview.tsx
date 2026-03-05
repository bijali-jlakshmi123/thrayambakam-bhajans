"use client";

import { motion } from "framer-motion";
import { Flower2, ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Shiva Bhajans",
    deity: "Mahadeva",
    description:
      "Invoke the eternal silence and power of Lord Shiva through ancient chants.",
    image:
      "https://images.unsplash.com/photo-1590483256070-07264878b276?q=80&w=1974&auto=format&fit=crop",
    link: "/library?cat=shiva",
    color: "from-blue-900/80",
  },
  {
    name: "Krishna Bhajans",
    deity: "Govinda",
    description:
      "Experience the divine love and playfulness of Lord Krishna with melodious songs.",
    image:
      "https://images.unsplash.com/photo-1544911845-1f34a3eb46b1?q=80&w=2070&auto=format&fit=crop",
    link: "/library?cat=krishna",
    color: "from-purple-900/80",
  },
  {
    name: "Devi Bhajans",
    deity: "Shakti",
    description:
      "Connect with the Supreme Divine Mother through powerful soulful hymns.",
    image:
      "https://images.unsplash.com/photo-1561059488-916d69792237?q=80&w=2034&auto=format&fit=crop",
    link: "/library?cat=devi",
    color: "from-red-900/80",
  },
];

export default function CategoryPreview() {
  return (
    <section className="py-32 bg-background-warm relative overflow-hidden mandala-bg">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-accent" />
            <Flower2 className="w-6 h-6 text-accent" />
            <div className="h-px w-12 bg-accent" />
          </motion.div>
          <h2 className="text-sm font-black tracking-[0.4em] uppercase text-primary/40 mb-4 px-[0.4em]">
            Seek Your Divine Connection
          </h2>
          <h3 className="text-5xl md:text-7xl font-black text-primary tracking-tighter">
            Divine <span className="text-accent italic">Collections</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-[600px] overflow-hidden rounded-[3rem] spiritual-shadow temple-border"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-primary/20 to-transparent`}
              />

              {/* Corner Ornaments */}
              <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-accent/40 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-accent/40 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute inset-0 flex flex-col justify-end p-10 transform transition-all duration-500">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 block opacity-60">
                    {cat.deity}
                  </span>
                  <h4 className="text-4xl font-black text-white mb-4 tracking-tight">
                    {cat.name}
                  </h4>
                  <p className="text-white/60 mb-8 line-clamp-3 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {cat.description}
                  </p>
                  <Link
                    href={cat.link}
                    className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-xl"
                  >
                    Open Collection
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
