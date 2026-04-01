import React from 'react'
import { Ticket, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const tickets = [
  {
    id: 'TK-001',
    title: 'Leaking faucet in kitchen',
    status: 'open',
    priority: 'high',
    date: '2024-01-15',
    category: 'Plumbing',
  },
  {
    id: 'TK-002',
    title: 'AC unit not cooling properly',
    status: 'in-progress',
    priority: 'medium',
    date: '2024-01-12',
    category: 'HVAC',
  },
  {
    id: 'TK-003',
    title: 'Broken window latch in bedroom',
    status: 'open',
    priority: 'low',
    date: '2024-01-10',
    category: 'Windows',
  },
  {
    id: 'TK-004',
    title: 'Hallway light bulb replacement',
    status: 'resolved',
    priority: 'low',
    date: '2024-01-05',
    category: 'Electrical',
  },
]

const statusConfig = {
  open: { label: 'Open', color: 'bg-blue-100 text-blue-700', icon: Clock },
  'in-progress': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
}

const priorityColor = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-orange-100 text-orange-700',
  low: 'bg-gray-100 text-gray-600',
}

export default function TicketsView() {
  return (
    <div className="flex-1 overflow-y-auto p-6 chat-scroll">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <Ticket size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Tickets</h2>
            <p className="text-sm text-gray-500">Track your maintenance requests</p>
          </div>
        </div>

        <div className="space-y-3">
          {tickets.map((ticket) => {
            const status = statusConfig[ticket.status]
            const StatusIcon = status.icon
            return (
              <div
                key={ticket.id}
                className="bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{ticket.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                        <StatusIcon size={10} className="inline mr-1" />
                        {status.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-[14.5px] font-medium text-gray-800">{ticket.title}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-gray-500">{ticket.category}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{ticket.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
