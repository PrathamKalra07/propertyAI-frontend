import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, AlertCircle, CheckCircle, User, Tag, Calendar, MapPin } from 'lucide-react'
import { STATUS_CONFIG, PRIORITY_COLOR } from './TicketsPage'

export default function TicketDetailPage() {
  const { uuid } = useParams()
  // const ticket = TICKETS_DATA.find((t) => t.uuid === uuid)
  const {ticket} = useParams()

  if (!ticket) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg font-medium">Ticket not found</p>
          <Link to="/tickets" className="text-sm text-gray-500 hover:text-gray-700 mt-2 inline-block underline">
            Back to tickets
          </Link>
        </div>
      </div>
    )
  }

  const status = STATUS_CONFIG[ticket.status]
  const StatusIcon = status.icon

  return (
    <div className="flex-1 overflow-y-auto p-6 chat-scroll">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          to="/tickets"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Tickets
        </Link>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-400 font-mono">{ticket.id}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                <StatusIcon size={10} className="inline mr-1" />
                {status.label}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLOR[ticket.priority]}`}>
                {ticket.priority} priority
              </span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">{ticket.title}</h1>
          </div>

          {/* Meta */}
          <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Tag size={14} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Category</p>
                <p className="text-sm text-gray-700 font-medium">{ticket.category}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Calendar size={14} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Submitted</p>
                <p className="text-sm text-gray-700 font-medium">{ticket.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User size={14} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Assigned To</p>
                <p className="text-sm text-gray-700 font-medium">{ticket.assignee || 'Unassigned'}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={14} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Property</p>
                <p className="text-sm text-gray-700 font-medium">{ticket.property}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="px-6 py-5">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Description</p>
            <p className="text-[14.5px] text-gray-700 leading-relaxed">{ticket.description}</p>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors">
              Update Status
            </button>
            <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-white transition-colors">
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
