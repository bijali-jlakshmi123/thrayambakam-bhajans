"use client";

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";

export default function AnalyticsAdmin() {
  const stats = [
    {
      label: "Total Page Views",
      value: "48,290",
      change: "+12.5%",
      trend: "up",
    },
    { label: "Unique Visitors", value: "12,420", change: "+8.2%", trend: "up" },
    { label: "Avg. Session", value: "4m 32s", change: "-2.4%", trend: "down" },
    { label: "Bounce Rate", value: "24.5%", change: "-1.1%", trend: "up" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Analytics</h1>
          <p className="text-slate-500 font-medium">
            Insights into your spiritual community's engagement.
          </p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          {["7D", "30D", "3M", "1Y"].map((period) => (
            <button
              key={period}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${period === "30D" ? "bg-primary text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-4xl shadow-sm border border-slate-100"
          >
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-4">
              {stat.label}
            </p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-slate-900">
                {stat.value}
              </h3>
              <div
                className={`flex items-center text-sm font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-4xl p-10 shadow-sm border border-slate-100 min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">
                Visitor Growth
              </h2>
              <p className="text-slate-400 font-medium text-sm">
                Monthly overview of site traffic
              </p>
            </div>
            <button className="flex items-center space-x-2 text-slate-400 font-bold text-sm bg-slate-50 px-4 py-2 rounded-xl">
              Monthly <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-between pt-4">
            <div className="flex items-end justify-between h-48 gap-4 px-4">
              {[45, 65, 55, 85, 75, 95, 80, 110, 90, 120, 105, 130].map(
                (val, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-4"
                  >
                    <div
                      className="w-full bg-slate-100 rounded-lg relative group transition-all"
                      style={{ height: "100%" }}
                    >
                      <div
                        className={`absolute bottom-0 w-full rounded-lg transition-all duration-1000 group-hover:bg-primary/80 ${i === 11 ? "bg-primary" : "bg-primary/20"}`}
                        style={{ height: `${val}%` }}
                      />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {val * 10} Views
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      {
                        [
                          "JAN",
                          "FEB",
                          "MAR",
                          "APR",
                          "MAY",
                          "JUN",
                          "JUL",
                          "AUG",
                          "SEP",
                          "OCT",
                          "NOV",
                          "DEC",
                        ][i]
                      }
                    </span>
                  </div>
                ),
              )}
            </div>

            <div className="mt-12 flex flex-wrap gap-8 pt-8 border-t border-slate-50">
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-primary rounded-sm mt-1" />
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    In-Store Visitors
                  </p>
                  <p className="text-xl font-bold text-slate-900 px-[0.1em]">
                    34.2K
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-4 h-4 bg-primary/20 rounded-sm mt-1" />
                <div>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    New Visitors
                  </p>
                  <p className="text-xl font-bold text-slate-900 px-[0.1em]">
                    12.8K
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-10 rounded-4xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-slate-900 mb-8">
              Popular Bhajans
            </h3>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-bold text-slate-400 text-xs">
                      #{i}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">
                        Harivarasanam {i}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        4.8K Plays
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold flex items-center justify-center hover:bg-slate-100 transition-colors text-sm">
              View Detailed Report
            </button>
          </div>

          <div className="bg-primary text-white p-10 rounded-4xl shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Globe className="w-32 h-32" />
            </div>
            <h3 className="text-xl font-bold mb-2 relative z-10">
              Global Reach
            </h3>
            <p className="text-white/60 mb-8 relative z-10 text-sm">
              Your spiritual community spans across 12 countries.
            </p>
            <div className="space-y-4 relative z-10">
              {[
                { label: "India", val: 85 },
                { label: "USA", val: 8 },
                { label: "UAE", val: 4 },
                { label: "Others", val: 3 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1">
                    <span>{item.label}</span>
                    <span>{item.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
