const benefits = [
  {
    icon: "✓",
    title: "Personal capacitado",
    description:
      "Contamos con procesos de trabajo orientados a brindar una atención profesional y cuidadosa.",
  },
  {
    icon: "✦",
    title: "Productos especializados",
    description:
      "Utilizamos productos adecuados para diferentes tipos de superficies y necesidades de limpieza.",
  },
  {
    icon: "⌂",
    title: "Atención a domicilio",
    description:
      "Llevamos nuestros servicios hasta tu hogar, vehículo, oficina o espacio de trabajo.",
  },
  {
    icon: "★",
    title: "Resultados profesionales",
    description:
      "Buscamos devolver la frescura y apariencia de tus espacios mediante procesos especializados.",
  },
  {
    icon: "♡",
    title: "Atención personalizada",
    description:
      "Analizamos cada solicitud para ofrecer una solución acorde con las necesidades de cada cliente.",
  },
  {
    icon: "◆",
    title: "Cuidado de cada superficie",
    description:
      "Consideramos las características de cada material para realizar el proceso de limpieza adecuado.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="nosotros"
      className="overflow-hidden bg-slate-50 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* IMAGEN */}
          <div className="relative">

            {/* Decoraciones */}
            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-blue-200/50 blur-3xl" />

            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-cyan-200/50 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

              <img
                src="https://img.magnific.com/vector-gratis/servicio-limpieza-productos-limpieza_18591-52057.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Profesional realizando servicio de limpieza"
                className="h-[560px] w-full object-cover"
              />

              {/* TARJETA FLOTANTE */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/50 bg-white/90 p-5 shadow-xl backdrop-blur-md">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Compromiso con cada servicio
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      Limpieza profesional y atención personalizada
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* CONTENIDO */}
          <div>

            <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Nuestra diferencia
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              ¿Por qué{" "}
              <span className="text-blue-600">
                elegirnos?
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
              Cada servicio está pensado para ofrecer una experiencia
              profesional, práctica y adaptada a las necesidades de cada
              cliente.
            </p>

            {/* BENEFICIOS */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">

              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group"
                >
                  <div className="flex gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-bold text-blue-600 shadow-sm ring-1 ring-gray-100 transition group-hover:bg-blue-600 group-hover:text-white">
                      {benefit.icon}
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        {benefit.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {benefit.description}
                      </p>
                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* CTA */}
            <div className="mt-10">

              <a
                href="#cotizacion"
                className="inline-flex items-center rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Solicitar cotización
                <span className="ml-2">→</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}