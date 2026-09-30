export default function About() {
  return (
    <section
      id="empresa"
      className="bg-white px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* IMAGEN */}
          <div className="relative">

            <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-blue-200/50 blur-3xl" />

            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-cyan-200/50 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=85"
                alt="Equipo profesional de limpieza"
                className="h-[560px] w-full object-cover"
              />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/90 p-5 shadow-xl backdrop-blur-md">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                    ✓
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                      Nuestro compromiso
                    </p>

                    <p className="mt-1 font-bold text-gray-900">
                      Calidad, confianza y atención personalizada
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* INFORMACIÓN */}
          <div>

            <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Conócenos
            </div>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Más que limpieza,{" "}
              <span className="text-blue-600">
                cuidamos tus espacios
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Somos una empresa dedicada a brindar servicios profesionales
              de limpieza para hogares, vehículos y empresas, buscando
              ofrecer soluciones prácticas y resultados visibles.
            </p>

            <p className="mt-5 text-base leading-7 text-gray-600">
              Nuestro objetivo es facilitar el cuidado de diferentes
              espacios mediante procesos de limpieza adecuados para cada
              tipo de superficie, acompañando al cliente desde la solicitud
              hasta la realización del servicio.
            </p>

            {/* VALORES */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">

              <div className="rounded-2xl border border-gray-100 bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                  ✓
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  Calidad
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Buscamos mantener altos estándares en cada servicio
                  realizado.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                  ♡
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  Confianza
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Construimos relaciones duraderas mediante una atención
                  responsable y cercana.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                  ★
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  Compromiso
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Nos enfocamos en comprender las necesidades de cada
                  cliente.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-slate-50 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                  ✦
                </div>

                <h3 className="mt-4 font-bold text-gray-900">
                  Profesionalismo
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Trabajamos con procesos orientados a ofrecer una
                  experiencia profesional.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}