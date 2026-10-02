"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Correo o contraseña incorrectos");
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));

      document.cookie = `access_token=${data.access_token}; path=/; max-age=3600; SameSite=Lax`;

      router.push("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setError(
        "No se pudo conectar con el servidor. Verifica que FastAPI esté ejecutándose."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-2xl font-bold text-white"
          >
            Clean<span className="text-blue-500">Pro</span>
          </Link>

          <p className="mt-2 text-sm text-slate-400">
            Panel de administración
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Iniciar sesión
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Accede al panel administrativo de CleanPro.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="correo@ejemplo.com"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                />
                Recordarme
              </label>

              <span className="text-slate-400">
                Acceso administrativo
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">
              ACCESO RESTRINGIDO
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <Link
            href="/"
            className="block text-center text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            ← Volver al sitio web
          </Link>
        </div>
      </div>
    </main>
  );
}