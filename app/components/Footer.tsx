import Link from "next/link";

export default function Footer() {


  return (
    <footer className="bg-gray-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* MARCA */}
          <div className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold">
                ✦
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  CleanPro
                </h2>

                <p className="text-xs font-semibold tracking-[0.25em] text-blue-400">
                  LIMPIEZA PROFESIONAL
                </p>
              </div>

            </div>

            <p className="mt-6 max-w-md leading-7 text-gray-400">
              Servicios profesionales de limpieza para hogares, vehículos
              y empresas, con atención personalizada y soluciones
              adaptadas a cada necesidad.
            </p>

            <a
              href="#cotizacion"
              className="mt-6 inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Solicitar cotización →
            </a>

          </div>

          {/* NAVEGACIÓN */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Navegación
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">

              <li>
                <a
                  href="#inicio"
                  className="transition hover:text-white"
                >
                  Inicio
                </a>
              </li>

              <li>
                <a
                  href="#servicios"
                  className="transition hover:text-white"
                >
                  Servicios
                </a>
              </li>

              <li>
                <a
                  href="#nosotros"
                  className="transition hover:text-white"
                >
                  Nosotros
                </a>
              </li>

              <li>
                <a
                  href="#trabajos"
                  className="transition hover:text-white"
                >
                  Trabajos
                </a>
              </li>

              <li>
                <a
                  href="#contacto"
                  className="transition hover:text-white"
                >
                  Contacto
                </a>
              </li>

            </ul>

          </div>

          {/* SERVICIOS */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Servicios
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-400">

              <li>Limpieza de colchones</li>
              <li>Lavado de salas</li>
              <li>Tapicería de vehículos</li>
              <li>Lavado de peluches</li>
              <li>Mobiliario de oficina</li>
              <li>Tapetes y alfombras</li>

            </ul>

          </div>

        </div>

        {/* SEPARADOR */}
        <div className="mt-14 border-t border-gray-800 pt-8">

          <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

            <p>
              © {new Date().getFullYear()} CleanPro. Todos los derechos reservados.
            </p>

            <div className="flex flex-wrap gap-6">

  <a
    href="#contacto"
    className="transition hover:text-white"
  >
    Contacto
  </a>

  <a
    href="#cotizacion"
    className="transition hover:text-white"
  >
    Solicitar cotización
  </a>

  <Link
    href="/admin/login"
    className="transition hover:text-blue-400"
  >
    🔐 Acceso administrativo
  </Link>

</div>

          </div>

        </div>

      </div>

    </footer>
  );
}