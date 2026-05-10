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
        "SELECT means fetch data.\n* means all columns.\nFROM Employees tells SQL which table to use.",
    },
    {
      level: 2,
      question: "Show only employee names from Employees table.",
      answer: "select name from employees;",
      reward: 60,
      table: "Employees(id, name, salary)",
      explanation:
        "SELECT name means fetch only the name column.\nFROM Employees chooses the table.",
    },
    {
      level: 3,
      question: "Find employees with salary greater than 50000.",
      answer: "select * from employees where salary > 50000;",
      reward: 80,
      table: "Employees(id, name, salary)",
      explanation:
        "WHERE filters rows.\nsalary > 50000 means only salaries bigger than 50000.",
    },
  ];

  const [currentLevel, setCurrentLevel] = useState(0);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("Run your query to see results.");
  const [attempts, setAttempts] = useState(2);

  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(20);

  const [showCongrats, setShowCongrats] = useState(false);

  // ✅ AUTO ANSWER POPUP
  const [showAutoAnswer, setShowAutoAnswer] = useState(false);

  // AI popup
  const [showVideo, setShowVideo] = useState(false);
  const [videoUsed, setVideoUsed] = useState(0);

  const level = levels[currentLevel];

  // TIMER
  useEffect(() => {
    let timer;

    if (locked && lockTimer > 0) {
      timer = setInterval(() => {
        setLockTimer((prev) => prev - 1);
      }, 1000);
    }

    // ✅ SHOW ANSWER AFTER 20 SEC (when reaches 0)
    if (locked && lockTimer === 0) {
      setShowAutoAnswer(true);

      setTimeout(() => {
        setShowAutoAnswer(false);
      }, 4000);

      setLocked(false);
      setAttempts(2);
      setLockTimer(20);
    }

    return () => clearInterval(timer);
  }, [locked, lockTimer]);

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
          setResult("Next level unlocked!");
          setAttempts(2);
          setVideoUsed(0);
        } else {
          setResult("🏆 Completed all levels!");
        }
      }, 3000);
    } else {
      const left = attempts - 1;
      setAttempts(left);
      setResult(`❌ Wrong! Attempts left: ${left}`);

      if (left <= 0) {
        setLocked(true);
        setResult("⛔ Locked for 20 seconds");
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

      <div className="mt-5 text-xl">
        LEVEL {level.level}
      </div>

      {locked && (
        <div className="mt-4 bg-red-600 p-3 rounded-xl">
          ⛔ Locked: {lockTimer}s
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 mt-6">

        {/* LEFT */}
        <div className="bg-[#05054d] p-6 rounded-2xl">
          <h2 className="text-2xl mb-4">Challenge</h2>

          <div className="bg-black p-3 rounded">
            {level.table}
          </div>

          <p className="mt-6 text-lg">
            {level.question}
          </p>

          <p className="mt-4">Attempts: {attempts}</p>

          {/* AI BUTTON */}
          <button
            onClick={() => {
              if (videoUsed < 2) {
                setShowVideo(true);
                setVideoUsed(videoUsed + 1);
              }
            }}
            className="mt-4 px-4 py-2 bg-yellow-500 rounded"
          >
            🎥 AI Video ({2 - videoUsed} left)
          </button>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 bg-[#07075f] p-6 rounded-2xl">

          <button
            onClick={runQuery}
            disabled={locked}
            className="mb-4 px-6 py-3 bg-cyan-500 rounded"
          >
            RUN
          </button>

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-40 bg-black p-4 text-green-400"
          />

          <div className="mt-4 bg-black p-4">
            {result}
          </div>
        </div>

      </div>

      {/* ✅ AUTO ANSWER POPUP */}
      {showAutoAnswer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-[#111827] p-6 rounded-2xl text-center w-[400px]">
            <h2 className="text-yellow-400 mb-3">⏱ Time Up!</h2>

            <p className="text-green-400 font-bold">Answer:</p>
            <p className="text-cyan-300 mb-3">{level.answer}</p>

            <p className="text-gray-300 whitespace-pre-line text-sm">
              {level.explanation}
            </p>
          </div>
        </div>
      )}

      {/* AI POPUP */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-[#111827] p-6 rounded-2xl text-center w-[420px]">

            <h2 className="text-yellow-400 text-xl mb-4">
              🤖 AI Tutor
            </h2>

            <div className="text-6xl mb-3">🧑‍💻✨</div>

            <p className="text-green-400 font-bold">Answer:</p>
            <p className="text-cyan-300 mb-3">{level.answer}</p>

            <p className="text-gray-300 whitespace-pre-line">
              {level.explanation}
            </p>

            <button
              onClick={() => setShowVideo(false)}
              className="mt-4 px-4 py-2 bg-pink-500 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}