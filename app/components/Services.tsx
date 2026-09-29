const services = [ 
  
  
    {
    title: "Limpieza de colchones",
    description:
      "Limpieza profunda para eliminar suciedad, manchas y malos olores, ayudando a mantener tus colchones frescos y limpios.",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lavado de peluches",
    description:
      "Limpieza cuidadosa para mantener los peluches en buenas condiciones y eliminar suciedad y malos olores.",
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lavado de salas",
    description:
      "Recupera la frescura y apariencia de tus muebles mediante procesos profesionales de limpieza y lavado.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tapicería de vehículos",
    description:
      "Limpieza especializada para asientos, pisos, puertas y diferentes superficies del interior de tu vehículo.",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mobiliario de oficina",
    description:
      "Limpieza profesional de sillas, muebles y diferentes elementos utilizados en espacios empresariales.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lavado de tapetes",
    description:
      "Limpieza profunda para eliminar suciedad, manchas y olores, ayudando a conservar tus tapetes.",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lavado de alfombras",
    description:
      "Procesos especializados de limpieza para alfombras de hogares, oficinas y diferentes espacios.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      className="bg-white px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ENCABEZADO */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-4 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Nuestros servicios
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Soluciones profesionales{" "}
            <span className="text-blue-600">
              para cada espacio
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Contamos con servicios especializados para hogares,
            vehículos y empresas, adaptados a diferentes necesidades
            de limpieza.
          </p>

        </div>

        {/* SERVICIOS */}
        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* IMAGEN */}
              <div className="relative h-56 overflow-hidden">

                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              </div>

              {/* CONTENIDO */}
              <div className="p-6">

                <h3 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-600">
                  {service.description}
                </p>

                <a
                  href="#cotizacion"
                  className="mt-5 inline-flex items-center text-sm font-bold text-blue-600 transition hover:text-blue-800"
                >
                  Solicitar este servicio
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>

              </div>
            </article>
          ))}

        </div>

        {/* LLAMADO FINAL */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl bg-slate-50 p-8 text-center sm:flex-row sm:text-left">

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              ¿No sabes qué servicio necesitas?
            </h3>

            <p className="mt-2 text-gray-600">
              Cuéntanos qué necesitas y te ayudaremos a encontrar
              la mejor opción.
            </p>
          </div>

          <a
            href="#cotizacion"
            className="shrink-0 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Solicitar asesoría →
          </a>

        </div>

      </div>
    </section>
  );
}