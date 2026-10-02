"use client";

import { useEffect, useState } from "react";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function AdminHeader() {
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

  return (
    <header className="h-[70px] border-b border-slate-200 bg-white flex items-center justify-between px-7">
      <div>
        <p className="text-xs text-slate-500">
          Panel de administración
        </p>

        <h1 className="text-xl font-bold text-slate-900">
          Clean<span className="text-blue-600">Pro</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
        >
          🔔
        </button>

        <div className="text-right">
          <p className="text-sm font-semibold text-slate-800">
            {user?.name || "Administrador"}
          </p>

          <p className="text-xs text-slate-500">
            {user?.role || "Administrador"}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "A"}
        </div>
      </div>
    </header>
  );
}