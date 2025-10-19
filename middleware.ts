import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
// export { auth as middleware } from "@/auth";

const ProtectedRoute = ["/planner"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLogin = !!session?.user;
  const { pathname } = request.nextUrl;

  // Belum login mau akses planner, harus ke halaman login
  if (!isLogin && ProtectedRoute.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Sudah login, gak boleh ke halaman login lagi
  if (isLogin && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/planner", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
