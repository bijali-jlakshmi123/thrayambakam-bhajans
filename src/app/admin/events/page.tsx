"use client";

import {
  Calendar,
  Plus,
  MapPin,
  Clock,
  Edit,
  Trash2,
  X,
  Loader2,
  Type,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/app/actions/events";
import { motion, AnimatePresence } from "framer-motion";
import { EventType } from "@prisma/client";

export default function EventsAdmin() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    imageUrl: "",
    type: "UPCOMING" as EventType,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  }

  const handleOpenModal = (event?: any) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description || "",
        date: new Date(event.date).toISOString().split("T")[0],
        location: event.location || "",
        imageUrl: event.imageUrl || "",
        type: event.type,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        location: "",
        imageUrl: "",
        type: "UPCOMING",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      date: new Date(formData.date),
    };

    if (editingEvent) {
      await updateEvent(editingEvent.id, submissionData);
    } else {
      await createEvent(submissionData);
    }
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      fetchData();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
            Events & Programs
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Schedule and manage upcoming spiritual gatherings.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="w-full lg:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Event
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl md:rounded-4xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 md:gap-8 group"
            >
              <div className="w-full md:w-40 lg:w-48 h-48 md:h-40 lg:h-48 bg-slate-100 rounded-2xl md:rounded-3xl overflow-hidden shrink-0 relative">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur shadow-sm rounded-lg text-primary font-black text-[10px] uppercase tracking-widest">
                  {event.type}
                </div>
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Calendar className="w-12 h-12" />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col min-w-0">
                <div className="mb-4">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors truncate">
                    {event.title}
                  </h3>
                </div>

                <div className="space-y-3 mb-6 md:mb-8">
                  <div className="flex items-center text-slate-500 font-medium text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-primary shrink-0" />
                    <span className="truncate">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center text-slate-500 font-medium text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-primary shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto flex items-center space-x-3 md:space-x-4">
                  <button
                    onClick={() => handleOpenModal(event)}
                    className="flex-1 py-3 bg-slate-50 hover:bg-primary hover:text-white text-slate-600 rounded-xl font-bold transition-all flex items-center justify-center text-sm active:scale-95"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
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
                  {editingEvent ? "Edit Event" : "Create Event"}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Date
                      </label>
                      <input
                        required
                        type="date"
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                        Type
                      </label>
                      <select
                        className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            type: e.target.value as EventType,
                          })
                        }
                      >
                        <option value="UPCOMING">Upcoming</option>
                        <option value="LATEST">Latest</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium"
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
                    <textarea
                      rows={4}
                      className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 font-medium resize-none"
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
                      {editingEvent ? "Update Event" : "Create Event"}
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
