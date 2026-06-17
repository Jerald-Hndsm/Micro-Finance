"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const loanApplications = [
  {
    id: 1,
    clientName: "Amina Mohamed",
    loanType: "Business Loan",
    amount: "$15,000",
    status: "Approved",
    rate: "8.5%",
    term: "24 months",
    appliedDate: "2024-01-10",
  },
  {
    id: 2,
    clientName: "James Kipchoge",
    loanType: "Agricultural Loan",
    amount: "$8,000",
    status: "Pending",
    rate: "6.2%",
    term: "36 months",
    appliedDate: "2024-01-14",
  },
  {
    id: 3,
    clientName: "Maria Santos",
    loanType: "Trade Loan",
    amount: "$25,000",
    status: "Approved",
    rate: "7.8%",
    term: "18 months",
    appliedDate: "2024-01-05",
  },
  {
    id: 4,
    clientName: "Kwame Asante",
    loanType: "Personal Loan",
    amount: "$5,000",
    status: "Rejected",
    rate: "9.1%",
    term: "12 months",
    appliedDate: "2024-01-12",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800"
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    case "Rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function LoanApplicationsPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Loan Applications</h1>
          <p className="text-foreground/60 mt-1">Review and process client loan requests</p>
        </div>
        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">New Application</Button>
      </div>

      <div className="space-y-4">
        {loanApplications.map((loan) => (
          <Card key={loan.id} className="bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{loan.clientName}</h3>
                  <p className="text-sm text-foreground/60">
                    {loan.loanType} - Applied: {loan.appliedDate}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(loan.status)}`}>
                  {loan.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide">Amount</p>
                  <p className="text-lg font-bold text-foreground mt-1">{loan.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide">Interest Rate</p>
                  <p className="text-lg font-bold text-primary mt-1">{loan.rate}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/60 uppercase tracking-wide">Term</p>
                  <p className="text-lg font-bold text-foreground mt-1">{loan.term}</p>
                </div>
                <div className="flex items-end gap-2 sm:col-span-2 xl:col-span-1">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                  {loan.status === "Pending" ? (
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      Review
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
