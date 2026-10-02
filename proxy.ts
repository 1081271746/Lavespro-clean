import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  // Si intenta entrar a cualquier ruta administrativa
  // sin estar autenticado, lo mandamos al login.
  if (isAdminRoute && !isLoginRoute && !token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  // Si ya está autenticado y entra nuevamente al login,
  // lo mandamos directamente al dashboard.
  if (isLoginRoute && token) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};