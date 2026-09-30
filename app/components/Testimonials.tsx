const testimonials = [
  {
    name: "Cliente satisfecho",
    service: "Limpieza de colchón",
    text: "Excelente atención y muy buen resultado. El colchón quedó mucho más limpio y con una apariencia renovada.",
  },
  {
    name: "Cliente satisfecho",
    service: "Lavado de sala",
    text: "El servicio fue muy profesional. La atención fue excelente y el resultado superó nuestras expectativas.",
  },
  {
    name: "Cliente satisfecho",
    service: "Tapicería de vehículo",
    text: "Muy buen trabajo y excelente atención. El interior del vehículo quedó mucho más limpio y agradable.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="bg-slate-50 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ENCABEZADO */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Opiniones de clientes
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Lo que dicen{" "}
            <span className="text-blue-600">
              nuestros clientes
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            La experiencia de nuestros clientes es una parte importante
            de nuestro compromiso con cada servicio.
          </p>

        </div>

        {/* TESTIMONIOS */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">

          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name + testimonial.service}
              className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* ESTRELLAS */}
              <div className="flex gap-1 text-lg text-blue-600">
                ★ ★ ★ ★ ★
              </div>

              {/* TEXTO */}
              <p className="mt-6 text-base leading-7 text-gray-600">
                “{testimonial.text}”
              </p>

              {/* CLIENTE */}
              <div className="mt-7 flex items-center gap-4 border-t border-gray-100 pt-5">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <p className="font-bold text-gray-900">
                    {testimonial.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {testimonial.service}
                  </p>
                </div>

              </div>

            </article>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-12 text-center">

          <p className="text-gray-600">
            ¿Quieres vivir una experiencia similar?
          </p>

          <a
            href="#cotizacion"
            className="mt-4 inline-flex rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Solicitar cotización →
          </a>

        </div>

      </div>
    </section>
  );
}