"use client";

import {
  Image as ImageIcon,
  Plus,
  Trash2,
  Maximize2,
  Filter,
  Grid,
  List,
  X,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from "@/app/actions/gallery";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("grid");

  const [formData, setFormData] = useState({
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const data = await getGalleryItems();
    setItems(data);
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGalleryItem(formData);
    setFormData({ imageUrl: "", description: "" });
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await deleteGalleryItem(id);
      fetchData();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
            Photo Gallery
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Curate and organize your spiritual moments.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full lg:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2" />
          Upload Image
        </button>
      </div>

      <div className="bg-white rounded-3xl md:rounded-4xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8 md:mb-10">
          <div className="flex items-center space-x-2">
            <button className="px-5 py-3 md:px-6 md:py-3 bg-slate-50 text-slate-600 rounded-xl font-bold flex items-center hover:bg-slate-100 transition-colors text-sm">
              <Filter className="w-4 h-4 mr-2" />
              All Albums
            </button>
          </div>
          <div className="flex bg-slate-50 p-1.5 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setView("grid")}
              className={`p-2.5 md:p-3 rounded-xl transition-all ${view === "grid" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2.5 md:p-3 rounded-xl transition-all ${view === "list" ? "bg-white text-primary shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square bg-slate-100 rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 shadow-sm md:shadow-none"
              >
                <img
                  src={item.imageUrl}
                  alt={item.description}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex flex-col items-center justify-center space-y-3 z-20">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="w-12 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform hover:bg-red-600 shadow-lg active:scale-90"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {item.description && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-linear-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform z-10">
                    <p className="text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] truncate">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center shrink-0">
                <h2 className="text-2xl font-black text-slate-900">
                  Upload Image
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Image URL
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Description
                    </label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                      placeholder="Brief description..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-colors order-2 sm:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 order-1 sm:order-2 active:scale-95"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
