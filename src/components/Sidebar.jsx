import React from 'react'
import { NavLink } from 'react-router-dom'
import { Sparkles, Database, Hash, Tag, Building, Building2 } from 'lucide-react'
import {getNavRoutes} from '../routes'
import { useAuth } from '../context/AuthContext'
import { MessageSquare } from 'lucide-react'

const systemStats = [
  { icon: Database, label: 'Documents', value: '127' },
  { icon: Hash, label: 'Vectors', value: '45,234' },
  { icon: Tag, label: 'Open Tickets', value: '23' },
]

export default function Sidebar() {

  const {user} = useAuth();

  const NAV_ROUTES = getNavRoutes(user?.is_admin);
  return (
    <aside className="w-72 min-w-[280px] bg-white border-r border-gray-200 flex flex-col h-full select-none">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 size={18} className="text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-[15px] leading-tight">PropertyAI</div>
            <div className="text-xs text-gray-500 mt-0.5">Intelligent Assistant</div>
          </div>
        </div>
      </div>

      {/* Platform badge */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
          <div className="text-[13px] font-medium text-gray-800">AI-Powered Platform</div>
          <div className="text-xs text-gray-500 mt-0.5">Document Q&A • Ticket Management</div>
        </div>
      </div>

      {/* Navigation — driven by NAV_ROUTES config. Add a route there = new item here, no code change needed */}
      <nav className="px-3 py-2 flex-1 overflow-y-auto">
        {NAV_ROUTES.map(({ id, path, label, sublabel, icon: Icon }) => (
          <NavLink
            key={id}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-150 ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} className={isActive ? 'text-white' : 'text-gray-500'} />
                <div>
                  <div className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-800'}`}>
                    {label}
                  </div>
                  <div className={`text-xs mt-0.5 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                    {sublabel}
                  </div>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* System Overview */}
      {user?.is_admin && (
      <div className="px-4 pb-3">
        <div className="border border-gray-200 rounded-xl px-4 py-3">
          <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
            System Overview
          </div>
          <div className="space-y-2.5">
            {systemStats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 px-1">
          <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
          <span className="text-xs text-gray-600 font-medium">All systems operational</span>
        </div>
      </div>
      )
      }

    </aside>
  )
}
