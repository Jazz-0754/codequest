"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const symbols = ["< />", "{ }", "[ ]", "( )", "</>", ";"];

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    if (!isLogin) {
      const user = {
        username,
        email,
        password,
      };

      localStorage.setItem("codequestUser", JSON.stringify(user));

      alert("Account Created!");
    }

    const savedUser = JSON.parse(
      localStorage.getItem("codequestUser")
    );

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      router.push("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white flex items-center justify-center">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f172a_0%,#000_70%)]"></div>

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Floating Symbols */}
      {symbols.map((symbol, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={{
            y: [800, -100],
          }}
          transition={{
            duration: 10 + index,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`
            absolute text-3xl font-bold
            ${index % 2 === 0 ? "text-cyan-400" : "text-pink-500"}
          `}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          relative z-10
          w-[450px]
          rounded-3xl
          border border-cyan-400
          bg-[#050816]/80
          backdrop-blur-xl
          p-10
          shadow-[0_0_50px_rgba(0,255,255,0.3)]
        "
      >

        {/* Title */}
        <h1
          className="
            text-5xl
            font-black
            text-center
            mb-3
            bg-gradient-to-r
            from-cyan-400
            via-pink-500
            to-yellow-400
            text-transparent
            bg-clip-text
          "
        >
          {isLogin ? "WELCOME BACK" : "CREATE ACCOUNT"}
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Continue Your AI Learning Journey
        </p>

        {/* Toggle */}
        <div className="flex justify-center gap-10 mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`pb-2 ${
              isLogin
                ? "text-cyan-400 border-b-2 border-cyan-400"
                : "text-gray-500"
            }`}
          >
            LOGIN
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`pb-2 ${
              !isLogin
                ? "text-pink-500 border-b-2 border-pink-500"
                : "text-gray-500"
            }`}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Username */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-4 mb-5 rounded-xl bg-[#111827] border border-cyan-400/30 outline-none focus:border-cyan-400"
          />
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-5 rounded-xl bg-[#111827] border border-cyan-400/30 outline-none focus:border-cyan-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-8 rounded-xl bg-[#111827] border border-cyan-400/30 outline-none focus:border-cyan-400"
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="
            w-full
            py-4
            rounded-xl
            font-bold
            text-lg
            bg-gradient-to-r
            from-cyan-500
            via-pink-500
            to-yellow-400
            hover:scale-105
            transition
            duration-300
            shadow-[0_0_30px_rgba(255,0,255,0.6)]
          "
        >
          {isLogin ? "LOGIN →" : "CREATE ACCOUNT"}
        </button>

      </motion.div>
    </main>
  );
}