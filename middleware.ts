import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/sign-in"]

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isPublicPath = PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))
  const isAuthApiPath = pathname.startsWith("/api/auth/")

  const session = request.cookies.get("session")?.value
  const hasSession = Boolean(session)

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