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

const serviceIds: Record<string, number> = {
  "Limpieza de colchones": 1,
  "Lavado de peluches": 2,
  "Lavado de salas": 3,
  "Tapicería de vehículos": 4,
  "Mobiliario de oficina": 5,
  "Lavado de tapetes": 6,
  "Lavado de alfombras": 7,
};

interface QuoteFormProps {
  selectedService?: string;
}

export default function QuoteForm({ selectedService }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

const handleSubmit = async (
  event: FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  setError("");
  setLoading(true);

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const serviceName = String(
    formData.get("service") || ""
  );
  const address = String(
    formData.get("address") || ""
  ).trim();
  const date = String(formData.get("date") || "");
  const time = String(formData.get("time") || "");
  const message = String(
    formData.get("message") || ""
  ).trim();

  const serviceId = serviceIds[serviceName];

  if (!serviceId) {
    setError("Selecciona un servicio válido.");
    setLoading(false);
    return;
  }

  if (!name || !phone || !email || !address) {
    setError(
      "Completa todos los campos obligatorios."
    );
    setLoading(false);
    return;
  }

  let requestedDate: string | null = null;

  if (date) {
    const selectedTime =
      time === "afternoon"
        ? "14:00"
        : "09:00";

    requestedDate = new Date(
      `${date}T${selectedTime}:00`
    ).toISOString();
  }

  try {
    // 1. Crear la solicitud
    const response = await fetch(
      "http://127.0.0.1:8000/service-requests/public",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          service_id: serviceId,
          requested_date: requestedDate,
          address,
          city: "Pasto",
          notes: message || null,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail ||
          "No fue posible enviar la solicitud."
      );
    }

    // 2. Obtener el ID de la solicitud creada
    const requestId = data.id;

    // 3. Buscar las fotografías seleccionadas
    const photosInput = form.querySelector(
      'input[name="photos"]'
    ) as HTMLInputElement | null;

    const photos = photosInput?.files;

    // 4. Subir las fotografías
    if (photos && photos.length > 0) {
      const photosFormData = new FormData();

      Array.from(photos).forEach((photo) => {
        photosFormData.append("files", photo);
      });

      const photosResponse = await fetch(
        `http://127.0.0.1:8000/service-requests/${requestId}/photos`,
        {
          method: "POST",
          body: photosFormData,
        }
      );

      const photosData = await photosResponse.json();

      if (!photosResponse.ok) {
        throw new Error(
          photosData.detail ||
            "La solicitud se creó, pero no fue posible subir las fotografías."
        );
      }
    }

    // 5. Mostrar confirmación
    setSubmitted(true);

    form.reset();

  } catch (error) {
    console.error(error);

    setError(
      error instanceof Error
        ? error.message
        : "No fue posible enviar la solicitud."
    );

  } finally {
    setLoading(false);
  }
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

  {error && (
    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error}
    </div>
  )}

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
                      required
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
  disabled={loading}
  className="mt-8 w-full rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading
    ? "Enviando solicitud..."
    : "Solicitar cotización →"}
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