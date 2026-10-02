"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const menuPrincipal = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: "📊",
  },
  {
    name: "Solicitudes",
    href: "/admin/solicitudes",
    icon: "📋",
  },
  {
    name: "Clientes",
    href: "/admin/clientes",
    icon: "👥",
  },
  {
    name: "Servicios",
    href: "/admin/servicios",
    icon: "🧹",
  },
  {
    name: "Trabajos",
    href: "/admin/trabajos",
    icon: "🖼️",
  },
];

const menuSistema = [
  {
    name: "Configuración",
    href: "/admin/configuracion",
    icon: "⚙️",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("admin_user");
      }
    }
  }, []);

  function isActive(href: string) {
    return pathname === href;
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_user");

    document.cookie =
      "access_token=; path=/; max-age=0; SameSite=Lax";

    router.push("/admin/login");
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-slate-800 bg-[#020617] text-white">
      {/* Logo */}
      <div className="flex h-[70px] items-center border-b border-slate-800 px-5">
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg">
          ✦
        </div>

        <div>
          <h1 className="text-base font-bold">
            Clean<span className="text-blue-500">Pro</span>
          </h1>

          <p className="text-[9px] font-semibold tracking-[0.18em] text-blue-400">
            ADMIN PANEL
          </p>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Principal
        </p>

        <div className="space-y-1">
          {menuPrincipal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive(item.href)
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="w-5 text-center">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <p className="mb-3 mt-7 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Sistema
        </p>

        <div className="space-y-1">
          {menuSistema.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive(item.href)
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="w-5 text-center">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </Link>
          ))}

          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            <span className="w-5 text-center">
              🌐
            </span>

            <span>Ver sitio web</span>
          </Link>
        </div>
      </nav>

      {/* Usuario */}
      <div className="border-t border-slate-800 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-800/70 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "A"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {user?.name || "Administrador"}
            </p>

            <p className="truncate text-xs text-slate-400">
              {user?.email || "admin@cleanpro.com"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <span className="w-5 text-center">
            ↪
          </span>

          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}