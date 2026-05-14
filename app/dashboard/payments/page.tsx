"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const paymentHistory = [
  {
    id: 1,
    clientName: "Amina Mohamed",
    type: "Loan EMI",
    amount: "$450",
    date: "2024-01-15",
    status: "Completed",
    reference: "LN001-EMI",
  },
  {
    id: 2,
    clientName: "James Kipchoge",
    type: "Savings Deposit",
    amount: "$500",
    date: "2024-01-14",
    status: "Completed",
    reference: "SV002-DEP",
  },
  {
    id: 3,
    clientName: "Maria Santos",
    type: "Loan Repayment",
    amount: "$1,200",
    date: "2024-01-13",
    status: "Pending",
    reference: "LN003-REP",
  },
  {
    id: 4,
    clientName: "Kwame Asante",
    type: "Insurance Premium",
    amount: "$75",
    date: "2024-01-10",
    status: "Completed",
    reference: "INS001-PRE",
  },
  {
    id: 5,
    clientName: "Fatima Hassan",
    type: "Loan EMI",
    amount: "$350",
    date: "2024-01-09",
    status: "Completed",
    reference: "LN004-EMI",
  },
]

export default function PaymentsPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Payments & Collections</h1>
          <p className="text-foreground/60 mt-1">Track and record all client payments</p>
        </div>
        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">Record Payment</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">Total Collected (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">$3,575</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">Pending Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">$1,200</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-sm">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">94.8%</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
        {paymentHistory.map((payment) => (
          <Card key={payment.id} className="bg-card border-border hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{payment.clientName}</p>
                  <p className="text-sm text-foreground/60">
                    {payment.type} - {payment.reference}
                  </p>
                </div>
                <div className="sm:text-right sm:mr-4">
                  <p className="font-bold text-lg text-foreground">{payment.amount}</p>
                  <p className="text-xs text-foreground/60">{payment.date}</p>
                </div>
                <span
                  className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-medium ${
                    payment.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
