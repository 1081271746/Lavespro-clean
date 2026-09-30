"use client";

import { useState } from "react";

const categories = [
  "Todos",
  "Colchones",
  "Salas",
  "Vehículos",
  "Tapetes",
  "Oficinas",
];

const works = [
  {
    title: "Limpieza de colchón",
    category: "Colchones",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Lavado de sala",
    category: "Salas",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Limpieza de vehículo",
    category: "Vehículos",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Limpieza de tapete",
    category: "Tapetes",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Limpieza de oficina",
    category: "Oficinas",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Limpieza profesional",
    category: "Salas",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredWorks =
    activeCategory === "Todos"
      ? works
      : works.filter((work) => work.category === activeCategory);

  return (
    <section
      id="galeria"
      className="bg-slate-50 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ENCABEZADO */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Nuestro trabajo
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Conoce algunos de{" "}
            <span className="text-blue-600">
              nuestros trabajos
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Explora algunos de los servicios que realizamos y conoce
            el tipo de resultados que podemos ofrecer.
          </p>

        </div>

        {/* FILTROS */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

        {/* GALERÍA */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {filteredWorks.map((work) => (
            <article
              key={work.title}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* IMAGEN */}
              <div className="relative h-72 overflow-hidden">

                <img
                  src={work.image}
                  alt={work.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-5 left-5">

                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-blue-600 backdrop-blur">
                    {work.category}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {work.title}
                  </h3>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-14 text-center">

          <p className="text-gray-600">
            ¿Quieres obtener un resultado similar?
          </p>

          <a
            href="#cotizacion"
            className="mt-4 inline-flex rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Solicitar cotización →
          </a>

        </div>

      </div>
    </section>
  );
}