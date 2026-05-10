"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const symbols = [
  "< />",
  "{ }",
  "[ ]",
  "( )",
  "</>",
  ";",
  "SELECT",
  "SQL",
  "POWER BI",
  "#",
  "*",
  "Let's go",
  "WOOOOO",
  "YAY",
];

export default function Home() {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f172a_0%,#000_70%)]"></div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* ✅ RANDOM FLOATING SYMBOLS */}
      {screenSize.width > 0 &&
        symbols.map((symbol, index) => {
          const startX = Math.random() * screenSize.width;
          const startY = Math.random() * screenSize.height;

          const moveX = startX + (Math.random() - 0.5) * 500;
          const moveY = startY - Math.random() * 700;

          return (
            <motion.div
              key={index}
              initial={{ x: startX, y: startY, opacity: 0 }}
              animate={{
                x: [startX, moveX],
                y: [startY, moveY],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className={`absolute text-2xl font-bold ${
                index % 2 === 0 ? "text-cyan-400" : "text-pink-500"
              }`}
            >
              {symbol}
            </motion.div>
          );
        })}

      {/* Glow */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cyan-500/20 to-transparent blur-3xl"></div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6">

        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <div className="w-24 h-24 rounded-3xl border-4 border-cyan-400 flex items-center justify-center shadow-[0_0_40px_#00ffff]">
            <span className="text-4xl text-pink-500 font-bold">
              {"</>"}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-8xl font-black uppercase tracking-widest bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text"
        >
          CODEQUEST
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-2xl md:text-3xl font-bold tracking-[0.3em] text-gray-300"
        >
          LEVEL UP YOUR TECH SKILLS
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 max-w-2xl text-lg text-gray-400"
        >
          Master SQL & Power BI through AI-powered challenges and gamified learning.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <Link href="/login">
            <button className="px-10 py-5 rounded-2xl text-xl font-bold bg-gradient-to-r from-cyan-500 via-pink-500 to-yellow-400 hover:scale-110 transition">
              ENTER ACADEMY →
            </button>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}