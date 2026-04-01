import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, ChevronRight, Search, FileCheck, FileClock, FileWarning } from 'lucide-react'

export const DOCUMENTS_DATA = [
  {
    uuid: 'doc-1111-2222-3333-aaaa',
    title: 'Residential Lease Agreement',
    category: 'Lease',
    date: '2023-09-01',
    size: '248 KB',
    icon: FileCheck,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    summary: 'Your current lease agreement for Unit 4B, covering the period Sep 2023 – Aug 2024. Includes all terms, conditions, and addendums.',
    pages: 18,
  },
  {
    uuid: 'doc-2222-3333-4444-bbbb',
    title: 'Property Rules & Regulations',
    category: 'Policy',
    date: '2023-09-01',
    size: '124 KB',
    icon: FileText,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    summary: 'Community policies including noise levels, parking, pets, guests, and common area usage.',
    pages: 7,
  },
  {
    uuid: 'doc-3333-4444-5555-cccc',
    title: 'Move-In Inspection Report',
    category: 'Inspection',
    date: '2023-09-02',
    size: '3.1 MB',
    icon: FileWarning,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-50',
    summary: 'Signed move-in inspection form documenting unit condition at the time of occupancy.',
    pages: 4,
  },
  {
    uuid: 'doc-4444-5555-6666-dddd',
    title: 'Rent Payment History',
    category: 'Financial',
    date: '2024-01-01',
    size: '56 KB',
    icon: FileClock,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
    summary: 'Full payment ledger showing all rent transactions since lease start.',
    pages: 2,
  },
  {
    uuid: 'doc-5555-6666-7777-eeee',
    title: 'Parking Addendum',
    category: 'Addendum',
    date: '2023-09-01',
    size: '38 KB',
    icon: FileText,
    iconColor: 'text-gray-600',
    iconBg: 'bg-gray-50',
    summary: 'Addendum detailing assigned parking spot #24 and visitor parking regulations.',
    pages: 1,
  },
]

export default function DocumentsPage() {
  const [search, setSearch] = React.useState('')

  const filtered = DOCUMENTS_DATA.filter(
    (d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-y-auto p-6 chat-scroll">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
              <p className="text-sm text-gray-500">{DOCUMENTS_DATA.length} property documents</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 bg-white focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        {/* List */}
        <div className="space-y-2.5">
          {filtered.map((doc) => {
            const Icon = doc.icon
            return (
              <Link
                key={doc.uuid}
                to={`/documents/${doc.uuid}`}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all duration-150 group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${doc.iconBg}`}>
                  <Icon size={18} className={doc.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14.5px] font-medium text-gray-800 group-hover:text-gray-900 truncate">
                    {doc.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{doc.category}</span>
                    <span className="text-xs text-gray-400">{doc.size}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{doc.pages}p</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
