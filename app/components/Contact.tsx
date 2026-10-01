export default function Contact() {
  return (
    <section
      id="contacto"
      className="bg-white px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ENCABEZADO */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Estamos para ayudarte
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Hablemos sobre tu{" "}
            <span className="text-blue-600">
              próximo servicio
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Estamos disponibles para resolver tus dudas, conocer tus
            necesidades y ayudarte a encontrar la solución de limpieza
            adecuada.
          </p>

        </div>

        {/* CONTENIDO */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">

          {/* WHATSAPP */}
          <a
            href="https://wa.me/573000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-gray-100 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-blue-100 hover:bg-blue-50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              💬
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              WhatsApp
            </h3>

            <p className="mt-2 leading-7 text-gray-600">
              Escríbenos directamente para consultar disponibilidad,
              servicios o solicitar información.
            </p>

            <span className="mt-5 inline-block font-bold text-blue-600">
              Escribir por WhatsApp →
            </span>
          </a>

          {/* TELÉFONO */}
          <a
            href="tel:+573000000000"
            className="group rounded-3xl border border-gray-100 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-blue-100 hover:bg-blue-50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              ☎
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Llámanos
            </h3>

            <p className="mt-2 leading-7 text-gray-600">
              Comunícate con nuestro equipo para recibir atención
              personalizada.
            </p>

            <span className="mt-5 inline-block font-bold text-blue-600">
              Llamar ahora →
            </span>
          </a>

          {/* UBICACIÓN */}
          <div className="rounded-3xl border border-gray-100 bg-slate-50 p-8">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600">
              📍
            </div>

            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Atención a domicilio
            </h3>

            <p className="mt-2 leading-7 text-gray-600">
              Llevamos nuestros servicios hasta hogares, vehículos,
              oficinas y diferentes espacios de trabajo.
            </p>

            <span className="mt-5 inline-block font-bold text-blue-600">
              Solicita información →
            </span>

          </div>

        </div>

        {/* CTA FINAL */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-blue-600 px-8 py-12 text-center shadow-xl shadow-blue-600/20">

          <h3 className="text-3xl font-bold text-white sm:text-4xl">
            ¿Necesitas una limpieza profesional?
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-blue-100">
            Cuéntanos qué necesitas y recibe información sobre el
            servicio adecuado para tu espacio.
          </p>

          <a
            href="#cotizacion"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-600 shadow-lg transition hover:bg-blue-50"
          >
            Solicitar cotización →
          </a>

        </div>

      </div>
    </section>
  );
}