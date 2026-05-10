"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Flashcard({ title, description }) {
  const [mounted, setMounted] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={false} // ✅ FIX (hydration error solved)
      whileHover={{ scale: 1.05 }}
      onClick={() => setFlipped(!flipped)} // ✅ flip
      className="
        cursor-pointer
        rounded-3xl
        border
        border-cyan-400
        bg-[#081120]
        p-8
        h-48
        flex
        flex-col
        justify-center
        items-center
        shadow-[0_0_25px_rgba(0,255,255,0.3)]
      "
    >
      {!flipped ? (
        <h2 className="text-3xl font-bold text-cyan-400 mb-4">
          {title}
        </h2>
      ) : (
        <p className="text-gray-300 text-center">
          {description}
        </p>
      )}
    </motion.div>
  );
}