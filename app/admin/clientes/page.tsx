"use client";

import { useEffect, useMemo, useState } from "react";

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string | null;
  city: string | null;
  is_active: boolean;
};

type ClientForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

const emptyForm: ClientForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "Pasto",
};

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const [form, setForm] = useState<ClientForm>(emptyForm);

  async function loadClients() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("access_token");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/clients/",
        {
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
        throw new Error("No se pudieron cargar los clientes.");
      }

      const data: Client[] = await response.json();

      setClients(data);
    } catch (err) {
      console.error(err);

      setError(
        "No fue posible cargar los clientes. Verifica que FastAPI esté ejecutándose."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadClients();
  }, []);

  const filteredClients = useMemo(() => {
    const term = search.toLowerCase().trim();

    if (!term) {
      return clients;
    }

    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.phone.toLowerCase().includes(term)
    );
  }, [clients, search]);

  function handleInputChange(
    field: keyof ClientForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function openCreateModal() {
    setEditingClient(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function openEditModal(client: Client) {
    setEditingClient(client);

    setForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address || "",
      city: client.city || "Pasto",
    });

    setError("");
    setSuccess("");
    setShowModal(true);
  }

  function closeModal() {
    if (!saving) {
      setShowModal(false);
      setEditingClient(null);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!form.email.trim()) {
      setError("El correo electrónico es obligatorio.");
      return;
    }

    if (!form.phone.trim()) {
      setError("El teléfono es obligatorio.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("access_token");

      if (!token) {
        window.location.href = "/admin/login";
        return;
      }

      const isEditing = editingClient !== null;

      const url = isEditing
        ? `http://127.0.0.1:8000/clients/${editingClient.id}`
        : "http://127.0.0.1:8000/clients/";

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim() || null,
          city: form.city.trim() || "Pasto",
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
          data.detail || "No se pudo guardar el cliente."
        );
      }

      if (isEditing) {
        setClients((current) =>
          current.map((client) =>
            client.id === data.id ? data : client
          )
        );

        setSuccess("Cliente actualizado correctamente.");
      } else {
        setClients((current) => [data, ...current]);

        setSuccess("Cliente registrado correctamente.");
      }

      setTimeout(() => {
        setShowModal(false);
        setEditingClient(null);
        setSuccess("");
      }, 1000);

    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "No se pudo guardar el cliente."
      );
    } finally {
      setSaving(false);
    }
  }

  async function toggleClientStatus(client: Client) {
    const action = client.is_active
      ? "desactivar"
      : "activar";

    const confirmed = window.confirm(
      `¿Seguro que deseas ${action} a ${client.name}?`
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
        `http://127.0.0.1:8000/clients/${client.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            is_active: !client.is_active,
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
          data.detail || "No se pudo actualizar el estado."
        );
      }

      setClients((current) =>
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

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="p-6 lg:p-8">

        {/* HEADER DE LA PÁGINA */}
        <section>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Clientes
              </h1>

              <p className="mt-2 text-slate-500">
                Consulta y administra los clientes registrados en CleanPro.
              </p>
            </div>

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-blue-50 px-5 py-3">
                <p className="text-xs font-medium text-blue-600">
                  Clientes registrados
                </p>

                <p className="mt-1 text-2xl font-bold text-blue-700">
                  {clients.length}
                </p>
              </div>

              <button
                type="button"
                onClick={openCreateModal}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                + Nuevo cliente
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
              placeholder="Buscar por nombre, correo o teléfono..."
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
              Cargando clientes...
            </p>
          </section>

        ) : (

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1100px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-left">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Cliente
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Teléfono
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Ciudad
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Dirección
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

                  {filteredClients.map((client) => (

                    <tr
                      key={client.id}
                      className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50"
                    >

                      {/* CLIENTE */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                            {client.name.charAt(0).toUpperCase()}
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

                      {/* CIUDAD */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {client.city || "Sin ciudad"}
                      </td>

                      {/* DIRECCIÓN */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {client.address || "Sin dirección"}
                      </td>

                      {/* ESTADO */}
                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            client.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {client.is_active
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
                              openEditModal(client)
                            }
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            ✏️ Editar
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              toggleClientStatus(client)
                            }
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                              client.is_active
                                ? "border border-red-200 text-red-600 hover:bg-red-50"
                                : "border border-green-200 text-green-600 hover:bg-green-50"
                            }`}
                          >
                            {client.is_active
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
            {filteredClients.length === 0 && (

              <div className="px-6 py-12 text-center">

                <p className="text-sm font-medium text-slate-600">
                  No se encontraron clientes
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {search
                    ? "Prueba con otro término de búsqueda."
                    : "Todavía no hay clientes registrados."}
                </p>

              </div>

            )}

            {/* FOOTER */}
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">

              <p className="text-sm text-slate-500">
                Mostrando{" "}
                <span className="font-semibold text-slate-700">
                  {filteredClients.length}
                </span>{" "}
                clientes
              </p>

              <button
                type="button"
                onClick={loadClients}
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

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingClient
                    ? "Editar cliente"
                    : "Nuevo cliente"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingClient
                    ? "Actualiza la información del cliente."
                    : "Registra un nuevo cliente en CleanPro."}
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
                  Nombre completo
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
                  placeholder="Ej. Juan Pérez"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* CORREO */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    handleInputChange(
                      "email",
                      event.target.value
                    )
                  }
                  placeholder="cliente@gmail.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* TELÉFONO */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Teléfono
                </label>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    handleInputChange(
                      "phone",
                      event.target.value
                    )
                  }
                  placeholder="3001234567"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  required
                />

              </div>

              {/* DIRECCIÓN / CIUDAD */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

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
                    placeholder="Ej. Calle 18 #20-30"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Ciudad
                  </label>

                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) =>
                      handleInputChange(
                        "city",
                        event.target.value
                      )
                    }
                    placeholder="Pasto"
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
                    : editingClient
                      ? "Guardar cambios"
                      : "Guardar cliente"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}