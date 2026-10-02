const works = [
  {
    id: 1,
    title: "Limpieza profunda de sala",
    service: "Lavado de salas",
    location: "Pasto",
    date: "28 Sep 2026",
    status: "Publicado",
    before:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Limpieza de colchón",
    service: "Limpieza de colchones",
    location: "Pasto",
    date: "25 Sep 2026",
    status: "Publicado",
    before:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Tapicería interior de vehículo",
    service: "Tapicería de vehículos",
    location: "Pasto",
    date: "22 Sep 2026",
    status: "Publicado",
    before:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Lavado profesional de tapete",
    service: "Lavado de tapetes",
    location: "Pasto",
    date: "18 Sep 2026",
    status: "Publicado",
    before:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Limpieza de mobiliario",
    service: "Mobiliario de oficina",
    location: "Pasto",
    date: "15 Sep 2026",
    status: "Borrador",
    before:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Limpieza de alfombra",
    service: "Lavado de alfombras",
    location: "Pasto",
    date: "12 Sep 2026",
    status: "Publicado",
    before:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
  },
];

function getStatusStyle(status: string) {
  if (status === "Publicado") {
    return "bg-green-100 text-green-700";
  }

  return "bg-amber-100 text-amber-700";
}

export default function TrabajosPage() {
  return (
  <div className="min-h-screen bg-slate-100">

        {/* BODY */}
        <div className="p-6 lg:p-8">

          {/* TÍTULO */}
          <section>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Trabajos realizados
                </h1>

                <p className="mt-2 text-slate-500">
                  Administra los resultados y fotografías de los servicios realizados.
                </p>
              </div>

              <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                + Nuevo trabajo
              </button>

            </div>

          </section>

          {/* ESTADÍSTICAS */}
          <section className="mt-8 grid gap-5 sm:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Trabajos registrados
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {works.length}
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Publicados
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {
                  works.filter(
                    (work) => work.status === "Publicado"
                  ).length
                }
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-sm text-slate-500">
                Borradores
              </p>

              <p className="mt-2 text-3xl font-bold text-amber-600">
                {
                  works.filter(
                    (work) => work.status === "Borrador"
                  ).length
                }
              </p>

            </div>

          </section>

          {/* FILTROS */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="relative w-full lg:max-w-md">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔎
                </span>

                <input
                  type="text"
                  placeholder="Buscar trabajo o servicio..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div className="flex flex-wrap gap-2">

                <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
                  Todos
                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                  Publicados
                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                  Borradores
                </button>

              </div>

            </div>

          </section>

          {/* GALERÍA */}
          <section className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {works.map((work) => (

              <article
                key={work.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                {/* IMÁGENES */}
                <div className="grid grid-cols-2">

                  <div className="relative h-48">

                    <img
                      src={work.before}
                      alt={`Antes - ${work.title}`}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                      Antes
                    </span>

                  </div>

                  <div className="relative h-48">

                    <img
                      src={work.after}
                      alt={`Después - ${work.title}`}
                      className="h-full w-full object-cover"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Después
                    </span>

                  </div>

                </div>

                {/* INFORMACIÓN */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h3 className="font-bold text-slate-900">
                        {work.title}
                      </h3>

                      <p className="mt-1 text-sm text-blue-600">
                        {work.service}
                      </p>

                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        work.status
                      )}`}
                    >
                      {work.status}
                    </span>

                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">

                    <span>
                      📍 {work.location}
                    </span>

                    <span>
                      📅 {work.date}
                    </span>

                  </div>

                  {/* ACCIONES */}
                  <div className="mt-5 flex gap-3">

                    <button className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      Ver
                    </button>

                    <button className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                      Editar
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </section>

        </div>

      </div>

  );
}