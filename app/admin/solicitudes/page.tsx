import Link from "next/link";

const requests = [
  {
    id: 1,
    client: "María López",
    email: "maria.lopez@gmail.com",
    phone: "300 456 7890",
    service: "Lavado de salas",
    date: "02 Oct 2026",
    time: "9:00 AM",
    status: "Pendiente",
  },
  {
    id: 2,
    client: "Carlos Rodríguez",
    email: "carlos.rodriguez@gmail.com",
    phone: "315 789 4561",
    service: "Limpieza de colchones",
    date: "02 Oct 2026",
    time: "11:00 AM",
    status: "En revisión",
  },
  {
    id: 3,
    client: "Laura Martínez",
    email: "laura.martinez@gmail.com",
    phone: "320 654 1234",
    service: "Tapicería de vehículos",
    date: "01 Oct 2026",
    time: "2:00 PM",
    status: "Confirmada",
  },
  {
    id: 4,
    client: "Andrés Gómez",
    email: "andres.gomez@gmail.com",
    phone: "310 321 6547",
    service: "Lavado de tapetes",
    date: "30 Sep 2026",
    time: "10:00 AM",
    status: "Completada",
  },
  {
    id: 5,
    client: "Sofía Herrera",
    email: "sofia.herrera@gmail.com",
    phone: "301 987 6543",
    service: "Lavado de peluches",
    date: "29 Sep 2026",
    time: "3:30 PM",
    status: "Pendiente",
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Pendiente":
      return "bg-amber-100 text-amber-700";

    case "En revisión":
      return "bg-blue-100 text-blue-700";

    case "Confirmada":
      return "bg-purple-100 text-purple-700";

    case "Completada":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function SolicitudesPage() {
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
              className="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
            >
              <span>📋</span>
              Solicitudes
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              <span>👥</span>
              Clientes
            </button>

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
                Solicitudes
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
                  Gestión de solicitudes
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                A
              </div>

            </div>

          </div>

        </header>

        {/* CONTENIDO PRINCIPAL */}
        <div className="p-6 lg:p-8">

          {/* TÍTULO */}
          <section>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Solicitudes de clientes
                </h1>

                <p className="mt-2 text-slate-500">
                  Consulta y administra las solicitudes de servicio recibidas.
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 px-4 py-3">
                <p className="text-xs font-medium text-blue-600">
                  Total de solicitudes
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-700">
                  {requests.length}
                </p>
              </div>

            </div>

          </section>

          {/* FILTROS */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              {/* BUSCADOR */}
              <div className="relative w-full xl:max-w-md">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔎
                </span>

                <input
                  type="text"
                  placeholder="Buscar cliente o servicio..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* FILTROS */}
              <div className="flex flex-wrap gap-2">

                <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
                  Todas
                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                  Pendientes
                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                  En revisión
                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                  Confirmadas
                </button>

                <button className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200">
                  Completadas
                </button>

              </div>

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
                      Servicio
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Fecha
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Hora
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

                  {requests.map((request) => (

                    <tr
                      key={request.id}
                      className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50"
                    >

                      {/* CLIENTE */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                            {request.client.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {request.client}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {request.email}
                            </p>
                          </div>

                        </div>

                      </td>

                      {/* SERVICIO */}
                      <td className="px-6 py-5">

                        <p className="text-sm font-semibold text-slate-800">
                          {request.service}
                        </p>

                      </td>

                      {/* FECHA */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {request.date}
                      </td>

                      {/* HORA */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {request.time}
                      </td>

                      {/* ESTADO */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>

                      </td>

                      {/* ACCIÓN */}
                      <td className="px-6 py-5">

                        <button className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 hover:text-blue-800">
                          Ver detalle
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* PAGINACIÓN VISUAL */}
            <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-slate-500">
                Mostrando <span className="font-semibold text-slate-700">5</span> solicitudes
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