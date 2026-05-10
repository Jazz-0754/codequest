"use client";

import Link from "next/link";

export default function PowerBIPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">

      {/* TITLE */}
      <h1 className="text-5xl font-bold text-blue-400 mb-10">
        Power BI Learning Hub
      </h1>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-6 bg-[#111827] rounded-2xl border border-blue-400">
          <h2 className="text-xl font-bold mb-2">📊 Charts</h2>
          <p className="text-gray-400">
            Learn bar charts, pie charts, and line graphs.
          </p>
        </div>

        <div className="p-6 bg-[#111827] rounded-2xl border border-purple-400">
          <h2 className="text-xl font-bold mb-2">📈 Dashboards</h2>
          <p className="text-gray-400">
            Build interactive dashboards for insights.
          </p>
        </div>

        <div className="p-6 bg-[#111827] rounded-2xl border border-yellow-400">
          <h2 className="text-xl font-bold mb-2">📉 KPIs</h2>
          <p className="text-gray-400">
            Track key performance indicators easily.
          </p>
        </div>

      </div>

      {/* BUTTON */}
      <Link href="/">
        <button className="mt-10 px-6 py-3 bg-blue-500 rounded-xl font-bold hover:scale-105 transition">
          Back to Dashboard
        </button>
      </Link>

    </main>
  );
}