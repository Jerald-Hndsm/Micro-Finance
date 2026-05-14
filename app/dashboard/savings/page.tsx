"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const clientSavings = [
  {
    id: 1,
    clientName: "Amina Mohamed",
    accountName: "Personal Savings",
    balance: "$2,500",
    rate: "4.5%",
    lastUpdate: "2024-01-15",
  },
  {
    id: 2,
    clientName: "James Kipchoge",
    accountName: "Business Fund",
    balance: "$8,750",
    rate: "3.8%",
    lastUpdate: "2024-01-15",
  },
  {
    id: 3,
    clientName: "Maria Santos",
    accountName: "Group Savings",
    balance: "$15,300",
    rate: "4.2%",
    lastUpdate: "2024-01-15",
  },
  {
    id: 4,
    clientName: "Kwame Asante",
    accountName: "Emergency Fund",
    balance: "$3,200",
    rate: "4.0%",
    lastUpdate: "2024-01-14",
  },
]

const ITEMS_PER_PAGE = 20

export default function SavingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredClients = useMemo(
    () =>
      clientSavings.filter((account) =>
        account.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  )

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedClients = filteredClients.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Client Savings</h1>
          <p className="text-foreground/60 mt-1">Monitor and manage all client savings accounts</p>
        </div>
        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">Add Savings Account</Button>
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Total Deposits Under Management</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-3xl font-bold text-primary">$29,750</p>
          <p className="text-xs text-foreground/60 mt-2">Across 410 active client accounts</p>
        </CardContent>
      </Card>

      <Input
        placeholder="Search for a client..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setCurrentPage(1)
        }}
        className="bg-card border-border"
      />

      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-foreground">Client Name</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Account</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Balance</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Rate</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Last Updated</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClients.map((account) => (
                <tr key={account.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 text-foreground">{account.clientName}</td>
                  <td className="px-4 py-2.5 text-foreground/70 text-xs">{account.accountName}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-foreground">{account.balance}</td>
                  <td className="px-4 py-2.5 text-right text-primary font-semibold">{account.rate}</td>
                  <td className="px-4 py-2.5 text-center text-foreground/60 text-xs">{account.lastUpdate}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedClients.length === 0 && (
          <div className="p-8 text-center text-foreground/60">
            <p>No clients found matching your search.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-sm text-foreground/60">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredClients.length)} of {filteredClients.length}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-transparent"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1 overflow-x-auto">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={currentPage === pageNum ? "bg-primary text-primary-foreground" : "bg-transparent"}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              {totalPages > 5 && <span className="px-2 text-foreground/60">...</span>}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-transparent"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
