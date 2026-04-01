import React from 'react'
import { Link } from 'react-router-dom'
import { Ticket, Clock, CheckCircle, AlertCircle, ChevronRight, Plus } from 'lucide-react'

export const TICKETS_DATA = [
  {
    uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    id: 'TK-001',
    title: 'Leaking faucet in kitchen',
    status: 'open',
    priority: 'high',
    date: '2024-01-15',
    category: 'Plumbing',
    description:
      'The kitchen faucet has been dripping constantly for 3 days. Water pressure seems normal but the handle drips even when fully closed.',
    assignee: 'Mike Torres',
    property: 'Unit 4B, 123 Maple Street',
  },
  {
    uuid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    id: 'TK-002',
    title: 'AC unit not cooling properly',
    status: 'in-progress',
    priority: 'medium',
    date: '2024-01-12',
    category: 'HVAC',
    description:
      'The central AC is running but the temperature does not drop below 78°F even when set to 68°F. Filter was replaced last month.',
    assignee: 'Sarah Chen',
    property: 'Unit 4B, 123 Maple Street',
  },
  {
    uuid: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    id: 'TK-003',
    title: 'Broken window latch in bedroom',
    status: 'open',
    priority: 'low',
    date: '2024-01-10',
    category: 'Windows',
    description: 'The latch on the bedroom window (north-facing) is broken and the window cannot be secured.',
    assignee: null,
    property: 'Unit 4B, 123 Maple Street',
  },
  {
    uuid: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    id: 'TK-004',
    title: 'Hallway light bulb replacement',
    status: 'resolved',
    priority: 'low',
    date: '2024-01-05',
    category: 'Electrical',
    description: 'The hallway ceiling light bulb has burned out and needs replacement.',
    assignee: 'Mike Torres',
    property: 'Unit 4B, 123 Maple Street',
  },
]

export const STATUS_CONFIG = {
  open: { label: 'Open', color: 'bg-blue-100 text-blue-700', icon: Clock },
  'in-progress': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
}

export const PRIORITY_COLOR = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-orange-100 text-orange-700',
  low: 'bg-gray-100 text-gray-600',
}

export default function TicketsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 chat-scroll">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <Ticket size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">My Tickets</h2>
              <p className="text-sm text-gray-500">Track your maintenance requests</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors">
            <Plus size={15} />
            New Ticket
          </button>
        </div>

        {/* Ticket list */}
        <div className="space-y-3">
          {TICKETS_DATA.map((ticket) => {
            const status = STATUS_CONFIG[ticket.status]
            const StatusIcon = status.icon
            return (
              <Link
                key={ticket.uuid}
                to={`/tickets/${ticket.uuid}`}
                className="block bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all duration-150 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-gray-400 font-mono">{ticket.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                        <StatusIcon size={10} className="inline mr-1" />
                        {status.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLOR[ticket.priority]}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-[14.5px] font-medium text-gray-800 group-hover:text-gray-900">
                      {ticket.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-gray-500">{ticket.category}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-500">{ticket.date}</span>
                      {ticket.assignee && (
                        <>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs text-gray-500">Assigned to {ticket.assignee}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 mt-1 flex-shrink-0 transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
