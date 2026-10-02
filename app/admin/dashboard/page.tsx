
const stats = [
  {
    title: "Solicitudes nuevas",
    value: "12",
    description: "Pendientes de revisar",
    icon: "📋",
  },
  {
    title: "En proceso",
    value: "5",
    description: "Servicios activos",
    icon: "🧹",
  },
  {
    title: "Completadas",
    value: "28",
    description: "Servicios realizados",
    icon: "✅",
  },
  {
    title: "Clientes",
    value: "36",
    description: "Clientes registrados",
    icon: "👥",
  },
];

const requests = [
  {
    client: "María López",
    service: "Lavado de salas",
    date: "02 Oct 2026",
    status: "Pendiente",
  },
  {
    client: "Carlos Rodríguez",
    service: "Limpieza de colchón",
    date: "02 Oct 2026",
    status: "En revisión",
  },
  {
    client: "Laura Martínez",
    service: "Tapicería de vehículos",
    date: "01 Oct 2026",
    status: "Confirmada",
  },
  {
    client: "Andrés Gómez",
    service: "Lavado de tapetes",
    date: "30 Sep 2026",
    status: "Completada",
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

export default function AdminDashboard() {
       return (
        <div className="min-h-screen bg-slate-100">

      

        {/* BODY */}
        <div className="p-6 lg:p-8">

          {/* BIENVENIDA */}
          <section className="mb-8">

            <h1 className="text-2xl font-bold text-slate-900">
              Buenos días, Administrador 👋
            </h1>

            <p className="mt-2 text-slate-500">
              Aquí tienes un resumen de lo que está pasando en CleanPro.
            </p>

          </section>

          {/* ESTADÍSTICAS */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-3 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {stat.description}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    {stat.icon}
                  </div>

                </div>

              </div>
            ))}

          </section>

          {/* SOLICITUDES */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Solicitudes recientes
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Últimas solicitudes realizadas por los clientes.
                </p>
              </div>

              <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Ver todas
              </button>

            </div>

            {/* TABLA */}
            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left">

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
                      key={`${request.client}-${request.service}`}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                            {request.client.charAt(0)}
                          </div>

                          <span className="text-sm font-semibold text-slate-900">
                            {request.client}
                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {request.service}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-500">
                        {request.date}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            request.status
                          )}`}
                        >
                          {request.status}
                        </span>

                      </td>

                      <td className="px-6 py-5">

                        <button className="text-sm font-semibold text-blue-600 transition hover:text-blue-800">
                          Ver detalle
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </section>

          {/* ACCIONES RÁPIDAS */}
          <section className="mt-8">

            <h2 className="text-lg font-bold text-slate-900">
              Acciones rápidas
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <button className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

                <span className="text-2xl">📋</span>

                <p className="mt-4 font-semibold text-slate-900">
                  Revisar solicitudes
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Ver solicitudes pendientes
                </p>

              </button>

              <button className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

                <span className="text-2xl">👥</span>

                <p className="mt-4 font-semibold text-slate-900">
                  Gestionar clientes
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Consultar clientes
                </p>

              </button>

              <button className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

                <span className="text-2xl">🧹</span>

                <p className="mt-4 font-semibold text-slate-900">
                  Servicios
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Administrar servicios
                </p>

              </button>

              <button className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

                <span className="text-2xl">🖼️</span>

                <p className="mt-4 font-semibold text-slate-900">
                  Trabajos
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Administrar galería
                </p>

              </button>

            </div>

          </section>

        </div>

      </div>

  );
}