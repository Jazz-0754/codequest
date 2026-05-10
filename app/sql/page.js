"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Flashcard from "../components/card";

const sqlCards = [
  { title: "SELECT", description: "Used to retrieve data from database tables." },
  { title: "WHERE", description: "Filters records using conditions." },
  { title: "JOIN", description: "Combines data from multiple tables." },
  { title: "GROUP BY", description: "Groups rows with matching values." },
  { title: "ORDER BY", description: "Sorts results ascending or descending." },
  { title: "HAVING", description: "Filters grouped data." },
  { title: "COUNT", description: "Counts total rows." },
  { title: "AVG", description: "Finds average value." }
];

export default function SQLHub() {
  const [randomCards, setRandomCards] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [xp, setXp] = useState(0);

  // ✅ preload audio (IMPORTANT)
  const [clickSound, setClickSound] = useState(null);
  const [successSound, setSuccessSound] = useState(null);

  useEffect(() => {
    setClickSound(new Audio("/click.mp3"));
    setSuccessSound(new Audio("/success.mp3"));
    loadCards();
  }, []);

  const playClick = () => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  };

  const playSuccess = () => {
    if (successSound) {
      successSound.currentTime = 0;
      successSound.play().catch(() => {});
    }
  };

  const questions = [
    { question: "WHERE filters rows from a table.", answer: true },
    { question: "SELECT deletes data.", answer: false },
    { question: "JOIN combines tables.", answer: true }
  ];

  const handleAnswer = (userAnswer) => {
    playClick();

    const correct = questions[currentQuestion].answer;

    if (userAnswer === correct) {
      playSuccess();
      setFeedback("✅ Correct! +10 XP");
      setXp((prev) => prev + 10);
    } else {
      setFeedback("❌ Wrong!");
    }

    setTimeout(() => {
      setFeedback("");

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setFeedback("🎉 Quiz Complete!");
      }
    }, 1000);
  };

  const loadCards = () => {
    const shuffled = [...sqlCards]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

    setRandomCards(shuffled);
  };

  return (
    <main className="relative min-h-screen bg-black text-white p-8">
      <div className="relative z-10">

        <h1 className="text-5xl font-bold text-cyan-400 mb-10">
          SQL Learning Hub
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FLASHCARDS */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-cyan-400">
            <h2 className="text-2xl mb-4 text-cyan-400">Flashcards</h2>

            <div className="space-y-4">
              {randomCards.map((card, i) => (
                <div
                  key={i}
                  onClick={() => {
                    playClick();
                    loadCards();
                  }}
                >
                  <Flashcard
                    title={card.title}
                    description={card.description}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* LEARNING PATH */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-purple-500">
            <h2 className="text-2xl mb-4 text-purple-400">Learning Path</h2>

            <div className="space-y-4">
              <div className="p-4 bg-black rounded-xl border border-cyan-400">
                Beginner SQL
              </div>
              <div className="p-4 bg-black rounded-xl border border-pink-500">
                Intermediate SQL
              </div>
              <div className="p-4 bg-black rounded-xl border border-yellow-400">
                Advanced SQL
              </div>
            </div>

            <Link href="/sql/workspace">
              <button
                onClick={playClick}
                className="mt-6 w-full py-3 bg-cyan-500 rounded-xl font-bold hover:scale-105 transition"
              >
                START PRACTICE →
              </button>
            </Link>
          </div>

          {/* AI PANEL */}
          <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-400">
            <h2 className="text-2xl mb-4 text-yellow-400">🤖 Progress AI</h2>
            <p>📘 Course: SQL</p>
            <p className="mt-2">📊 Level: Beginner</p>
          </div>

        </div>

        {/* QUIZ */}
        <div className="mt-10 bg-[#111827] p-6 rounded-2xl border border-pink-500">
          <h2 className="text-2xl mb-4 text-pink-400">Quick Quiz</h2>

          <p className="mb-4">
            {questions[currentQuestion].question}
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="px-6 py-3 bg-green-500 rounded-xl font-bold"
            >
              TRUE
            </button>

            <button
              onClick={() => handleAnswer(false)}
              className="px-6 py-3 bg-red-500 rounded-xl font-bold"
            >
              FALSE
            </button>
          </div>

          {feedback && <p className="mt-4 font-bold text-lg">{feedback}</p>}

          <p className="mt-4 text-yellow-400">XP: {xp}</p>
        </div>

      </div>
    </main>
  );
}