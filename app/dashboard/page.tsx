"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const dashboardData = [
  { month: "Jan", activeClients: 45, totalDeposits: 125000, totalLoans: 250000 },
  { month: "Feb", activeClients: 52, totalDeposits: 135000, totalLoans: 280000 },
  { month: "Mar", activeClients: 58, totalDeposits: 148000, totalLoans: 310000 },
  { month: "Apr", activeClients: 63, totalDeposits: 162000, totalLoans: 340000 },
  { month: "May", activeClients: 71, totalDeposits: 178000, totalLoans: 380000 },
  { month: "Jun", activeClients: 85, totalDeposits: 195000, totalLoans: 420000 },
]

const stats = [
  { label: "Total Clients", value: "85", change: "+12 this month" },
  { label: "Total Deposits", value: "$195K", change: "+8.5%" },
  { label: "Active Loans", value: "67", change: "+5 new loans" },
  { label: "Portfolio Value", value: "$615K", change: "+10.3%" },
]

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Client Dashboard</h1>
        <p className="text-foreground/60 mt-1">Monitor all clients and portfolio performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="pt-6">
              <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-primary">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Client Growth & Portfolio</CardTitle>
            <CardDescription>Active clients and total deposits trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                <XAxis dataKey="month" stroke="hsl(var(--color-foreground))" />
                <YAxis stroke="hsl(var(--color-foreground))" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="activeClients"
                  stroke="hsl(var(--color-primary))"
                  strokeWidth={2}
                  name="Active Clients"
                />
                <Line
                  type="monotone"
                  dataKey="totalDeposits"
                  stroke="hsl(var(--color-chart-2))"
                  strokeWidth={2}
                  name="Total Deposits ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Deposits vs Loans</CardTitle>
            <CardDescription>Portfolio composition</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
                <XAxis dataKey="month" stroke="hsl(var(--color-foreground))" />
                <YAxis stroke="hsl(var(--color-foreground))" />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalDeposits" fill="hsl(var(--color-primary))" name="Total Deposits" />
                <Bar dataKey="totalLoans" fill="hsl(var(--color-chart-2))" name="Total Loans" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
