import Link from "next/link";

const clients = [
  {
    id: 1,
    name: "María López",
    email: "maria.lopez@gmail.com",
    phone: "300 456 7890",
    services: 3,
    lastService: "Lavado de salas",
    status: "Activo",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@gmail.com",
    phone: "315 789 4561",
    services: 2,
    lastService: "Limpieza de colchones",
    status: "Activo",
  },
  {
    id: 3,
    name: "Laura Martínez",
    email: "laura.martinez@gmail.com",
    phone: "320 654 1234",
    services: 4,
    lastService: "Tapicería de vehículos",
    status: "Activo",
  },
  {
    id: 4,
    name: "Andrés Gómez",
    email: "andres.gomez@gmail.com",
    phone: "310 321 6547",
    services: 1,
    lastService: "Lavado de tapetes",
    status: "Nuevo",
  },
  {
    id: 5,
    name: "Sofía Herrera",
    email: "sofia.herrera@gmail.com",
    phone: "301 987 6543",
    services: 2,
    lastService: "Lavado de peluches",
    status: "Activo",
  },
];

function getStatusStyle(status: string) {
  if (status === "Nuevo") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-green-100 text-green-700";
}

export default function ClientesPage() {
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
              className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              <span>👥</span>
              Clientes
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              <span>🧹</span>
              Servicios
            </button>

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
                Clientes
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
                  Gestión de clientes
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
                  Clientes
                </h1>

                <p className="mt-2 text-slate-500">
                  Consulta la información de los clientes y su historial de servicios.
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 px-5 py-3">
                <p className="text-xs font-medium text-blue-600">
                  Clientes registrados
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-700">
                  {clients.length}
                </p>
              </div>

            </div>

          </section>

          {/* BUSCADOR */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="relative w-full lg:max-w-md">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔎
              </span>

              <input
                type="text"
                placeholder="Buscar por nombre, correo o teléfono..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </section>

          {/* TABLA */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Cliente
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Teléfono
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Servicios
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Último servicio
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Estado
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Acción
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {clients.map((client) => (

                    <tr
                      key={client.id}
                      className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50"
                    >

                      {/* CLIENTE */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                            {client.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {client.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {client.email}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* TELÉFONO */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {client.phone}
                      </td>

                      {/* SERVICIOS */}
                      <td className="px-6 py-5">

                        <span className="font-semibold text-slate-900">
                          {client.services}
                        </span>

                        <span className="ml-1 text-sm text-slate-500">
                          servicios
                        </span>

                      </td>

                      {/* ÚLTIMO SERVICIO */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {client.lastService}
                      </td>

                      {/* ESTADO */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            client.status
                          )}`}
                        >
                          {client.status}
                        </span>

                      </td>

                      {/* ACCIÓN */}
                      <td className="px-6 py-5">

                        <button className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 hover:text-blue-800">
                          Ver perfil
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* FOOTER */}
            <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-slate-500">
                Mostrando{" "}
                <span className="font-semibold text-slate-700">
                  {clients.length}
                </span>{" "}
                clientes
              </p>

              <div className="flex items-center gap-2">

                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-400">
                  ←
                </button>

                <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
                  1
                </button>

                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600">
                  2
                </button>

                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600">
                  →
                </button>

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}