"use client";

import {
  Music,
  Users,
  Calendar,
  TrendingUp,
  Plus,
  ArrowRight,
  Eye,
  MessageSquare,
} from "lucide-react";

const stats = [
  {
    label: "Total Bhajans",
    value: "124",
    icon: Music,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    label: "Upcoming Events",
    value: "3",
    icon: Calendar,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    label: "Total Visits",
    value: "1,420",
    icon: Eye,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  {
    label: "Messages",
    value: "12",
    icon: MessageSquare,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            Good morning, Admin
          </h1>
          <p className="text-slate-500 font-medium">
            Here&apos;s what's happening with Thrayambakam today.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
            <Plus className="w-5 h-5 mr-2" />
            Add New Bhajan
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-6`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">
              {stat.label}
            </p>
            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-slate-900">
              Recent Bhajans
            </h2>
            <button className="text-slate-400 hover:text-primary font-bold flex items-center text-sm">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <Music className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Shiva Stothram {i}
                    </h4>
                    <p className="text-sm text-slate-400">
                      Added yesterday by Ajay
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-200">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-600 px-2">
                    <Plus className="w-5 h-5 rotate-45" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-primary text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <TrendingUp className="w-24 h-24" />
            </div>
            <h3 className="text-xl font-bold mb-4 relative z-10">
              Site Health
            </h3>
            <p className="text-white/60 mb-8 relative z-10">
              Your website is performing well. All systems are online.
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div className="bg-accent h-full w-[95%] rounded-full" />
            </div>
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
              Storage: 45.2 GB / 100 GB
            </span>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Quick Links
            </h3>
            <div className="space-y-4">
              <button className="w-full text-left p-4 rounded-2xl bg-slate-50 font-bold text-slate-600 hover:bg-primary hover:text-white transition-all text-sm">
                Update Event Schedule
              </button>
              <button className="w-full text-left p-4 rounded-2xl bg-slate-50 font-bold text-slate-600 hover:bg-primary hover:text-white transition-all text-sm">
                Upload Gallery Photos
              </button>
              <button className="w-full text-left p-4 rounded-2xl bg-slate-50 font-bold text-slate-600 hover:bg-primary hover:text-white transition-all text-sm">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
