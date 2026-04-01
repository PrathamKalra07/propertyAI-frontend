import React from 'react'
import { Sparkles } from 'lucide-react'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown'

function WelcomeMessage() {
  return (
    <div className="bg-gray-50 rounded-2xl px-6 py-5 text-[14.5px] text-gray-700 leading-relaxed msg-appear">
      <p className="mb-4">
        Hello! I'm your PropertyAI assistant, powered by advanced AI trained on all your property documents and
        policies. I'm here to help you with:
      </p>

      <div className="mb-3">
        <p className="font-semibold text-gray-800 mb-1">🏠 <strong>Property Management</strong></p>
        <ul className="ml-1 space-y-0.5 text-gray-600">
          <li>• Lease agreements and terms</li>
          <li>• Property policies and regulations</li>
          <li>• Rental payment information</li>
        </ul>
      </div>

      <div className="mb-3">
        <p className="font-semibold text-gray-800 mb-1">🔧 <strong>Maintenance & Support</strong></p>
        <ul className="ml-1 space-y-0.5 text-gray-600">
          <li>• Report issues and create tickets</li>
          <li>• Schedule repairs and inspections</li>
          <li>• Track maintenance requests</li>
        </ul>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-gray-800 mb-1">📋 <strong>Document Intelligence</strong></p>
        <ul className="ml-1 space-y-0.5 text-gray-600">
          <li>• Search through all property documents</li>
          <li>• Get instant answers with source references</li>
          <li>• Access policies, procedures, and agreements</li>
        </ul>
      </div>

      <p>How can I assist you today?</p>
    </div>
  )
}

export default function ChatMessage({ message,generating }) {
  if (message.type === 'welcome') {
    return (
      <div className="flex gap-4 items-start">
        <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles size={16} className="text-white" />
        </div>
        <div className="flex-1 max-w-3xl">
          <WelcomeMessage />
        </div>
      </div>
    )
  }

  if (message.role === 'user') {
    return (
      <div className="flex justify-end msg-appear">
        <div className="bg-gray-900 text-white rounded-2xl px-5 py-3 max-w-xl text-[14.5px] leading-relaxed">
          {message.value}
        </div>
      </div>
    )
  }

  return (
  <div className="flex gap-4 items-start msg-appear">
    <div className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
      <Sparkles size={16} className="text-white" />
    </div>

    <div className="flex w-fit max-w-3xl">
      <div className="bg-gray-50 rounded-2xl px-6 py-5 text-[14.5px] text-gray-700 leading-relaxed">
        {message.content === "" ? (
          <div className="flex gap-1.5 items-center h-4">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        ) : (
          <Markdown 
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-3">
                  <table className="min-w-full border-collapse text-[13.5px]" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gray-200 text-gray-700" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="px-4 py-2 text-left font-semibold border border-gray-300" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-4 py-2 border border-gray-200 text-gray-600" {...props} />
              ),
              tr: ({ node, ...props }) => (
                <tr className="even:bg-gray-50" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 space-y-1 my-2 text-gray-700" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5 space-y-1 my-2 text-gray-700" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="ml-1" {...props} />
              ),
              h1: ({ node, ...props }) => (
                <h1 className="text-xl font-bold mt-4 mb-2 text-gray-900" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-lg font-semibold mt-3 mb-2 text-gray-800" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-base font-semibold mt-3 mb-1 text-gray-800" {...props} />
              ),
            }} >
            {message.content}
          </Markdown>
        )}
      </div>
    </div>
  </div>
)
}