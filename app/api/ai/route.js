"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function SQLWorkspace() {
  const levels = [
    {
      level: 1,
      question: "Show all columns from Employees table.",
      answer: "select * from employees;",
      reward: 50,
      table: "Employees(id, name, salary)",
      explanation:
        "SELECT means fetch data. * means all columns. FROM Employees tells SQL which table to use.",
    },
    {
      level: 2,
      question: "Show only employee names from Employees table.",
      answer: "select name from employees;",
      reward: 60,
      table: "Employees(id, name, salary)",
      explanation:
        "SELECT name fetches only names. FROM Employees selects the table.",
    },
    {
      level: 3,
      question: "Find employees with salary greater than 50000.",
      answer: "select * from employees where salary > 50000;",
      reward: 80,
      table: "Employees(id, name, salary)",
      explanation:
        "WHERE filters rows. salary > 50000 selects high salaries only.",
    },
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("Run your query to see results.");
  const [attempts, setAttempts] = useState(2);

  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(20); // ✅ FIXED 20 sec

  const [showCongrats, setShowCongrats] = useState(false);

  // ✅ AI VIDEO SYSTEM
  const [videoUsed, setVideoUsed] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [typedText, setTypedText] = useState("");

  const level = levels[currentLevel];

  // ⏱ LOCK TIMER
  useEffect(() => {
    let timer;
    if (locked && lockTimer > 0) {
      timer = setInterval(() => {
        setLockTimer((prev) => prev - 1);
      }, 1000);
    }

    if (lockTimer <= 0) {
      setLocked(false);
      setAttempts(2);
      setLockTimer(20);
    }

    return () => clearInterval(timer);
  }, [locked, lockTimer]);

  // 🎬 TYPEWRITER EFFECT (anime talking feel)
  useEffect(() => {
    if (showVideo) {
      let i = 0;
      const text = level.explanation;

      const typing = setInterval(() => {
        setTypedText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(typing);
      }, 30);

      return () => clearInterval(typing);
    }
  }, [showVideo, level.explanation]);

  const runQuery = () => {
    if (locked) return;

    const cleaned = query.trim().toLowerCase();

    if (cleaned === level.answer) {
      setResult(`✅ Correct! +${level.reward} XP`);
      setShowCongrats(true);

      setTimeout(() => {
        setShowCongrats(false);

        if (currentLevel < levels.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setQuery("");
          setAttempts(2);
        } else {
          setResult("🏆 Completed all levels!");
        }
      }, 2500);
    } else {
      const left = attempts - 1;
      setAttempts(left);
      setResult(`❌ Wrong! Attempts left: ${left}`);

      if (left <= 0) {
        setLocked(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-5 py-4">
      {showCongrats && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <h1 className="text-5xl font-bold text-cyan-400">
        SQL WORKSPACE
      </h1>

      {locked && (
        <div className="mt-4 bg-red-600 p-3 rounded-xl">
          ⛔ Locked: {lockTimer}s
        </div>
      )}

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="bg-[#05054d] p-6 rounded-3xl border border-cyan-400">
          <h2 className="text-3xl mb-4">Challenge</h2>

          <div className="bg-black p-3 rounded-xl mb-4">
            {level.table}
          </div>

          <p className="text-xl">{level.question}</p>

          <div className="mt-6 text-yellow-400">
            Reward: +{level.reward} XP
          </div>

          {/* ✅ AI BUTTON */}
          <button
            onClick={() => {
              if (videoUsed < 2) {
                setShowVideo(true);
                setVideoUsed(videoUsed + 1);
              }
            }}
            className="mt-6 bg-yellow-500 px-4 py-2 rounded-xl"
          >
            🎥 AI Help ({2 - videoUsed} left)
          </button>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 bg-[#07075f] p-6 rounded-3xl">
          <button
            onClick={runQuery}
            className="bg-cyan-500 px-6 py-3 rounded-xl"
          >
            RUN ▶
          </button>

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-48 mt-4 bg-black p-4 text-green-400"
          />

          <div className="mt-4 bg-black p-4">
            {result}
          </div>
        </div>
      </div>

      {/* ✅ ANIME AI POPUP */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-[#111827] p-6 rounded-2xl w-[500px] text-center">

            <h2 className="text-yellow-400 mb-4">
              🤖 AI Mentor
            </h2>

            {/* 🧠 ANIME CHARACTER */}
            <div className="text-6xl mb-4 animate-bounce">
              🧑‍💻
            </div>

            {/* 💬 TALKING TEXT */}
            <p className="text-gray-300 min-h-[80px]">
              {typedText}
            </p>

            <button
              onClick={() => {
                setShowVideo(false);
                setTypedText("");
              }}
              className="mt-4 bg-pink-500 px-4 py-2 rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}