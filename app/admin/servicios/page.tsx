"use client";

import { useEffect, useMemo, useState } from "react";

type Service = {
  id: number;
  name: string;
  description: string | null;
  base_price: number;
  duration: string | null;
  is_active: boolean;
};

type ServiceForm = {
  name: string;
  description: string;
  base_price: string;
  duration: string;
};

const emptyForm: ServiceForm = {
  name: "",
  description: "",
  base_price: "",
  duration: "",
};

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] =
    useState<Service | null>(null);

  const [form, setForm] = useState<ServiceForm>(emptyForm);

  async function loadServices() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("access_token");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/services/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("admin_user");

        document.cookie =
          "access_token=; path=/; max-age=0; SameSite=Lax";

        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error("No se pudieron cargar los servicios.");
      }

      const data: Service[] = await response.json();

      setServices(data);
    } catch (err) {
      console.error(err);

      setError(
        "No fue posible cargar los servicios. Verifica que FastAPI esté ejecutándose."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  const filteredServices = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) {
      return services;
    }

    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(term) ||
        (service.description || "")
          .toLowerCase()
          .includes(term)
    );
  }, [services, search]);

  function handleInputChange(
    field: keyof ServiceForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openCreateModal() {
    setEditingService(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function openEditModal(service: Service) {
    setEditingService(service);

    setForm({
      name: service.name,
      description: service.description || "",
      base_price: String(service.base_price),
      duration: service.duration || "",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function closeModal() {
    if (!saving) {
      setShowModal(false);
      setEditingService(null);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("El nombre del servicio es obligatorio.");
      return;
    }

    if (!form.base_price.trim()) {
      setError("El precio base es obligatorio.");
      return;
    }

    const price = Number(form.base_price);

    if (Number.isNaN(price) || price < 0) {
      setError("El precio debe ser un número válido.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("access_token");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const isEditing = editingService !== null;

      const url = isEditing
        ? `http://127.0.0.1:8000/services/${editingService.id}`
        : "http://127.0.0.1:8000/services/";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          description:
            form.description.trim() || null,
          base_price: price,
          duration:
            form.duration.trim() || null,
        }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("admin_user");

        document.cookie =
          "access_token=; path=/; max-age=0; SameSite=Lax";

        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.detail || "No se pudo guardar el servicio."
        );
      }

      if (isEditing) {
        setServices((current) =>
          current.map((service) =>
            service.id === data.id ? data : service
          )
        );

        setSuccess(
          "Servicio actualizado correctamente."
        );
      } else {
        setServices((current) => [data, ...current]);

        setSuccess(
          "Servicio creado correctamente."
        );
      }

      setTimeout(() => {
        setShowModal(false);
        setEditingService(null);
        setSuccess("");
      }, 1000);

    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo guardar el servicio."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleServiceStatus(service: Service) {
    const action = service.is_active
      ? "desactivar"
      : "activar";

    const confirmed = window.confirm(
      `¿Seguro que deseas ${action} el servicio "${service.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const token = localStorage.getItem("access_token");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/services/${service.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            is_active: !service.is_active,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
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

      setServices((current) =>
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
    }).format(price);
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="p-6 lg:p-8">

        {/* HEADER */}
        <section>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Servicios
              </h1>

              <p className="mt-2 text-slate-500">
                Administra los servicios ofrecidos por CleanPro.
              </p>
            </div>

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-blue-50 px-5 py-3">
                <p className="text-xs font-medium text-blue-600">
                  Servicios registrados
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-700">
                  {services.length}
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                + Nuevo servicio
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
              placeholder="Buscar servicio..."
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
              Cargando servicios...
            </p>
          </section>

        ) : (

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1100px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Servicio
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Descripción
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Precio base
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Duración
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

                  {filteredServices.map((service) => (

                    <tr
                      key={service.id}
                      className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50"
                    >

                      {/* SERVICIO */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                            🧼
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-slate-900">
                              {service.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              ID #{service.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* DESCRIPCIÓN */}
                      <td className="max-w-xs px-6 py-5 text-sm text-slate-600">
                        {service.description ||
                          "Sin descripción"}
                      </td>

                      {/* PRECIO */}
                      <td className="px-6 py-5 text-sm font-semibold text-slate-700">
                        {formatPrice(
                          Number(service.base_price)
                        )}
                      </td>

                      {/* DURACIÓN */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {service.duration ||
                          "No especificada"}
                      </td>

                      {/* ESTADO */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            service.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {service.is_active
                            ? "Activo"
                            : "Inactivo"}
                        </span>

                      </td>

                      {/* ACCIONES */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(service)
                            }
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            ✏️ Editar
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              toggleServiceStatus(service)
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                              service.is_active
                                ? "border border-red-200 text-red-600 hover:bg-red-50"
                                : "border border-green-200 text-green-600 hover:bg-green-50"
                            }`}
                          >
                            {service.is_active
                              ? "Desactivar"
                              : "Activar"}
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* SIN RESULTADOS */}
            {filteredServices.length === 0 && (

              <div className="px-6 py-12 text-center">

                <p className="text-sm font-medium text-slate-600">
                  No se encontraron servicios
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {search
                    ? "Prueba con otro término."
                    : "Todavía no hay servicios registrados."}
                </p>

              </div>

            )}

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">

              <p className="text-sm text-slate-500">
                Mostrando{" "}
                <span className="font-semibold text-slate-700">
                  {filteredServices.length}
                </span>{" "}
                servicios
              </p>

              <button
                type="button"
                onClick={loadServices}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                ↻ Actualizar
              </button>

            </div>

          </section>
        )}

      </div>

      {/* MODAL CREAR / EDITAR */}
      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* HEADER MODAL */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingService
                    ? "Editar servicio"
                    : "Nuevo servicio"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingService
                    ? "Actualiza la información del servicio."
                    : "Registra un nuevo servicio en CleanPro."}
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

            {/* FORMULARIO */}
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

              {/* NOMBRE */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nombre del servicio
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    handleInputChange(
                      "name",
                      event.target.value
                    )
                  }
                  placeholder="Ej. Limpieza de colchones"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* DESCRIPCIÓN */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Descripción
                </label>

                <textarea
                  value={form.description}
                  onChange={(event) =>
                    handleInputChange(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe el servicio..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* PRECIO / DURACIÓN */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Precio base
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={form.base_price}
                    onChange={(event) =>
                      handleInputChange(
                        "base_price",
                        event.target.value
                      )
                    }
                    placeholder="80000"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Duración
                  </label>

                  <input
                    type="text"
                    value={form.duration}
                    onChange={(event) =>
                      handleInputChange(
                        "duration",
                        event.target.value
                      )
                    }
                    placeholder="2 horas"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

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
                    : editingService
                      ? "Guardar cambios"
                      : "Guardar servicio"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}