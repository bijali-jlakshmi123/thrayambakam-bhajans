"use client";

import {
  Music,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Play,
  X,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getBhajans,
  createBhajan,
  updateBhajan,
  deleteBhajan,
  getCategories,
} from "@/app/actions/bhajans";
import { motion, AnimatePresence } from "framer-motion";

export default function BhajansAdmin() {
  const [bhajans, setBhajans] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBhajan, setEditingBhajan] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    lyrics: "",
    singer: "",
    audioUrl: "",
    categoryId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [b, c] = await Promise.all([getBhajans(), getCategories()]);
    setBhajans(b);
    setCategories(c);
    setLoading(false);
  }

  const handleOpenModal = (bhajan?: any) => {
    if (bhajan) {
      setEditingBhajan(bhajan);
      setFormData({
        title: bhajan.title,
        lyrics: bhajan.lyrics,
        singer: bhajan.singer || "",
        audioUrl: bhajan.audioUrl || "",
        categoryId: bhajan.categoryId,
      });
    } else {
      setEditingBhajan(null);
      setFormData({
        title: "",
        lyrics: "",
        singer: "",
        audioUrl: "",
        categoryId: categories[0]?.id || "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBhajan) {
      await updateBhajan(editingBhajan.id, formData);
    } else {
      await createBhajan(formData);
    }
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this bhajan?")) {
      await deleteBhajan(id);
      fetchData();
    }
  };

  const filteredBhajans = bhajans.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.singer?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
            Bhajan Library
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Manage your collection of divine bhajans.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full lg:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Bhajan
        </button>
      </div>

      <div className="bg-white rounded-3xl md:rounded-4xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or singer..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6 md:mx-0">
            <div className="inline-block min-w-full align-middle px-6 md:px-0">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-4 pt-2 font-bold text-slate-400 uppercase tracking-widest text-[10px]">
                      Bhajan
                    </th>
                    <th className="pb-4 pt-2 font-bold text-slate-400 uppercase tracking-widest text-[10px]">
                      Category
                    </th>
                    <th className="hidden md:table-cell pb-4 pt-2 font-bold text-slate-400 uppercase tracking-widest text-[10px]">
                      Singer
                    </th>
                    <th className="pb-4 pt-2 font-bold text-slate-400 uppercase tracking-widest text-[10px] text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredBhajans.map((bhajan) => (
                    <tr
                      key={bhajan.id}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                            <Play className="w-4 h-4 fill-current" />
                          </div>
                          <span className="font-bold text-slate-900 text-sm md:text-base">
                            {bhajan.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-6">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                          {bhajan.category.name}
                        </span>
                      </td>
                      <td className="hidden md:table-cell py-6 text-slate-500 font-medium text-sm">
                        {bhajan.singer}
                      </td>
                      <td className="py-6">
                        <div className="flex items-center justify-end space-x-1 md:space-x-2">
                          <button
                            onClick={() => handleOpenModal(bhajan)}
                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all active:scale-90"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(bhajan.id)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
              className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center shrink-0">
                <h2 className="text-2xl font-black text-slate-900">
                  {editingBhajan ? "Edit Bhajan" : "Add New Bhajan"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Title
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Category
                      </label>
                      <select
                        required
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                        value={formData.categoryId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            categoryId: e.target.value,
                          })
                        }
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Singer
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                        value={formData.singer}
                        onChange={(e) =>
                          setFormData({ ...formData, singer: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Audio URL
                      </label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                        value={formData.audioUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, audioUrl: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Lyrics
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium resize-none"
                      value={formData.lyrics}
                      onChange={(e) =>
                        setFormData({ ...formData, lyrics: e.target.value })
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
                      {editingBhajan ? "Update Bhajan" : "Create Bhajan"}
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
