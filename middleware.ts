import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AUTH_COOKIE_NAME } from "@/lib/auth"

const PUBLIC_PATHS = ["/sign-in"]

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
  const isAuthApiPath = pathname.startsWith("/api/auth/")
  const hasSession = Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value)

  if (!hasSession && !isPublicPath && !isAuthApiPath) {
    const signInUrl = request.nextUrl.clone()
    signInUrl.pathname = "/sign-in"
    signInUrl.search = `?next=${encodeURIComponent(pathname + search)}`
    return NextResponse.redirect(signInUrl)
  }

  if (hasSession && pathname === "/sign-in") {
    const homeUrl = request.nextUrl.clone()
    homeUrl.pathname = "/"
    homeUrl.search = ""
    return NextResponse.redirect(homeUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
