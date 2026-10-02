"use client";

import { FormEvent, useState } from "react";

const services = [
  "Limpieza de colchones",
  "Lavado de peluches",
  "Lavado de salas",
  "Tapicería de vehículos",
  "Mobiliario de oficina",
  "Lavado de tapetes",
  "Lavado de alfombras",
];

interface QuoteFormProps {
  selectedService?: string;
}

export default function QuoteForm({ selectedService }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="cotizacion"
      className="bg-white px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ENCABEZADO */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Solicita tu servicio
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Solicita tu{" "}
            <span className="text-blue-600">
              cotización
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Cuéntanos qué necesitas y nos pondremos en contacto contigo
            para conocer los detalles de tu servicio.
          </p>

        </div>

        {/* CONTENIDO */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

          {/* INFORMACIÓN */}
          <div className="rounded-3xl bg-slate-50 p-8 lg:p-10">

            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              ¿Cómo funciona?
            </span>

            <h3 className="mt-4 text-3xl font-bold text-gray-900">
              Cuéntanos qué necesitas
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              Completa el formulario con la información básica del servicio
              que deseas solicitar. Nuestro equipo revisará tu solicitud
              y se pondrá en contacto contigo.
            </p>

            {/* PASOS */}
            <div className="mt-8 space-y-6">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  1
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    Envía tu solicitud
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Indica el servicio que necesitas y proporciona tus datos.
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  2
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    Revisamos tu solicitud
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Analizamos la información proporcionada para conocer
                    mejor tus necesidades.
                  </p>
                </div>

              </div>

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  3
                </div>

                <div>
                  <h4 className="font-bold text-gray-900">
                    Nos ponemos en contacto
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Te contactamos para confirmar detalles y coordinar
                    el servicio.
                  </p>
                </div>

              </div>

            </div>

            {/* WHATSAPP */}
            <div className="mt-10 rounded-2xl border border-blue-100 bg-white p-5">

              <p className="text-sm font-semibold text-gray-900">
                ¿Prefieres contactarnos directamente?
              </p>

              <a
                href="https://wa.me/573164485328"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex font-bold text-blue-600 hover:text-blue-700"
              >
                Escríbenos por WhatsApp →
              </a>

            </div>

          </div>

          {/* FORMULARIO */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/40 lg:p-10">

            {submitted ? (

              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                  ✓
                </div>

                <h3 className="mt-6 text-3xl font-bold text-gray-900">
                  ¡Solicitud recibida!
                </h3>

                <p className="mt-3 max-w-md leading-7 text-gray-600">
                  Hemos recibido tu solicitud correctamente.
                  Nuestro equipo se pondrá en contacto contigo
                  para continuar con el proceso.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Enviar otra solicitud
                </button>

              </div>

            ) : (

              <form onSubmit={handleSubmit}>

                <div className="grid gap-6 sm:grid-cols-2">

                  {/* NOMBRE */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-900"
                    >
                      Nombre completo *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* TELEFONO */}
                  <div>
                    <label
  htmlFor="phone"
  className="text-sm font-semibold text-gray-900"
>
  Teléfono *
</label>


                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="3164485328"
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* CORREO */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-900"
                    >
                      Correo electrónico
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

  {/* SERVICIO */}
{selectedService ? (
  <div className="sm:col-span-2">
    <div className="rounded-2xl bg-blue-50 px-5 py-4">
      <p className="text-sm font-semibold text-blue-600">
        Servicio seleccionado
      </p>

      <p className="mt-1 text-lg font-bold text-gray-900">
        {selectedService}
      </p>
    </div>

    <input
      type="hidden"
      name="service"
      value={selectedService}
    />
  </div>
) : (
  <div>
    <label
      htmlFor="service"
      className="text-sm font-semibold text-gray-900"
    >
      Servicio *
    </label>

    <select
      id="service"
      name="service"
      required
      defaultValue=""
      className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
    >
      <option value="" disabled>
        Selecciona un servicio
      </option>

      {services.map((service) => (
        <option key={service} value={service}>
          {service}
        </option>
      ))}
    </select>
  </div>
)}
                  {/* DIRECCIÓN */}
                  <div className="sm:col-span-2">

                    <label
                      htmlFor="address"
                      className="text-sm font-semibold text-gray-900"
                    >
                      Dirección *
                    </label>

                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      placeholder="Dirección donde se realizará el servicio"
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* FECHA */}
                  <div>

                    <label
                      htmlFor="date"
                      className="text-sm font-semibold text-gray-900"
                    >
                      Fecha preferida
                    </label>

                    <input
  id="date"
  name="date"
  type="date"
  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
/>
                  </div>

                  {/* HORARIO */}
                  <div>

                    <label
                      htmlFor="time"
                      className="text-sm font-semibold text-gray-900"
                    >
                      Horario preferido
                    </label>

                    <select
                      id="time"
                      name="time"
                      defaultValue=""
                      className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="" disabled>
                        Selecciona un horario
                      </option>
                      <option value="morning">
                        Mañana
                      </option>
                      <option value="afternoon">
                        Tarde
                      </option>
                    </select>

                  </div>

                  {/* DESCRIPCIÓN */}
                  <div className="sm:col-span-2">

                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-gray-900"
                    >
                      Cuéntanos sobre el servicio
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Describe brevemente lo que necesitas..."
                      className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* FOTOS */}
                  <div className="sm:col-span-2">

                    <label
                      htmlFor="photos"
                      className="text-sm font-semibold text-gray-900"
                    >
                      Fotografías del servicio
                    </label>

                    <div className="mt-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center transition hover:border-blue-300">

                      <input
                        id="photos"
                        name="photos"
                        type="file"
                        accept="image/*"
                        multiple
                        className="mx-auto block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-600 hover:file:bg-blue-100"
                      />

                      <p className="mt-2 text-xs text-gray-500">
                        Puedes adjuntar fotografías para ayudarnos a
                        conocer mejor el trabajo.
                      </p>

                    </div>

                  </div>

                </div>

                {/* BOTÓN */}
                <button
                  type="submit"
                  className="mt-8 w-full rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Solicitar cotización →
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-gray-500">
                  Al enviar esta solicitud aceptas que la empresa pueda
                  contactarte para gestionar tu solicitud de servicio.
                </p>

              </form>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}