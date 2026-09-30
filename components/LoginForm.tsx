"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, User } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Mail className="w-4 h-4" />
        </div>
        <input
          id="email"
          type="email"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 font-roboto font-normal focus:outline-none focus:ring-2 focus:ring-coke-red focus:border-transparent focus:bg-white transition-all shadow-sm"
          required
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <User className="w-4 h-4" />
        </div>
        <input
          id="password"
          type="password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 font-roboto font-normal focus:outline-none focus:ring-2 focus:ring-coke-red focus:border-transparent focus:bg-white transition-all shadow-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 px-6 bg-coke-red hover:bg-coke-red/90 text-white font-bold text-sm uppercase tracking-wider rounded-full font-montserrat shadow-md shadow-red-600/30 transition-all transform active:scale-[0.99] cursor-pointer mt-4"
      >
        Login
      </button>
    </form>
  );
}
