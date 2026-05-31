import { NextResponse } from "next/server"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const idToken = body?.idToken

  if (!idToken) {
    return NextResponse.json({ message: "Missing token." }, { status: 400 })
  }

  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000 // 5 days
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn })

    const response = NextResponse.json({ ok: true })
    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: expiresIn / 1000,
    })
    return response
  } catch {
    return NextResponse.json({ message: "Invalid token." }, { status: 401 })
  }
}