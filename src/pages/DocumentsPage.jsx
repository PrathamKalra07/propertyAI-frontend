import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Search, FileCheck, FileClock, FileWarning, FileQuestion } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'

const formatSize = (bytes) => {
  if (!bytes) return '—'
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  return `${Math.round(bytes / 1024)} KB`
}

const formatDate = (iso) => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const getIconConfig = (name = '') => {
  const lower = name.toLowerCase()
  if (lower.includes('lease') || lower.includes('agreement'))
    return { Icon: FileCheck, color: 'text-blue-600', bg: 'bg-blue-50' }
  if (lower.includes('policy') || lower.includes('policies') || lower.includes('procedure'))
    return { Icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' }
  if (lower.includes('inspection') || lower.includes('maintenance'))
    return { Icon: FileWarning, color: 'text-orange-600', bg: 'bg-orange-50' }
  if (lower.includes('payment') || lower.includes('financial') || lower.includes('faq'))
    return { Icon: FileClock, color: 'text-green-600', bg: 'bg-green-50' }
  return { Icon: FileQuestion, color: 'text-gray-500', bg: 'bg-gray-100' }
}

const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 animate-pulse">
    <div className="flex items-start justify-between gap-2">
      <div className="w-10 h-10 rounded-xl bg-gray-200 flex-shrink-0" />
      <div className="h-5 w-16 bg-gray-100 rounded-full" />
    </div>
    <div className="flex flex-col gap-2 mt-1">
      <div className="h-3.5 w-3/4 bg-gray-200 rounded" />
      <div className="h-3 w-1/2 bg-gray-100 rounded" />
    </div>
    <div className="mt-auto pt-3 border-t border-gray-100 flex gap-3">
      <div className="h-3 w-12 bg-gray-100 rounded" />
      <div className="h-3 w-16 bg-gray-100 rounded" />
      <div className="h-3 w-10 bg-gray-100 rounded" />
    </div>
  </div>
)

const DocumentCard = ({ doc }) => {
  const { Icon, color, bg } = getIconConfig(doc.original_filename)
  const statusDot = doc.status === 'completed'
    ? 'bg-emerald-400'
    : doc.status === 'processing' ? 'bg-amber-400' : 'bg-red-400'

  return (
    <Link
      to={`/documents/${doc.id}`}
      className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 group"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
          <Icon size={18} className={color} />
        </div>
        <span className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-lg border flex-shrink-0
          ${doc.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
          {doc.status}
        </span>
      </div>

      {/* Title */}
      <div>
        <p className="text-[13.5px] font-semibold text-gray-800 group-hover:text-gray-900 leading-snug line-clamp-2">
          {doc.original_filename?.replace(/\.pdf$/i, '')}
        </p>
        <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-medium">
          {doc.category || doc.document_type}
        </p>
      </div>

      {/* Footer meta */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-3 flex-wrap">
        <span className="text-[11px] text-gray-400">{doc.page_count} pages</span>
        <span className="text-gray-200">·</span>
        <span className="text-[11px] text-gray-400">{formatSize(doc.file_size)}</span>
        <span className="text-gray-200">·</span>
        <span className="text-[11px] text-gray-400">{formatDate(doc.uploaded_at)}</span>
      </div>
    </Link>
  )
}

export default function DocumentsPage() {
  const { documents,isLoading } = useChat();
  const [search, setSearch] = useState('')


  const filtered = documents.filter(d =>
    d.original_filename?.toLowerCase().includes(search.toLowerCase()) ||
    d.category?.toLowerCase().includes(search.toLowerCase()) ||
    d.document_type?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-y-auto p-6 chat-scroll">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
              <p className="text-sm text-gray-500">{documents.length} property documents</p>
            </div>
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:border-gray-400 transition-colors w-52"
            />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <FileQuestion size={40} className="mb-3 text-gray-300" />
            <p className="text-sm font-medium">No documents found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
          </div>
        )}

      </div>
    </div>
  )
}