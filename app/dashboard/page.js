"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("codequestUser")
    );

    setUser(savedUser);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white p-8">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f172a_0%,#000_70%)]"></div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Content */}
      <div className="relative z-10">

        {/* Top Section */}
        <div className="flex justify-between items-center mb-16">

          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
              Welcome,
              {" "}
              {user?.username || "Explorer"} 🚀
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              Continue leveling up your tech skills.
            </p>
          </div>

          {/* XP Box */}
          <div className="bg-[#111827]/70 border border-cyan-400 px-8 py-5 rounded-2xl backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.2)]">
            <h2 className="text-cyan-400 text-xl font-bold">
              LEVEL 1
            </h2>

            <p className="text-gray-400 mt-2">
              120 XP
            </p>
          </div>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* SQL Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="
              bg-[#111827]/70
              border border-cyan-400
              rounded-3xl
              p-8
              backdrop-blur-xl
              shadow-[0_0_30px_rgba(0,255,255,0.2)]
            "
          >

            <h2 className="text-4xl font-bold text-cyan-400 mb-4">
              SQL Arena
            </h2>

            <p className="text-gray-400 mb-8">
              Practice real-world SQL challenges,
              queries, joins, databases, and AI-powered hints.
            </p>

            <Link href="/sql">
              <button className="px-8 py-4 rounded-xl bg-cyan-500 hover:scale-105 transition duration-300 font-bold">
                ENTER SQL →
              </button>
            </Link>

          </motion.div>

          {/* Power BI Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="
              bg-[#111827]/70
              border border-pink-500
              rounded-3xl
              p-8
              backdrop-blur-xl
              shadow-[0_0_30px_rgba(255,0,255,0.2)]
            "
          >

            <h2 className="text-4xl font-bold text-pink-500 mb-4">
              Power BI Lab
            </h2>

            <p className="text-gray-400 mb-8">
              Learn dashboards, data visualization,
              reports, analytics, and business intelligence.
            </p>

            <Link href="/powerbi">
              <button className="px-8 py-4 rounded-xl bg-pink-500 hover:scale-105 transition duration-300 font-bold">
                ENTER POWER BI →
              </button>
            </Link>
<Link href="/powerbi">
  <div className="p-6 bg-[#111827] rounded-2xl border border-blue-400 hover:scale-105 transition cursor-pointer">
    <h2 className="text-xl font-bold mb-2 text-blue-400">
      📊 Power BI
    </h2>
    <p className="text-gray-400">
      Learn dashboards, charts, and data visualization.
    </p>
  </div>
</Link>
          </motion.div>

        </div>

        {/* AI Mentor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="
            mt-14
            bg-[#111827]/70
            border border-yellow-400
            rounded-3xl
            p-8
            backdrop-blur-xl
            shadow-[0_0_30px_rgba(255,214,10,0.2)]
          "
        >

          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            AI Mentor
          </h2>

          <p className="text-gray-300 text-lg">
            “Focus on SQL Joins today. Based on your learning pattern,
            you’re improving 38% faster than average learners.”
          </p>

        </motion.div>

      </div>
    </main>
  );
}