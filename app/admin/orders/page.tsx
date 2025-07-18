"use client"

import { useEffect, useState } from "react"
import { CredentialDelivery } from "@/components/admin/CredentialDelivery"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/lib/auth-client"

type Order = {
  id: string
  userId: string
  status: "pending" | "processing" | "delivered" | "cancelled"
  paymentId?: string
  polarSubscriptionId?: string
  assignedAdminId?: string
  adminNotes?: string
  priority: "low" | "normal" | "high"
  createdAt: string
  deliveredAt?: string
  updatedAt: string
  user: {
    name: string
    email: string
  }
  assignedAdmin?: {
    name: string
    email: string
  }
}

export default function AdminOrdersPage() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [deliveryOrder, setDeliveryOrder] = useState<Order | null>(null)
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [assigningOrder, setAssigningOrder] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/admin/orders")

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({ error: "Unknown error" }))) as { error?: string }
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      const data = (await response.json()) as { orders: Order[] }
      setOrders(data.orders || [])
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch orders")
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, status: string, notes?: string) => {
    try {
      setError(null)
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          adminNotes: notes,
          assignedAdminId: session?.user.id,
        }),
      })

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({ error: "Unknown error" }))) as { error?: string }
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      await fetchOrders()
      setSelectedOrder(null)
      setIsEditModalOpen(false)
    } catch (error) {
      console.error("Failed to update order:", error)
      setError(error instanceof Error ? error.message : "Failed to update order")
    }
  }

  const assignOrder = async (orderId: string, adminId: string) => {
    try {
      setAssigningOrder(orderId)
      setError(null)

      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignedAdminId: adminId,
        }),
      })

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({ error: "Unknown error" }))) as { error?: string }
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      await fetchOrders()
      // Success feedback could be added here with a toast notification
    } catch (error) {
      console.error("Failed to assign order:", error)
      setError(error instanceof Error ? error.message : "Failed to assign order")
    } finally {
      setAssigningOrder(null)
    }
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsEditModalOpen(true)
  }

  const handleUpdateOrder = () => {
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, selectedOrder.status, selectedOrder.adminNotes)
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesPriority = priorityFilter === "all" || order.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  console.log("{deliveryOrder}", deliveryOrder)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl leading-6 font-semibold text-gray-900">Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all orders in your account including their status, priority, and assigned admin.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority-filter">Priority</Label>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={fetchOrders}
                  className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-200"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Orders Table */}
      {!isLoading && !error && (
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                    {orders.length === 0 ? "No orders found" : "No orders match the selected filters"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.slice(-8)}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.user.name}</div>
                        <div className="text-sm text-gray-500">{order.user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      {order.assignedAdmin ? (
                        <div>
                          <div className="font-medium">{order.assignedAdmin.name}</div>
                          <div className="text-sm text-gray-500">{order.assignedAdmin.email}</div>
                        </div>
                      ) : (
                        <span className="text-gray-500">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)}>
                          Edit
                        </Button>
                        {order.status === "processing" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setDeliveryOrder(order)
                              setIsDeliveryModalOpen(true)
                            }}
                            className="text-green-600 hover:text-green-700"
                          >
                            Deliver
                          </Button>
                        )}
                        {!order.assignedAdminId && session && (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={assigningOrder === order.id}
                            onClick={() => assignOrder(order.id, session.user.id)}
                            className="text-orange-600 hover:text-orange-700 disabled:opacity-50"
                          >
                            {assigningOrder === order.id ? "Assigning..." : "Assign to Me"}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Order Edit Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>{selectedOrder && `Order ID: ${selectedOrder.id.slice(-8)}`}</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={selectedOrder.status}
                  onValueChange={(value) => setSelectedOrder({ ...selectedOrder, status: value as Order["status"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Admin Notes</Label>
                <Textarea
                  id="notes"
                  value={selectedOrder.adminNotes || ""}
                  onChange={(e) => setSelectedOrder({ ...selectedOrder, adminNotes: e.target.value })}
                  placeholder="Add admin notes..."
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateOrder}>Update Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credential Delivery Modal */}
      {deliveryOrder && (
        <CredentialDelivery
          orderId={deliveryOrder.id}
          userEmail={deliveryOrder.user.email}
          userName={deliveryOrder.user.name}
          open={isDeliveryModalOpen}
          onOpenChange={setIsDeliveryModalOpen}
          onDeliveryComplete={() => {
            setDeliveryOrder(null)
            setIsDeliveryModalOpen(false)
            fetchOrders()
          }}
        />
      )}
    </div>
  )
}
