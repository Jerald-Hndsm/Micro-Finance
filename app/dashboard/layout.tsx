import type React from "react"
import Sidebar from "@/components/sidebar"
import MobileNav from "@/components/mobile-nav"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen md:h-screen md:flex">
      <aside className="hidden md:block md:shrink-0">
        <Sidebar />
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileNav />
        <main className="flex-1">
          <div className="overflow-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}