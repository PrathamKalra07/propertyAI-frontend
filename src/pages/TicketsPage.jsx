import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Ticket, Clock, CheckCircle, AlertCircle, ChevronRight, Plus, Loader } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

//  {
//     uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
//     id: 'TK-001',
//     title: 'Leaking faucet in kitchen',
//     status: 'open',
//     priority: 'high',
//     date: '2024-01-15',
//     category: 'Plumbing',
//     description:
//       'The kitchen faucet has been dripping constantly for 3 days. Water pressure seems normal but the handle drips even when fully closed.',
//     assignee: 'Mike Torres',
//     property: 'Unit 4B, 123 Maple Street',
//   },
// export let TICKETS_DATA = []



export const STATUS_CONFIG = {
  open: { label: 'Open', color: 'bg-blue-100 text-blue-700', icon: Clock },
  'in-progress': { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
}

export const PRIORITY_COLOR = {
  emergency : 'bg-red-100 text-red-700',
  urgent : 'bg-orange-100 text-orange-800',
  routine : 'bg-yellow-100 text-yellow-800',
  cosmetic : 'bg-gray-100 text-gray-600',
}

const SkeletonTicket = () => (
  <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 animate-pulse">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-3 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded-full" />
          <div className="h-4 w-14 bg-gray-100 rounded-full" />
        </div>
        <div className="h-3.5 w-3/4 bg-gray-200 rounded mb-2.5" />
        <div className="flex items-center gap-3">
          <div className="h-3 w-16 bg-gray-100 rounded" />
          <div className="h-3 w-20 bg-gray-100 rounded" />
          <div className="h-3 w-24 bg-gray-100 rounded" />
        </div>
      </div>
      <div className="w-4 h-4 bg-gray-100 rounded mt-1 flex-shrink-0" />
    </div>
  </div>
);

export default function TicketsPage() {

  const {tickets,isLoading} = useChat();

const mapTicket = (t) => ({
  uuid: t.ticket_id,
  id: t.ticket_id,

  title: t.issue_description,

  status: t.status,
  priority: t.priority,

  date: t.created_at,
  category: t.issue_category,

  description: t.issue_description,
  assignee: t.assigned_to,

  property: `Unit ${t.unit_number}, ${t.property_name}`,
});


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
        </div>

        {/* Ticket list */}
        <div className="space-y-3">
          {isLoading?
          Array.from({ length: 5 }).map((_, i) => <SkeletonTicket key={i} />):
          tickets?.map(mapTicket).map((ticket) => {
            const status = STATUS_CONFIG[ticket.status]
            const StatusIcon = status.icon
            return (
              <Link
                key={ticket.ticket_id}
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
