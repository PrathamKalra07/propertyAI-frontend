import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Calendar, FileText, Hash } from 'lucide-react'
import { DOCUMENTS_DATA } from './DocumentsPage'

export default function DocumentDetailPage() {
  const { uuid } = useParams()
  const doc = DOCUMENTS_DATA.find((d) => d.uuid === uuid)

  if (!doc) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg font-medium">Document not found</p>
          <Link to="/documents" className="text-sm text-gray-500 hover:text-gray-700 mt-2 inline-block underline">
            Back to documents
          </Link>
        </div>
      </div>
    )
  }

  const Icon = doc.icon

  return (
    <div className="flex-1 overflow-y-auto p-6 chat-scroll">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          to="/documents"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Documents
        </Link>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${doc.iconBg}`}>
              <Icon size={22} className={doc.iconColor} />
            </div>
            <div className="flex-1">
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{doc.category}</span>
              <h1 className="text-xl font-semibold text-gray-900 mt-1.5">{doc.title}</h1>
            </div>
          </div>

          {/* Meta */}
          <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-3 gap-4">
            <div className="flex items-start gap-2">
              <Calendar size={14} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Date</p>
                <p className="text-sm text-gray-700 font-medium">{doc.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText size={14} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Pages</p>
                <p className="text-sm text-gray-700 font-medium">{doc.pages}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Hash size={14} className="text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Size</p>
                <p className="text-sm text-gray-700 font-medium">{doc.size}</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Summary</p>
            <p className="text-[14.5px] text-gray-700 leading-relaxed">{doc.summary}</p>
          </div>

          {/* Document preview placeholder */}
          <div className="px-6 py-5 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Preview</p>
            <div className="bg-gray-50 border border-gray-200 rounded-xl h-48 flex items-center justify-center">
              <div className="text-center">
                <Icon size={32} className={`${doc.iconColor} mx-auto mb-2 opacity-40`} />
                <p className="text-sm text-gray-400">Document preview would appear here</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors">
              <Download size={14} />
              Download
            </button>
            <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-white transition-colors">
              Ask AI about this document
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
