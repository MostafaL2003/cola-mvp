"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-coke-dark text-white">
      <div className="w-full lg:w-1/2 bg-coke-red flex flex-col items-center justify-center p-8 lg:p-16 relative overflow-hidden min-h-87.5 lg:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to from-white/10 via-transparent to-black/20 pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg flex items-center justify-center">
          <Image
            src="/platform.svg"
            alt="Coca-Cola MES Platform"
            width={700}
            height={700}
            className="w-full h-auto max-h-[80vh] object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 bg-coke-dark min-h-125">
        <div className="w-full max-w-sm flex flex-col items-center">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-coke-surface border border-slate-800 flex items-center justify-center shadow-lg mb-3">
              <Image
                src="/factoryIcon.svg"
                alt="MES Icon"
                width={36}
                height={28}
                className="w-9 h-7 object-contain"
                priority
              />
            </div>
            <h1 className="text-3xl font-extrabold tracking-wider text-white font-montserrat uppercase">
              MES
            </h1>
            <p className="text-xs text-slate-400 font-roboto tracking-wide mt-1">
              Manufacturing Execution System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2 font-montserrat"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@coca-cola.com"
                className="w-full px-4 py-3 bg-coke-surface border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 font-roboto font-normal focus:outline-none focus:ring-2 focus:ring-coke-red focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2 font-montserrat"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-coke-surface border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 font-roboto font-normal focus:outline-none focus:ring-2 focus:ring-coke-red focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-coke-red hover:bg-coke-red/90 text-white font-bold text-sm uppercase tracking-wider rounded-lg font-montserrat shadow-lg shadow-red-600/30 transition-all transform active:scale-[0.99] cursor-pointer mt-2"
            >
              Login
            </button>
          </form>

          <div className="mt-12 flex flex-col items-center">
            <Image
              src="/coca-cola-white.svg"
              alt="Coca-Cola"
              width={160}
              height={70}
              className="w-36 h-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
