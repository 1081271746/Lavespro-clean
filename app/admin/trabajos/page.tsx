"use client";

import { useEffect, useState } from "react";

type Work = {
  id: number;
  request_id: number;
  scheduled_date: string | null;
  assigned_to: string | null;
  status: string;
  price: number;
  notes: string | null;
  started_at: string | null;
  completed_at: string | null;
  is_active: boolean;
  created_at: string | null;

  photos: {
  file_name: string;
  url: string;
}[];

};

type ServiceRequest = {
  id: number;
  client_id: number;
  service_id: number;
  requested_date: string | null;
  address: string;
  notes: string | null;
  status: string;
  estimated_price: number;
  is_active: boolean;
};

type Service = {
  id: number;
  name: string;
  description: string | null;
  base_price: number;
  duration: string | null;
  is_active: boolean;
};

type WorkView = Work & {
  request?: ServiceRequest;
  service?: Service;
};

function getStatusStyle(status: string) {
  switch (status) {
    case "Completado":
      return "bg-green-100 text-green-700";

    case "En proceso":
      return "bg-blue-100 text-blue-700";

    case "Cancelado":
      return "bg-red-100 text-red-700";

    case "Programado":
    default:
      return "bg-amber-100 text-amber-700";
  }
}

function formatDate(date: string | null) {
  if (!date) return "Sin fecha";

  return new Date(date).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTimeLocal(date: string | null) {
  if (!date) return "";

  const value = new Date(date);

  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  const hours = String(value.getHours()).padStart(2, "0");
  const minutes = String(value.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function TrabajosPage() {
  const [works, setWorks] = useState<WorkView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [selectedWork, setSelectedWork] = useState<WorkView | null>(null); 
  const [editingWork, setEditingWork] = useState<WorkView | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  useEffect(() => {
    loadWorks();
  }, []);

 async function loadWorks() {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No hay sesión activa");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [worksResponse, servicesResponse] = await Promise.all([
      fetch("http://127.0.0.1:8000/works/", {
        headers,
      }),
      fetch("http://127.0.0.1:8000/services/", {
        headers,
      }),
    ]);

    if (!worksResponse.ok) {
      throw new Error(
        `No se pudieron cargar los trabajos (${worksResponse.status})`
      );
    }

    if (!servicesResponse.ok) {
      throw new Error(
        `No se pudieron cargar los servicios (${servicesResponse.status})`
      );
    }

    const worksData: Work[] = await worksResponse.json();
    const servicesData: Service[] = await servicesResponse.json();

    const worksWithData = await Promise.all(
      worksData.map(async (work) => {
        try {
          const requestResponse = await fetch(
            `http://127.0.0.1:8000/service-requests/${work.request_id}`,
            {
              headers,
            }
          );

          if (!requestResponse.ok) {
            return work;
          }

          const requestData: ServiceRequest =
            await requestResponse.json();

          const serviceData = servicesData.find(
            (service) => service.id === requestData.service_id
          );

          return {
            ...work,
            request: requestData,
            service: serviceData,
          };
        } catch {
          return work;
        }
      })
    );

    setWorks(worksWithData);
  } catch (err) {
    console.error(err);

    setError(
      err instanceof Error
        ? err.message
        : "No fue posible cargar los trabajos."
    );
  } finally {
    setLoading(false);
  }
}
async function updateWork(
  workId: number,
  data: {
    scheduled_date: string | null;
    assigned_to: string;
    status: string;
    price: number;
    notes: string;
    started_at: string | null;
    completed_at: string | null;
  }
) {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No hay sesión activa");
    }

    const response = await fetch(
      `http://127.0.0.1:8000/works/${workId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.detail || "No se pudo actualizar el trabajo"
      );
    }

    setEditingWork(null);

    await loadWorks();

  } catch (error) {
    console.error(error);

    setError(
      error instanceof Error
        ? error.message
        : "No se pudo actualizar el trabajo."
    );
  }
}
  const filteredWorks = works.filter((work) => {
    const matchesSearch =
      work.service?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      work.request?.address
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      work.assigned_to
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      String(work.id).includes(search);

    const matchesFilter =
      filter === "Todos" || work.status === filter;

    return matchesSearch && matchesFilter;
  });

  const completedCount = works.filter(
    (work) => work.status === "Completado"
  ).length;

  const scheduledCount = works.filter(
    (work) => work.status === "Programado"
  ).length;

  const inProgressCount = works.filter(
    (work) => work.status === "En proceso"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="p-6 lg:p-8">

        {/* TÍTULO */}
        <section>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Trabajos
              </h1>

              <p className="mt-2 text-slate-500">
                Administra los trabajos programados y realizados.
              </p>
            </div>

        
          </div>
        </section>

        {/* ESTADÍSTICAS */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

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
              Programados
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {scheduledCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              En proceso
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {inProgressCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Completados
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedCount}
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar trabajo, servicio o encargado..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <div className="flex flex-wrap gap-2">

              {[
                "Todos",
                "Programado",
                "En proceso",
                "Completado",
                "Cancelado",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    filter === status
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {status}
                </button>
              ))}

            </div>

          </div>

        </section>

        {/* MENSAJE DE ERROR */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Cargando trabajos...
            </p>
          </div>
        )}

        {/* SIN RESULTADOS */}
        {!loading && filteredWorks.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="text-4xl">
              🧹
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No hay trabajos
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              No encontramos trabajos con los filtros actuales.
            </p>

          </div>
        )}

        {/* TRABAJOS */}
        {!loading && filteredWorks.length > 0 && (
          <section className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {filteredWorks.map((work) => (

              <article
                key={work.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                {/* CABECERA */}
<div className="relative h-44 bg-slate-100">

  {work.photos && work.photos.length > 0 ? (
    <img
      src={`http://127.0.0.1:8000${work.photos[0].url}`}
      alt={`Foto enviada por el cliente - Trabajo #${work.id}`}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full items-center justify-center">

      <div className="text-center">

        <div className="text-5xl">
          🧹
        </div>

        <p className="mt-3 text-sm font-semibold text-slate-500">
          Trabajo #{work.id}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Sin fotografías
        </p>

      </div>

    </div>
  )}

  {work.photos && work.photos.length > 0 && (
    <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
      Foto del cliente
    </span>
  )}

</div>

                {/* INFORMACIÓN */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h3 className="font-bold text-slate-900">
                        {work.service?.name || `Solicitud #${work.request_id}`}
                      </h3>

                      <p className="mt-1 text-sm text-blue-600">
                        Trabajo #{work.id}
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

                  <div className="mt-4 space-y-2 text-xs text-slate-500">

                    <div className="flex items-center justify-between">
                      <span>📍 Dirección</span>

                      <span className="max-w-[180px] truncate text-right">
                        {work.request?.address || "No disponible"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>📅 Fecha</span>

                      <span>
                        {formatDate(work.scheduled_date)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>👤 Encargado</span>

                      <span>
                        {work.assigned_to || "Sin asignar"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>💰 Precio</span>

                      <span className="font-semibold text-slate-700">
                        {formatPrice(work.price)}
                      </span>
                    </div>

                  </div>

                  {/* ACCIONES */}
                  <div className="mt-5 flex gap-3">

                  <button
  onClick={() => setSelectedWork(work)}
  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
>
  Ver
</button>

                     <button
  onClick={() => setEditingWork(work)}
  className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
>
  Editar
</button>

                  </div>

                </div>

              </article>

            ))}

          </section>
        )}

      </div>
    {selectedWork && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <div>
          <p className="text-sm font-medium text-blue-600">
            Trabajo #{selectedWork.id}
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {selectedWork.service?.name ||
              `Solicitud #${selectedWork.request_id}`}
          </h2>
        </div>

        <button
          onClick={() => setSelectedWork(null)}
          className="rounded-lg px-3 py-2 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          ✕
        </button>

      </div>

      {/* CONTENIDO */}
      <div className="grid gap-4 p-6 sm:grid-cols-2">

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Estado
          </p>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
              selectedWork.status
            )}`}
          >
            {selectedWork.status}
          </span>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Precio
          </p>

          <p className="mt-2 font-bold text-slate-900">
            {formatPrice(selectedWork.price)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Fecha programada
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            {formatDate(selectedWork.scheduled_date)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Encargado
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            {selectedWork.assigned_to || "Sin asignar"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
          <p className="text-xs font-medium text-slate-500">
            Dirección
          </p>

          <p className="mt-2 font-semibold text-slate-900">
            {selectedWork.request?.address || "No disponible"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
          <p className="text-xs font-medium text-slate-500">
            Observaciones
          </p>

          <p className="mt-2 text-sm text-slate-700">
            {selectedWork.notes || "Sin observaciones"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Inicio
          </p>

          <p className="mt-2 text-sm font-semibold text-slate-900">
            {formatDate(selectedWork.started_at)}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Finalización
          </p>

          <p className="mt-2 text-sm font-semibold text-slate-900">
            {formatDate(selectedWork.completed_at)}
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <div className="flex justify-end border-t border-slate-200 p-6">

        <button
          onClick={() => setSelectedWork(null)}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Cerrar
        </button>

      </div>

    </div>

  </div>
)}
     {editingWork && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

    <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <div>
          <p className="text-sm font-medium text-blue-600">
            Editar trabajo #{editingWork.id}
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {editingWork.service?.name ||
              `Solicitud #${editingWork.request_id}`}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setEditingWork(null)}
          className="rounded-lg px-3 py-2 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          ✕
        </button>

      </div>

      {/* FORMULARIO */}
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const formData = new FormData(
            event.currentTarget
          );

          await updateWork(editingWork.id, {
            scheduled_date:
              (formData.get("scheduled_date") as string) || null,

            assigned_to:
              (formData.get("assigned_to") as string) || "",

            status:
              formData.get("status") as string,

            price: Number(
              formData.get("price") || 0
            ),

            notes:
              (formData.get("notes") as string) || "",

            started_at:
              (formData.get("started_at") as string) || null,

            completed_at:
              (formData.get("completed_at") as string) || null,
          });
        }}
      >

        <div className="grid gap-5 p-6 sm:grid-cols-2">

          {/* FECHA */}
          <div className="sm:col-span-2">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Fecha programada
            </label>

            <input
              type="datetime-local"
              name="scheduled_date"
              defaultValue={formatDateTimeLocal(
                editingWork.scheduled_date
              )}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* ENCARGADO */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Encargado
            </label>

            <input
              type="text"
              name="assigned_to"
              defaultValue={editingWork.assigned_to || ""}
              placeholder="Nombre del encargado"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* ESTADO */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Estado
            </label>

            <select
              name="status"
              defaultValue={editingWork.status}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="Programado">
                Programado
              </option>

              <option value="En proceso">
                En proceso
              </option>

              <option value="Completado">
                Completado
              </option>

              <option value="Cancelado">
                Cancelado
              </option>
            </select>

          </div>

          {/* PRECIO */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Precio
            </label>

            <input
              type="number"
              name="price"
              min="0"
              defaultValue={editingWork.price}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* INICIO */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Inicio
            </label>

            <input
              type="datetime-local"
              name="started_at"
              defaultValue={formatDateTimeLocal(
                editingWork.started_at
              )}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* FINALIZACIÓN */}
          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Finalización
            </label>

            <input
              type="datetime-local"
              name="completed_at"
              defaultValue={formatDateTimeLocal(
                editingWork.completed_at
              )}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* OBSERVACIONES */}
          <div className="sm:col-span-2">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Observaciones
            </label>

            <textarea
              name="notes"
              rows={4}
              defaultValue={editingWork.notes || ""}
              placeholder="Escribe observaciones del trabajo..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

          <button
            type="button"
            onClick={() => setEditingWork(null)}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Guardar cambios
          </button>

        </div>

      </form>

    </div>

  </div>
)}
    </div>
  );
}