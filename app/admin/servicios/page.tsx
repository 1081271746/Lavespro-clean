import Link from "next/link";

const services = [
  {
    id: 1,
    name: "Limpieza de colchones",
    description:
      "Limpieza profunda para eliminar suciedad, manchas y malos olores de colchones.",
    category: "Hogar",
    price: "Desde $60.000",
    requests: 18,
    status: "Activo",
    icon: "🛏️",
  },
  {
    id: 2,
    name: "Lavado de salas",
    description:
      "Limpieza profesional de sofás y salas para recuperar su apariencia y frescura.",
    category: "Hogar",
    price: "Desde $70.000",
    requests: 24,
    status: "Activo",
    icon: "🛋️",
  },
  {
    id: 3,
    name: "Lavado de peluches",
    description:
      "Lavado especializado para peluches utilizando procesos adecuados para cada material.",
    category: "Hogar",
    price: "Desde $25.000",
    requests: 12,
    status: "Activo",
    icon: "🧸",
  },
  {
    id: 4,
    name: "Tapicería de vehículos",
    description:
      "Limpieza profunda de asientos, alfombras y tapicería interior de vehículos.",
    category: "Vehículos",
    price: "Desde $90.000",
    requests: 21,
    status: "Activo",
    icon: "🚗",
  },
  {
    id: 5,
    name: "Mobiliario de oficina",
    description:
      "Limpieza profesional de sillas, muebles y superficies textiles para oficinas.",
    category: "Empresas",
    price: "Desde $80.000",
    requests: 9,
    status: "Activo",
    icon: "🪑",
  },
  {
    id: 6,
    name: "Lavado de tapetes",
    description:
      "Lavado especializado para tapetes de diferentes tamaños y materiales.",
    category: "Hogar",
    price: "Desde $35.000",
    requests: 16,
    status: "Activo",
    icon: "🧹",
  },
  {
    id: 7,
    name: "Lavado de alfombras",
    description:
      "Limpieza profunda de alfombras para eliminar suciedad y recuperar su apariencia.",
    category: "Hogar",
    price: "Desde $50.000",
    requests: 14,
    status: "Activo",
    icon: "🏠",
  },
];

function getCategoryStyle(category: string) {
  switch (category) {
    case "Hogar":
      return "bg-blue-100 text-blue-700";

    case "Vehículos":
      return "bg-purple-100 text-purple-700";

    case "Empresas":
      return "bg-amber-100 text-amber-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-slate-100">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-800 bg-slate-950 text-white lg:block">

        {/* LOGO */}
        <div className="flex h-20 items-center border-b border-slate-800 px-6">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold">
              ✦
            </div>

            <div>
              <h1 className="text-lg font-bold">
                Clean<span className="text-blue-500">Pro</span>
              </h1>

              <p className="text-[10px] font-semibold tracking-widest text-slate-500">
                ADMIN PANEL
              </p>
            </div>

          </div>
        </div>

        {/* NAVEGACIÓN */}
        <nav className="px-4 py-6">

          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Principal
          </p>

          <div className="mt-4 space-y-2">

            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>📊</span>
              Dashboard
            </Link>

            <Link
              href="/admin/solicitudes"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>📋</span>
              Solicitudes
            </Link>

            <Link
              href="/admin/clientes"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>👥</span>
              Clientes
            </Link>

            <Link
              href="/admin/servicios"
              className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              <span>🧹</span>
              Servicios
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              <span>🖼️</span>
              Trabajos
            </button>

          </div>

          <p className="mt-10 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Sistema
          </p>

          <div className="mt-4 space-y-2">

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              <span>⚙️</span>
              Configuración
            </button>

            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>🌐</span>
              Ver sitio web
            </Link>

          </div>

        </nav>

        {/* ADMIN */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4">

          <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
              A
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                Administrador
              </p>

              <p className="truncate text-xs text-slate-500">
                admin@cleanpro.com
              </p>
            </div>

          </div>

          <Link
            href="/admin/login"
            className="mt-3 flex items-center gap-3 px-3 py-2 text-sm text-slate-400 transition hover:text-red-400"
          >
            <span>🚪</span>
            Cerrar sesión
          </Link>

        </div>

      </aside>

      {/* CONTENIDO */}
      <div className="lg:ml-64">

        {/* HEADER */}
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">

          <div className="flex h-20 items-center justify-between px-6 lg:px-8">

            <div>
              <p className="text-sm text-slate-500">
                Panel de administración
              </p>

              <h2 className="text-xl font-bold text-slate-900">
                Servicios
              </h2>
            </div>

            <div className="flex items-center gap-4">

              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
                🔔
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600" />
              </button>

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  Administrador
                </p>

                <p className="text-xs text-slate-500">
                  Gestión de servicios
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                A
              </div>

            </div>

          </div>

        </header>

        {/* BODY */}
        <div className="p-6 lg:p-8">

          {/* TÍTULO */}
          <section>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Servicios
                </h1>

                <p className="mt-2 text-slate-500">
                  Administra los servicios que ofrece CleanPro.
                </p>
              </div>

              <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                + Nuevo servicio
              </button>

            </div>

          </section>

          {/* ESTADÍSTICAS */}
          <section className="mt-8 grid gap-5 sm:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Servicios registrados
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {services.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Servicios activos
              </p>

              <p className="mt-2 text-3xl font-bold text-green-600">
                {services.filter((service) => service.status === "Activo").length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Solicitudes recibidas
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-600">
                {services.reduce(
                  (total, service) => total + service.requests,
                  0
                )}
              </p>
            </div>

          </section>

          {/* BUSCADOR Y FILTROS */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="relative w-full lg:max-w-md">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔎
                </span>

                <input
                  type="text"
                  placeholder="Buscar servicio..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <div className="flex flex-wrap gap-2">

                <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
                  Todos
                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                  Hogar
                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                  Vehículos
                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                  Empresas
                </button>

              </div>

            </div>

          </section>

          {/* TARJETAS */}
          <section className="mt-6 grid gap-5 xl:grid-cols-2">

            {services.map((service) => (

              <article
                key={service.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                {/* CABECERA */}
                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                      {service.icon}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {service.name}
                      </h3>

                      <span
                        className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getCategoryStyle(
                          service.category
                        )}`}
                      >
                        {service.category}
                      </span>
                    </div>

                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {service.status}
                  </span>

                </div>

                {/* DESCRIPCIÓN */}
                <p className="mt-5 text-sm leading-6 text-slate-500">
                  {service.description}
                </p>

                {/* INFO */}
                <div className="mt-5 grid grid-cols-2 gap-4 border-y border-slate-100 py-4">

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Precio
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {service.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Solicitudes
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {service.requests}
                    </p>
                  </div>

                </div>

                {/* ACCIONES */}
                <div className="mt-5 flex gap-3">

                  <button className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Ver servicio
                  </button>

                  <button className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Editar
                  </button>

                </div>

              </article>

            ))}

          </section>

        </div>

      </div>

    </main>
  );
}