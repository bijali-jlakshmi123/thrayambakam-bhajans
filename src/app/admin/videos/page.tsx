"use client";

import {
  Video as VideoIcon,
  Plus,
  Youtube,
  ExternalLink,
  Trash2,
  Edit,
  Search,
  X,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from "@/app/actions/videos";
import { motion, AnimatePresence } from "framer-motion";

export default function VideosAdmin() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    youtubeId: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const data = await getVideos();
    setVideos(data);
    setLoading(false);
  }

  const handleOpenModal = (video?: any) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        title: video.title,
        youtubeId: video.youtubeId,
      });
    } else {
      setEditingVideo(null);
      setFormData({
        title: "",
        youtubeId: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVideo) {
      await updateVideo(editingVideo.id, formData);
    } else {
      await createVideo(formData);
    }
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      await deleteVideo(id);
      fetchData();
    }
  };

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
            Video Library
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Manage and embed your YouTube video collection.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full lg:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Video
        </button>
      </div>

      <div className="bg-white rounded-3xl md:rounded-4xl p-6 md:p-8 shadow-sm border border-slate-100 mb-12">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by video title..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium text-sm md:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group bg-slate-50 rounded-3xl md:rounded-4xl overflow-hidden border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-video bg-slate-200 relative group">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <Youtube className="w-12 h-12 text-red-500 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900 mb-1 line-clamp-1">
                    {video.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium mb-6">
                    ID: {video.youtubeId}
                  </p>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleOpenModal(video)}
                      className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center text-sm active:scale-95"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-primary/5 rounded-4xl p-10 border border-primary/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-primary text-white rounded-4xl flex items-center justify-center shrink-0">
            <Youtube className="w-10 h-10" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Import from Playlist
            </h3>
            <p className="text-slate-500 font-medium">
              Sync your entire YouTube playlist by pasting the playlist URL
              below.
            </p>
          </div>
          <div className="w-full md:w-auto flex items-center space-x-2">
            <input
              type="text"
              placeholder="Playlist URL..."
              className="px-6 py-4 bg-white border-2 border-primary/10 rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium md:min-w-[300px]"
            />
            <button className="bg-primary text-white p-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
              Sync
            </button>
          </div>
        </div>
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
                  {editingVideo ? "Edit Video" : "Add Video"}
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
                      Title
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                      placeholder="Video title..."
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      YouTube Video ID
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                      placeholder="e.g. dQw4w9WgXcQ"
                      value={formData.youtubeId}
                      onChange={(e) =>
                        setFormData({ ...formData, youtubeId: e.target.value })
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
                      {editingVideo ? "Update Video" : "Add Video"}
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
