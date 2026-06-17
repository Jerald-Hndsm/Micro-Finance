"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Edit2, Plus } from "lucide-react"
import AddMemberModal, { MemberFormData } from "@/components/members-components/add-member-modal"

interface Member extends MemberFormData {
  id: number
}

const initialMembers: Member[] = [
  {
    id: 1,
    name: "Amina Mohamed",
    email: "amina@example.com",
    phone: "+254712345678",
    joinDate: "2024-01-10",
    status: "Active",
  },
  {
    id: 2,
    name: "James Kipchoge",
    email: "james@example.com",
    phone: "+254723456789",
    joinDate: "2024-01-12",
    status: "Active",
  },
  {
    id: 3,
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "+254734567890",
    joinDate: "2024-01-15",
    status: "Active",
  },
  {
    id: 4,
    name: "Kwame Asante",
    email: "kwame@example.com",
    phone: "+254745678901",
    joinDate: "2024-01-08",
    status: "Inactive",
  },
]

const ITEMS_PER_PAGE = 20

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)

  const filteredMembers = useMemo(
    () =>
      members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [members, searchTerm]
  )

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex)

  const handleOpenAddModal = () => {
    setEditingMember(null)
    setIsModalOpen(true)
  }

  const handleEditMember = (member: Member) => {
    setEditingMember(member)
    setIsModalOpen(true)
  }

  const handleSaveMember = (data: MemberFormData) => {
    if (editingMember) {
      setMembers(
        members.map((m) => (m.id === editingMember.id ? { ...m, ...data } : m))
      )
    } else {
      const newMember: Member = {
        id: Math.max(...members.map((m) => m.id), 0) + 1,
        ...data,
      }
      setMembers([...members, newMember])
    }
    setEditingMember(null)
  }

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Members</h1>
          <p className="text-foreground/60 mt-1">Manage and monitor all members</p>
        </div>
        <Button
          onClick={handleOpenAddModal}
          className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </Button>
      </div>

      <Input
        placeholder="Search members by name or email..."
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
                <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Email</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Phone</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Join Date</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMembers.map((member) => (
                <tr key={member.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 text-foreground font-medium">{member.name}</td>
                  <td className="px-4 py-2.5 text-foreground/70 text-xs">{member.email}</td>
                  <td className="px-4 py-2.5 text-foreground/70 text-xs">{member.phone}</td>
                  <td className="px-4 py-2.5 text-center text-foreground/60 text-xs">{member.joinDate}</td>
                  <td className="px-4 py-2.5 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        member.status === "Active"
                          ? "bg-primary/20 text-primary"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={() => handleEditMember(member)}
                        size="sm"
                        variant="outline"
                        className="bg-transparent p-2 h-8 w-8"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteMember(member.id)}
                        size="sm"
                        variant="outline"
                        className="bg-transparent p-2 h-8 w-8 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedMembers.length === 0 && (
          <div className="p-8 text-center text-foreground/60">
            <p>No members found matching your search.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-foreground/60">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredMembers.length)} of {filteredMembers.length}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-transparent"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
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

      <AddMemberModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSaveMember}
        initialData={editingMember}
      />
    </div>
  )
}