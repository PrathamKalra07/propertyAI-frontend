import React from 'react'
import { BarChart2, TrendingUp, MessageSquare, Ticket } from 'lucide-react'

const stats = [
  { label: 'AI Queries This Month', value: '47', icon: MessageSquare, trend: '+12%' },
  { label: 'Tickets Resolved', value: '18', icon: Ticket, trend: '+5%' },
  { label: 'Avg Response Time', value: '1.2s', icon: TrendingUp, trend: '-8%' },
  { label: 'Documents Accessed', value: '34', icon: BarChart2, trend: '+21%' },
]

export default function AnalyticsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 chat-scroll">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <BarChart2 size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Analytics</h2>
            <p className="text-sm text-gray-500">Usage insights & metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map(({ label, value, icon: Icon, trend }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon size={15} className="text-gray-600" />
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-5">
          <p className="text-sm font-medium text-gray-700 mb-4">Activity (Last 30 Days)</p>
          <div className="flex items-end gap-1.5 h-28">
            {Array.from({ length: 30 }, (_, i) => {
              const height = Math.max(15, Math.floor(Math.random() * 100))
              return (
                <div
                  key={i}
                  className="flex-1 bg-gray-200 hover:bg-gray-900 rounded-sm transition-colors cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`Day ${i + 1}`}
                />
              )
            })}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">Jan 1</span>
            <span className="text-xs text-gray-400">Jan 30</span>
          </div>
        </div>
      </div>
    </div>
  )
}
