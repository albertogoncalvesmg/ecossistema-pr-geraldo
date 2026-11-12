"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.error || "Falha na autenticação.");
        setLoading(false);
        return;
      }

      router.push("/central");
      router.refresh();
    } catch {
      setErrorMessage("Erro de comunicação com o servidor.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ga-navy flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-ga-ivory border-t-4 border-ga-gold shadow-2xl p-8 rounded-sm">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest text-ga-gold-dark font-semibold">
            Ecossistema Digital Integrado
          </span>
          <h1 className="text-2xl font-editorial font-bold text-ga-navy mt-1">
            Pastor Geraldo Afonso
          </h1>
          <p className="text-sm text-ga-slate mt-2">
            Acesso restrito à Central Ministerial, Estúdio GA e Arquivo Vivo
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-950/10 border border-red-800/40 text-red-900 text-sm rounded-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-wider text-ga-navy font-semibold mb-1.5"
            >
              E-mail Institucional
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-ga-slate-light text-ga-navy focus:outline-none focus:border-ga-gold"
              placeholder="nome@geraldoafonso.com.br"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs uppercase tracking-wider text-ga-navy font-semibold mb-1.5"
            >
              Senha de Acesso
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-ga-slate-light text-ga-navy focus:outline-none focus:border-ga-gold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-ga-navy hover:bg-ga-navy-light text-white font-medium text-sm tracking-wide uppercase transition-colors border-b-2 border-ga-gold disabled:opacity-50"
          >
            {loading ? "Verificando credenciais..." : "Acessar Central GA"}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-ga-slate-light text-center">
          <p className="text-xs text-ga-slate">
            Ambiente monitorado e protegido conforme diretrizes da LGPD.
          </p>
        </div>
      </div>
    </main>
  );
}