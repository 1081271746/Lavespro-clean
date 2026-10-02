import Link from "next/link";
import QuoteForm from "@/app/components/QuoteForm";

const services: Record<string, string> = {
  "limpieza-colchones": "Limpieza de colchones",
  "lavado-peluches": "Lavado de peluches",
  "lavado-salas": "Lavado de salas",
  "tapiceria-vehiculos": "Tapicería de vehículos",
  "mobiliario-oficina": "Mobiliario de oficina",
  "lavado-tapetes": "Lavado de tapetes",
  "lavado-alfombras": "Lavado de alfombras",
};

export default async function SolicitarServicio({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const serviceName = services[slug];

  if (!serviceName) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Servicio no encontrado
          </h1>

          <p className="mt-4 text-gray-600">
            El servicio solicitado no existe.
          </p>

          <Link
            href="/#servicios"
            className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Volver a servicios
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-7xl">

        {/* VOLVER */}
        <Link
          href="/#servicios"
          className="text-sm font-semibold text-blue-600"
        >
          ← Volver a servicios
        </Link>

        {/* ENCABEZADO */}
        <div className="mt-10 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Solicitar servicio
          </span>

          <h1 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
            {serviceName}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Completa la información para solicitar nuestro servicio de{" "}
            {serviceName.toLowerCase()}.
          </p>
        </div>

        {/* FORMULARIO REUTILIZADO */}
        <div className="mt-12">
          <QuoteForm selectedService={serviceName} />
        </div>

      </div>
    </main>
  );
}