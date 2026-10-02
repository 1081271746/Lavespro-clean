import Link from "next/link";

export default function AdminLogin() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Logo / marca */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-extrabold text-white">
              Laves<span className="text-blue-500">Pro</span>
            </h1>
          </Link>

          <p className="mt-3 text-slate-400">
            Panel de administración
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <div className="mb-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/10 text-2xl">
              🔐
            </div>

            <h2 className="text-2xl font-bold text-white">
              Bienvenido, administrador
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Inicia sesión para gestionar las solicitudes y servicios de
              LavesPro.
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-5">

            {/* Correo */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-200"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                type="email"
                placeholder="admin@lavespro.com"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-200"
              >
                Contraseña
              </label>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:bg-slate-800 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Recordarme */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800"
                />
                Recordarme
              </label>

              <button
                type="button"
                className="font-medium text-blue-400 transition hover:text-blue-300"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Separador */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs text-slate-500">
              ACCESO RESTRINGIDO
            </span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          {/* Volver */}
          <Link
            href="/"
            className="block text-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            ← Volver al sitio principal
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-600">
          © 2026 LavesPro. Panel privado.
        </p>
      </div>
    </main>
  );
}