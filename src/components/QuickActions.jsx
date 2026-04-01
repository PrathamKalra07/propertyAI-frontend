import React from 'react'

const QUICK_ACTIONS = {
    general: [
        'What are my lease terms?',
        'Check payment due date',
        'What are the property policies?',
    ],
    ticket: [
        'Report a maintenance issue',
        'Schedule an inspection',
        'Track my repair request',
    ],
}

const FALLBACK_ACTIONS = [
    'How can you help me?',
    'What can I ask you?',
]

export default function QuickActions({ onSelect, model }) {
    const actions = QUICK_ACTIONS[model] ?? FALLBACK_ACTIONS

    return (
        <div className="flex gap-3 justify-center flex-wrap">
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={() => onSelect(action)}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-150 font-medium whitespace-nowrap"
                >
                    {action}
                </button>
            ))}
        </div>
    )
}