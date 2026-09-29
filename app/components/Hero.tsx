export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-slate-50 pt-32"
    >
      <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">

        {/* CONTENIDO */}
        <div className="relative z-10">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Limpieza profesional a domicilio
          </div>

          <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Devolvemos la{" "}
            <span className="text-blue-600">limpieza y frescura</span>{" "}
            a tus espacios.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
            Servicios profesionales de limpieza para hogares, vehículos y
            empresas, con atención personalizada y resultados visibles.
          </p>

          {/* BOTONES */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cotizacion"
              className="rounded-full bg-blue-600 px-7 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Solicitar cotización →
            </a>

            <a
              href="#servicios"
              className="rounded-full border border-gray-200 bg-white px-7 py-4 text-center text-sm font-bold text-gray-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              Ver nuestros servicios
            </a>
          </div>

          {/* BENEFICIOS RÁPIDOS */}
          <div className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-gray-200 pt-8 sm:grid-cols-4">

            <div>
              <p className="text-xl font-bold text-gray-900">✓</p>
              <p className="mt-1 text-xs font-medium text-gray-500">
                Servicio profesional
              </p>
            </div>

            <div>
              <p className="text-xl font-bold text-gray-900">⌂</p>
              <p className="mt-1 text-xs font-medium text-gray-500">
                Atención a domicilio
              </p>
            </div>

            <div>
              <p className="text-xl font-bold text-gray-900">✦</p>
              <p className="mt-1 text-xs font-medium text-gray-500">
                Equipos especializados
              </p>
            </div>

            <div>
              <p className="text-xl font-bold text-gray-900">★</p>
              <p className="mt-1 text-xs font-medium text-gray-500">
                Resultados visibles
              </p>
            </div>

          </div>
        </div>

        {/* IMAGEN / ÁREA VISUAL */}
        <div className="relative">

          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl"></div>

          <div className="relative overflow-hidden rounded-[2rem] bg-blue-100 shadow-2xl">

            <img
              src="https://scontent-bog2-1.xx.fbcdn.net/v/t39.30808-6/433610755_950206150149664_6695806533233957748_n.jpg?stp=dst-jpg_tt6&cstp=mx500x500&ctp=s500x500&_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=icXIQNeNAdQQ7kNvwFqlG0w&_nc_oc=Adr-iujAhuSF-kllHykGdYjHX3iEifYG78uuAGivL_WAWzfDwPiC4xT5AgStAKbpkO0&_nc_zt=23&_nc_ht=scontent-bog2-1.xx&_nc_gid=GrvqVb-rkrknR8GfWilSyg&_nc_ss=7b289&oh=00_AQNk_qrlCI01dTb6PYjH2lOVIx8jCoEcGh1FBFt2U5Xo-g&oe=6AC1EDC3"
              alt="Servicio profesional de limpieza"
              className="h-[560px] w-full object-cover"
            />

            {/* TARJETA FLOTANTE */}
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/90 p-5 shadow-xl backdrop-blur-md">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Atención profesional
                  </p>

                  <p className="mt-1 text-lg font-bold text-gray-900">
                    Tu espacio, como nuevo
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white">
                  ✓
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}