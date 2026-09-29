const beforeImage =
  "https://scontent-bog2-2.xx.fbcdn.net/v/t39.30808-6/552928176_1337481768088765_6829416233514150710_n.jpg?stp=dst-jpg_tt6&cstp=mx720x340&ctp=s720x340&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=29xbSUhSl5UQ7kNvwEC39RG&_nc_oc=AdqstGzIll6ec5924WKHxciSInO2ffqOZc-eVjg5hp9IhsOHdZ0-zSc37MWJdgI9wcs&_nc_zt=23&_nc_ht=scontent-bog2-2.xx&_nc_gid=RJE1GeZfijxjb4cJhDw_dQ&_nc_ss=7b289&oh=00_AQN13YexJqzRo6qDHRwDtO1b5_gf9PhIhzLe4MFURgcMfw&oe=6AC1EAEC";

const afterImage =
  "https://scontent-bog2-2.xx.fbcdn.net/v/t39.30808-6/552073504_1337481834755425_8702978344296572059_n.jpg?stp=dst-jpg_tt6&cstp=mx387x375&ctp=s387x375&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=GnmOrxn1BikQ7kNvwGunW1X&_nc_oc=AdqJNG0bprm86Po4HUwwj59RLg3IxhBr7AwZV3N_CnDsAyYMotBCccZRnTh-AuKUVhM&_nc_zt=23&_nc_ht=scontent-bog2-2.xx&_nc_gid=RHPqOZ_ryy1A-4tJyM-2Ew&_nc_ss=7b289&oh=00_AQN1FZKRVedD6h6utkLU76uqFNNyuhD5jB7Dq5NvSZEEHw&oe=6AC1D1A7";

export default function BeforeAfter() {
  return (
    <section
      id="trabajos"
      className="bg-white px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* ENCABEZADO */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Resultados reales
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Resultados que{" "}
            <span className="text-blue-600">
              hablan por nosotros
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Conoce algunos de nuestros resultados y comprueba la diferencia
            que puede hacer una limpieza profesional.
          </p>

        </div>

        {/* COMPARACIÓN */}
        <div className="mt-16 overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl">

          <div className="grid md:grid-cols-2">

            {/* ANTES */}
            <div className="relative">

              <img
                src={beforeImage}
                alt="Antes del proceso de limpieza"
                className="h-[420px] w-full object-cover"
              />

              <div className="absolute left-5 top-5 rounded-full bg-gray-900/90 px-5 py-2 text-sm font-bold text-white backdrop-blur">
                ANTES
              </div>

            </div>

            {/* DESPUÉS */}
            <div className="relative">

              <img
                src={afterImage}
                alt="Después del proceso de limpieza"
                className="h-[420px] w-full object-cover"
              />

              <div className="absolute left-5 top-5 rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-lg">
                DESPUÉS
              </div>

            </div>

          </div>

          {/* INFORMACIÓN */}
          <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between lg:p-10">

            <div>

              <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                Trabajo realizado
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                Limpieza profesional
              </h3>

              <p className="mt-2 max-w-2xl text-gray-600">
                Aplicamos procesos especializados para recuperar la limpieza,
                frescura y apariencia de diferentes superficies.
              </p>

            </div>

            <a
              href="#cotizacion"
              className="shrink-0 rounded-full bg-blue-600 px-7 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              Quiero este resultado →
            </a>

          </div>

        </div>

        {/* INDICADORES */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-100 bg-slate-50 p-6 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
              ✓
            </div>

            <h3 className="mt-4 font-bold text-gray-900">
              Limpieza profunda
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Procesos diseñados para una limpieza más completa.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-slate-50 p-6 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
              ✦
            </div>

            <h3 className="mt-4 font-bold text-gray-900">
              Atención profesional
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Cada servicio se adapta a las necesidades del cliente.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-slate-50 p-6 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
              ★
            </div>

            <h3 className="mt-4 font-bold text-gray-900">
              Resultados visibles
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Una diferencia que puedes apreciar desde el primer vistazo.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}