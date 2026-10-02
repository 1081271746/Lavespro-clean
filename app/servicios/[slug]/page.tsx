import Link from "next/link";

type Service = {
  title: string;
  description: string;
  shortDescription: string;
  benefits: string[];
  process: string[];
};

const services: Record<string, Service> = {
  "limpieza-colchones": {
    title: "Limpieza profesional de colchones",
    description:
      "Realizamos procesos de limpieza profunda para ayudar a recuperar la frescura, apariencia y limpieza de tus colchones.",
    shortDescription:
      "Limpieza especializada para eliminar suciedad, manchas y malos olores.",
    benefits: [
      "Limpieza profunda de la superficie",
      "Tratamiento de manchas",
      "Ayuda a eliminar malos olores",
      "Atención directamente en tu domicilio",
    ],
    process: [
      "Evaluamos el estado del colchón.",
      "Aplicamos el proceso de limpieza adecuado.",
      "Realizamos la limpieza y extracción.",
      "Revisamos el resultado final.",
    ],
  },

  "lavado-peluches": {
    title: "Lavado profesional de peluches",
    description:
      "Realizamos una limpieza cuidadosa de peluches, buscando conservar sus materiales y recuperar su frescura.",
    shortDescription:
      "Limpieza cuidadosa para mantener tus peluches limpios y en buenas condiciones.",
    benefits: [
      "Limpieza cuidadosa",
      "Tratamiento según el material",
      "Ayuda a eliminar suciedad y olores",
      "Proceso orientado al cuidado del peluche",
    ],
    process: [
      "Revisamos el estado y material del peluche.",
      "Seleccionamos el proceso de limpieza.",
      "Realizamos el lavado correspondiente.",
      "Verificamos el resultado antes de entregarlo.",
    ],
  },

  "lavado-salas": {
    title: "Lavado profesional de salas",
    description:
      "Recuperamos la frescura y apariencia de tus muebles mediante procesos profesionales de limpieza y lavado.",
    shortDescription:
      "Limpieza especializada para salas y muebles tapizados.",
    benefits: [
      "Limpieza profunda de tapicería",
      "Tratamiento de manchas",
      "Ayuda a eliminar malos olores",
      "Atención a domicilio",
    ],
    process: [
      "Evaluamos el tipo de tapicería.",
      "Identificamos las condiciones del mueble.",
      "Aplicamos el proceso de limpieza adecuado.",
      "Revisamos el resultado final.",
    ],
  },

  "tapiceria-vehiculos": {
    title: "Limpieza de tapicería de vehículos",
    description:
      "Realizamos limpieza especializada para diferentes superficies interiores de vehículos.",
    shortDescription:
      "Limpieza profesional para recuperar la apariencia y frescura del interior de tu vehículo.",
    benefits: [
      "Limpieza de asientos",
      "Limpieza de superficies interiores",
      "Tratamiento de suciedad y manchas",
      "Proceso especializado para vehículos",
    ],
    process: [
      "Revisamos el estado del interior.",
      "Identificamos los materiales y superficies.",
      "Aplicamos el proceso de limpieza correspondiente.",
      "Realizamos una revisión final.",
    ],
  },

  "mobiliario-oficina": {
    title: "Limpieza de mobiliario de oficina",
    description:
      "Ofrecemos limpieza profesional para sillas, muebles y diferentes elementos utilizados en espacios empresariales.",
    shortDescription:
      "Mantén tus espacios de trabajo limpios y presentables.",
    benefits: [
      "Limpieza de sillas y muebles",
      "Atención para espacios empresariales",
      "Procesos adaptados a diferentes superficies",
      "Atención profesional",
    ],
    process: [
      "Evaluamos el mobiliario.",
      "Identificamos los materiales.",
      "Aplicamos el proceso adecuado.",
      "Verificamos el resultado.",
    ],
  },

  "lavado-tapetes": {
    title: "Lavado profesional de tapetes",
    description:
      "Realizamos procesos de limpieza para ayudar a recuperar la apariencia y frescura de tus tapetes.",
    shortDescription:
      "Limpieza profunda para tratar suciedad, manchas y olores.",
    benefits: [
      "Limpieza profunda",
      "Tratamiento de manchas",
      "Ayuda a eliminar olores",
      "Cuidado según el tipo de material",
    ],
    process: [
      "Evaluamos el tapete.",
      "Identificamos sus características.",
      "Aplicamos el proceso de limpieza.",
      "Revisamos el resultado final.",
    ],
  },

  "lavado-alfombras": {
    title: "Lavado profesional de alfombras",
    description:
      "Realizamos limpieza especializada de alfombras utilizando procesos adecuados para sus diferentes materiales y condiciones.",
    shortDescription:
      "Limpieza profesional para conservar tus alfombras en mejores condiciones.",
    benefits: [
      "Limpieza profunda",
      "Tratamiento de suciedad y manchas",
      "Ayuda a eliminar malos olores",
      "Cuidado de diferentes superficies",
    ],
    process: [
      "Evaluamos el estado de la alfombra.",
      "Identificamos el material.",
      "Seleccionamos el proceso adecuado.",
      "Realizamos una revisión final.",
    ],
  },
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = services[slug];

  if (!service) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            !
          </div>

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Servicio no encontrado
          </h1>

          <p className="mt-4 text-gray-600">
            El servicio que buscas no está disponible actualmente.
          </p>

          <Link
            href="/#servicios"
            className="mt-8 inline-flex rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Ver nuestros servicios →
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* HERO DEL SERVICIO */}
      <section className="bg-slate-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/#servicios"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Volver a servicios
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">

            {/* INFORMACIÓN */}
            <div>

              <div className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                Servicio CleanPro
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {service.title}
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                {service.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  href={`/solicitar/${slug}`}
                  className="rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                >
                  Solicitar este servicio →
                </Link>

                <Link
                  href="/#contacto"
                  className="rounded-full border border-gray-200 bg-white px-7 py-4 text-sm font-bold text-gray-900 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  Contactarnos
                </Link>

              </div>

            </div>

            {/* IMAGEN PROVISIONAL */}
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 p-1 shadow-2xl shadow-blue-200">

              <div className="flex min-h-[380px] items-center justify-center rounded-[1.8rem] bg-white">

                <div className="text-center">

                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-100 text-4xl text-blue-600">
                    ✦
                  </div>

                  <p className="mt-6 text-xl font-bold text-gray-900">
                    {service.title}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Imagen del servicio
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">

            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              ¿Qué ofrecemos?
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Un servicio pensado para tus necesidades
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              {service.shortDescription}
            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {service.benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="rounded-2xl border border-gray-100 bg-slate-50 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                  {index + 1}
                </div>

                <h3 className="mt-5 font-bold text-gray-900">
                  {benefit}
                </h3>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* PROCESO */}
      <section className="bg-slate-50 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Nuestro proceso
            </span>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Así trabajamos
            </h2>

          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-4">

            {service.process.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {index + 1}
                </div>

                <p className="mt-5 leading-7 text-gray-600">
                  {step}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-600 px-8 py-12 text-center shadow-xl shadow-blue-600/20">

          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            ¿Necesitas este servicio?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Solicita información y cuéntanos qué necesitas.
            Nuestro equipo podrá revisar tu solicitud y ponerse
            en contacto contigo.
          </p>

          <Link
            href={`/solicitar/${slug}`}
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-600 transition hover:bg-blue-50"
          >
            Solicitar este servicio →
          </Link>

        </div>
      </section>

    </main>
  );
}