import React from 'react'
import { ChevronDown } from 'lucide-react'

export default function TopBar() {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      {/* Left spacer */}
      <div />

      {/* Right: Switch to Admin + User */}
      <div className="flex items-center gap-4">
        <button className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
          Switch to Admin
        </button>

        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-900 leading-tight">John Anderson</div>
            <div className="text-xs text-gray-500">Resident</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-semibold">
            JA
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
