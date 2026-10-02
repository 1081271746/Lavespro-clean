import Link from "next/link";

export default function ConfiguracionPage() {
  return (
  <div className="min-h-screen bg-slate-100">

        {/* BODY */}
        <div className="p-6 lg:p-8">

          {/* TÍTULO */}
          <section>
            <h1 className="text-2xl font-bold text-slate-900">
              Configuración
            </h1>

            <p className="mt-2 text-slate-500">
              Administra la información y preferencias de CleanPro.
            </p>
          </section>

          {/* PERFIL ADMINISTRADOR */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                  A
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Perfil del administrador
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Información de la cuenta administrativa.
                  </p>
                </div>

              </div>

            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Nombre
                </label>

                <input
                  type="text"
                  defaultValue="Administrador"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Correo electrónico
                </label>

                <input
                  type="email"
                  defaultValue="admin@cleanpro.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">

              <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Guardar cambios
              </button>

            </div>

          </section>

          {/* INFORMACIÓN DEL NEGOCIO */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 p-6">

              <h2 className="text-lg font-bold text-slate-900">
                Información del negocio
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Datos generales que utiliza CleanPro.
              </p>

            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Nombre del negocio
                </label>

                <input
                  type="text"
                  defaultValue="CleanPro"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Teléfono
                </label>

                <input
                  type="tel"
                  defaultValue="300 000 0000"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Correo del negocio
                </label>

                <input
                  type="email"
                  defaultValue="contacto@cleanpro.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Ciudad
                </label>

                <input
                  type="text"
                  defaultValue="Pasto, Nariño"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-700">
                  Dirección
                </label>

                <input
                  type="text"
                  placeholder="Dirección del negocio"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

            <div className="flex justify-end border-t border-slate-200 px-6 py-4">

              <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                Guardar información
              </button>

            </div>

          </section>

          {/* SEGURIDAD */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-xl">
                  🔐
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Seguridad
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Administra las opciones de seguridad de tu cuenta.
                  </p>
                </div>

              </div>

            </div>

            <div className="divide-y divide-slate-100">

              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Cambiar contraseña
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Actualiza periódicamente la contraseña del administrador.
                  </p>
                </div>

                <button className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  Cambiar contraseña
                </button>

              </div>

              <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Sesiones activas
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Controla los dispositivos que tienen acceso a la cuenta.
                  </p>
                </div>

                <button className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50">
                  Cerrar otras sesiones
                </button>

              </div>

            </div>

          </section>

          {/* NOTIFICACIONES */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  🔔
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Notificaciones
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Configura qué notificaciones quieres recibir.
                  </p>
                </div>

              </div>

            </div>

            <div className="divide-y divide-slate-100">

              <div className="flex items-center justify-between p-6">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Nuevas solicitudes
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Recibir una alerta cuando un cliente envíe una solicitud.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 rounded border-slate-300"
                />

              </div>

              <div className="flex items-center justify-between p-6">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Solicitudes confirmadas
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Recibir una alerta cuando se confirme un servicio.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 rounded border-slate-300"
                />

              </div>

              <div className="flex items-center justify-between p-6">

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Trabajos publicados
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Recibir una alerta cuando se publique un nuevo trabajo.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 rounded border-slate-300"
                />

              </div>

            </div>

          </section>

          {/* ZONA DE PELIGRO */}
          <section className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="font-bold text-red-800">
                  Zona de administración
                </h2>

                <p className="mt-1 max-w-2xl text-sm text-red-600">
                  Estas opciones pueden afectar el funcionamiento general
                  del panel administrativo.
                </p>

              </div>

              <Link
                href="/admin/login"
                className="shrink-0 rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Cerrar sesión
              </Link>

            </div>

          </section>

        </div>

      </div>

  );
}