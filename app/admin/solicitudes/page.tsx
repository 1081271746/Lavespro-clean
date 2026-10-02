"use client";

import { useEffect, useMemo, useState } from "react";

type RequestPhoto = {
  file_name: string;
  url: string;
};

type Request = {
  id: number;
  client_id: number;
  service_id: number;
  requested_date: string | null;
  address: string;
  notes: string | null;
  status: string;
  estimated_price: number;
  is_active: boolean;
  photos?: RequestPhoto[];
};

type Client = {
  id: number;
  name: string;
  email: string;
};

type Service = {
  id: number;
  name: string;
  base_price: number;
  is_active: boolean;
};

type RequestForm = {
  client_id: string;
  service_id: string;
  requested_date: string;
  address: string;
  notes: string;
};

const emptyForm: RequestForm = {
  client_id: "",
  service_id: "",
  requested_date: "",
  address: "",
  notes: "",
};

const statuses = [
  "Pendiente",
  "Confirmada",
  "En proceso",
  "Completada",
  "Cancelada",
];

export default function SolicitudesPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingRequest, setEditingRequest] =
    useState<Request | null>(null);

    const [selectedPhoto, setSelectedPhoto] =
  useState<string | null>(null);

    
  const [form, setForm] = useState<RequestForm>(emptyForm);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("access_token");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        requestsResponse,
        clientsResponse,
        servicesResponse,
      ] = await Promise.all([
        fetch("http://127.0.0.1:8000/service-requests/", {
          headers,
        }),
        fetch("http://127.0.0.1:8000/clients/", {
          headers,
        }),
        fetch("http://127.0.0.1:8000/services/", {
          headers,
        }),
      ]);

      if (
        requestsResponse.status === 401 ||
        requestsResponse.status === 403 ||
        clientsResponse.status === 401 ||
        clientsResponse.status === 403 ||
        servicesResponse.status === 401 ||
        servicesResponse.status === 403
      ) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("admin_user");

        document.cookie =
          "access_token=; path=/; max-age=0; SameSite=Lax";

        window.location.href = "/admin/login";
        return;
      }

      if (
        !requestsResponse.ok ||
        !clientsResponse.ok ||
        !servicesResponse.ok
      ) {
        throw new Error(
          "No se pudieron cargar los datos."
        );
      }

      const requestsData =
        await requestsResponse.json();

      const clientsData =
        await clientsResponse.json();

      const servicesData =
        await servicesResponse.json();

      setRequests(requestsData);
      setClients(clientsData);
      setServices(servicesData);
    } catch (err) {
      console.error(err);

      setError(
        "No fue posible cargar las solicitudes. Verifica que FastAPI esté ejecutándose."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function getClient(clientId: number) {
    return clients.find(
      (client) => client.id === clientId
    );
  }

  function getService(serviceId: number) {
    return services.find(
      (service) => service.id === serviceId
    );
  }

  const filteredRequests = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) {
      return requests;
    }

    return requests.filter((request) => {
      const client = getClient(request.client_id);
      const service = getService(request.service_id);

      return (
        String(request.id).includes(term) ||
        (client?.name || "")
          .toLowerCase()
          .includes(term) ||
        (client?.email || "")
          .toLowerCase()
          .includes(term) ||
        (service?.name || "")
          .toLowerCase()
          .includes(term) ||
        request.status.toLowerCase().includes(term) ||
        request.address.toLowerCase().includes(term)
      );
    });
  }, [requests, clients, services, search]);

  function handleInputChange(
    field: keyof RequestForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openCreateModal() {
    setEditingRequest(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function openEditModal(request: Request) {
    setEditingRequest(request);

    setForm({
      client_id: String(request.client_id),
      service_id: String(request.service_id),
      requested_date: request.requested_date
        ? request.requested_date.slice(0, 16)
        : "",
      address: request.address,
      notes: request.notes || "",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function closeModal() {
    if (!saving) {
      setShowModal(false);
      setEditingRequest(null);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.client_id) {
      setError("Selecciona un cliente.");
      return;
    }

    if (!form.service_id) {
      setError("Selecciona un servicio.");
      return;
    }

    if (!form.address.trim()) {
      setError("La dirección es obligatoria.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("access_token");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const isEditing = editingRequest !== null;

      const url = isEditing
        ? `http://127.0.0.1:8000/service-requests/${editingRequest.id}`
        : "http://127.0.0.1:8000/service-requests/";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          client_id: Number(form.client_id),
          service_id: Number(form.service_id),
          requested_date:
            form.requested_date
              ? new Date(
                  form.requested_date
                ).toISOString()
              : null,
          address: form.address.trim(),
          notes: form.notes.trim() || null,
        }),
      });

      const data = await response.json();

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("admin_user");

        document.cookie =
          "access_token=; path=/; max-age=0; SameSite=Lax";

        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "No se pudo guardar la solicitud."
        );
      }

      if (isEditing) {
        setRequests((current) =>
          current.map((item) =>
            item.id === data.id ? data : item
          )
        );

        setSuccess(
          "Solicitud actualizada correctamente."
        );
      } else {
        setRequests((current) => [
          data,
          ...current,
        ]);

        setSuccess(
          "Solicitud creada correctamente."
        );
      }

      setTimeout(() => {
        setShowModal(false);
        setEditingRequest(null);
        setSuccess("");
      }, 1000);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo guardar la solicitud."
      );
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(
    request: Request,
    status: string
  ) {
    try {
      setError("");

      const token =
        localStorage.getItem("access_token");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/service-requests/${request.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("admin_user");

        document.cookie =
          "access_token=; path=/; max-age=0; SameSite=Lax";

        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "No se pudo actualizar el estado."
        );
      }

      setRequests((current) =>
        current.map((item) =>
          item.id === data.id ? data : item
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo actualizar el estado."
      );
    }
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(price));
  }

  function formatDate(date: string | null) {
    if (!date) {
      return "Sin fecha";
    }

    return new Intl.DateTimeFormat("es-CO", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(date));
  }

  function statusClass(status: string) {
    switch (status) {
      case "Pendiente":
        return "bg-amber-100 text-amber-700";

      case "Confirmada":
        return "bg-blue-100 text-blue-700";

      case "En proceso":
        return "bg-purple-100 text-purple-700";

      case "Completada":
        return "bg-green-100 text-green-700";

      case "Cancelada":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="p-6 lg:p-8">

        {/* HEADER */}
        <section>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Solicitudes
              </h1>

              <p className="mt-2 text-slate-500">
                Gestiona las solicitudes de servicio de CleanPro.
              </p>
            </div>

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-blue-50 px-5 py-3">
                <p className="text-xs font-medium text-blue-600">
                  Solicitudes registradas
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-700">
                  {requests.length}
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                + Nueva solicitud
              </button>

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
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Buscar por cliente, servicio o estado..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </section>

        {/* ERROR */}
        {error && !showModal && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* TABLA */}
        {loading ? (

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">
              Cargando solicitudes...
            </p>
          </section>

        ) : (

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1250px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Solicitud
                    </th>

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
                      Precio
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Estado
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Acciones
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {filteredRequests.map((request) => {

                    const client =
                      getClient(request.client_id);

                    const service =
                      getService(request.service_id);

                    return (
                      <tr
                        key={request.id}
                        className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50"
                      >

                        {/* SOLICITUD */}
                        <td className="px-6 py-5">

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              Solicitud #{request.id}
                            </p>

                            <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
                              {request.address}
                            </p>
                          </div>

                        </td>

                        {/* CLIENTE */}
                        <td className="px-6 py-5">

                          <p className="text-sm font-semibold text-slate-900">
                            {client?.name ||
                              `Cliente #${request.client_id}`}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {client?.email || "Sin correo"}
                          </p>

                        </td>

                        {/* SERVICIO */}
                        <td className="px-6 py-5">

                          <p className="text-sm font-medium text-slate-700">
                            {service?.name ||
                              `Servicio #${request.service_id}`}
                          </p>

                        </td>

                        {/* FECHA */}
                        <td className="px-6 py-5 text-sm text-slate-600">
                          {formatDate(
                            request.requested_date
                          )}
                        </td>

                        {/* PRECIO */}
                        <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                          {formatPrice(
                            request.estimated_price
                          )}
                        </td>

                        {/* ESTADO */}
                        <td className="px-6 py-5">

                          <select
                            value={request.status}
                            onChange={(event) =>
                              updateStatus(
                                request,
                                event.target.value
                              )
                            }
                            className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${statusClass(
                              request.status
                            )}`}
                          >

                            {statuses.map((status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>
                            ))}

                          </select>

                        </td>

{/* ACCIONES */}
<td className="px-6 py-5">

  <div className="flex items-center gap-2">

    {request.photos && request.photos.length > 0 && (
      <button
        type="button"
        onClick={() => {
          const photoUrl = request.photos?.[0]?.url;

          if (photoUrl) {
            setSelectedPhoto(
              `http://127.0.0.1:8000${photoUrl}`
            );
          }
        }}
        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
      >
        📷 Ver foto
      </button>
    )}

    <button
      type="button"
      onClick={() =>
        openEditModal(request)
      }
      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
    >
      ✏️ Editar
    </button>

  </div>

</td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

            {filteredRequests.length === 0 && (

              <div className="px-6 py-12 text-center">

                <p className="text-sm font-medium text-slate-600">
                  No se encontraron solicitudes
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {search
                    ? "Prueba con otro término."
                    : "Todavía no hay solicitudes registradas."}
                </p>

              </div>

            )}

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">

              <p className="text-sm text-slate-500">
                Mostrando{" "}
                <span className="font-semibold text-slate-700">
                  {filteredRequests.length}
                </span>{" "}
                solicitudes
              </p>

              <button
                type="button"
                onClick={loadData}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                ↻ Actualizar
              </button>

            </div>

          </section>
        )}

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingRequest
                    ? "Editar solicitud"
                    : "Nueva solicitud"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Registra los datos de la solicitud.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {/* CLIENTE + SERVICIO */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Cliente
                  </label>

                  <select
                    value={form.client_id}
                    onChange={(event) =>
                      handleInputChange(
                        "client_id",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  >

                    <option value="">
                      Seleccionar cliente
                    </option>

                    {clients
                      .filter(
                        (client) =>
                          client.id &&
                          client
                      )
                      .map((client) => (
                        <option
                          key={client.id}
                          value={client.id}
                        >
                          {client.name}
                        </option>
                      ))}

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Servicio
                  </label>

                  <select
                    value={form.service_id}
                    onChange={(event) =>
                      handleInputChange(
                        "service_id",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  >

                    <option value="">
                      Seleccionar servicio
                    </option>

                    {services
                      .filter(
                        (service) =>
                          service.is_active
                      )
                      .map((service) => (
                        <option
                          key={service.id}
                          value={service.id}
                        >
                          {service.name}
                        </option>
                      ))}

                  </select>

                </div>

              </div>

              {/* FECHA */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Fecha y hora solicitada
                </label>

                <input
                  type="datetime-local"
                  value={form.requested_date}
                  onChange={(event) =>
                    handleInputChange(
                      "requested_date",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* DIRECCIÓN */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Dirección
                </label>

                <input
                  type="text"
                  value={form.address}
                  onChange={(event) =>
                    handleInputChange(
                      "address",
                      event.target.value
                    )
                  }
                  placeholder="Ej. Mz 5 casa 4"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* NOTAS */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Observaciones
                </label>

                <textarea
                  value={form.notes}
                  onChange={(event) =>
                    handleInputChange(
                      "notes",
                      event.target.value
                    )
                  }
                  placeholder="Observaciones adicionales..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* BOTONES */}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Guardando..."
                    : editingRequest
                      ? "Guardar cambios"
                      : "Crear solicitud"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* VISOR DE FOTOGRAFÍA */}
{selectedPhoto && (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm"
    onClick={() => setSelectedPhoto(null)}
  >
    <div
      className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      onClick={(event) => event.stopPropagation()}
    >

      <button
        type="button"
        onClick={() => setSelectedPhoto(null)}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-lg text-white transition hover:bg-slate-900"
      >
        ✕
      </button>

      <img
        src={selectedPhoto}
        alt="Fotografía de la solicitud"
        className="max-h-[85vh] w-auto max-w-full object-contain"
      />

    </div>
  </div>
)}

    </main>
  );
}