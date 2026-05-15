"use client"

import { FormEvent, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Background from "@/assets/images/Barakah.jpg"
import AnimatedButton from "@/components/ui/animated-button"

import userIcon from "@/assets/svg/username.svg"
import lockIcon from "@/assets/svg/password.svg"

interface FloatingInputProps {
  id: string
  type: string
  label: string
  value: string
  onChange: (value: string) => void
  autoComplete: string
  icon: React.ReactNode
}

function FloatingInput({ id, type, label, value, onChange, autoComplete, icon }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const isFloated = isFocused || value.length > 0

  return (
    <div className="relative w-full">
      {/* Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
        {icon}
      </div>

      {/* Floating Label */}
      <label
        htmlFor={id}
        className={`absolute left-9 transition-all duration-200 pointer-events-none z-10 ${isFloated
          ? "top-1.5 text-[10px] text-primary"
          : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
          }`}
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
        className="w-full rounded-md border border-border bg-background pl-9 pr-3 pt-5 pb-1.5 text-sm outline-none ring-0 focus:border-primary-foreground"
      />
    </div>
  )
}

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { message?: string } | null
        setErrorMessage(payload?.message ?? "Sign in failed. Please try again.")
        return
      }

      const nextPath = searchParams.get("next") || "/"
      router.replace(nextPath)
      router.refresh()
    } catch {
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-6">
      {/* Background Image */}
      <Image
        src={Background}
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay (optional, helps card stand out) */}
      <div className="absolute inset-0 bg-primary-foreground/40" />

      <section className="relative z-10 w-full max-w-md rounded-2xl bg-card border shadow-card p-8 space-y-6">
        <header className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-primary">SIGN IN</h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            icon={<Image src={userIcon} alt="User icon" width={12} height={12} />}
          />

          <FloatingInput
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
            icon={<Image src={lockIcon} alt="Lock icon" width={15} height={15} />}
          />

          {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

          <AnimatedButton
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </AnimatedButton>
        </form>
      </section>
    </main>
  )
}