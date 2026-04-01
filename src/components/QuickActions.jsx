import React from 'react'

const quickActions = [
  'What are my lease terms?',
  'Report a maintenance issue',
  'Check payment due date',
]

export default function QuickActions({ onSelect }) {
  return (
    <div className="flex gap-3 justify-center">
      {quickActions.map((action) => (
        <button
          key={action}
          onClick={() => onSelect({
            id: Date.now(),
            role: 'user',
            value: action
          })}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 font-medium whitespace-nowrap"
        >
          {action}
        </button>
      ))}
    </div>
  )
}
