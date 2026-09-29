"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* LOGO */}
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
            ✦
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              CleanPro
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-600">
              Limpieza profesional
            </p>
          </div>
        </a>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-8 lg:flex">
          <a
            href="#inicio"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Inicio
          </a>

          <a
            href="#servicios"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Servicios
          </a>

          <a
            href="#nosotros"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Nosotros
          </a>

          <a
            href="#trabajos"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Trabajos
          </a>

          <a
            href="#contacto"
            className="text-sm font-medium text-gray-700 transition hover:text-blue-600"
          >
            Contacto
          </a>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://wa.me/573000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:text-blue-600"
          >
            WhatsApp
          </a>

          <a
            href="#cotizacion"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Solicitar cotización
          </a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 lg:hidden"
          aria-label="Abrir menú"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            <a
              href="#inicio"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Inicio
            </a>

            <a
              href="#servicios"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Servicios
            </a>

            <a
              href="#nosotros"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Nosotros
            </a>

            <a
              href="#trabajos"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Trabajos
            </a>

            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Contacto
            </a>

            <a
              href="#cotizacion"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-blue-600 px-5 py-3 text-center font-semibold text-white"
            >
              Solicitar cotización
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}