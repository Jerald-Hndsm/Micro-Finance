"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { LayoutDashboard, PiggyBank, FileText, CreditCard, Menu, X, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Savings", href: "/savings", icon: PiggyBank },
  { name: "Loan Applications", href: "/loan-applications", icon: FileText },
  { name: "Payments", href: "/payments", icon: CreditCard },
]

export default function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    setIsOpen(false)
    router.replace("/sign-in")
    router.refresh()
  }

  const drawer = (
    <div
      style={{ position: "fixed", inset: 0, top: 57, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={() => setIsOpen(false)}
    >
      <nav
        style={{
          height: "100%",
          width: "84%",
          maxWidth: "320px",
          backgroundColor: "#ffffff",
          padding: "16px",
          boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </nav>
    </div>
  )

  return (
    <>
      {/* Sticky top bar */}
      <div className="md:hidden sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-foreground">MicroBank</p>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/90 text-foreground"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Portaled directly into document.body — escapes ALL stacking contexts */}
      {mounted && isOpen && createPortal(drawer, document.body)}
    </>
  )
}