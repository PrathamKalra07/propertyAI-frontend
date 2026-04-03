// src/components/TopBar.jsx

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function TopBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/auth', { replace: true })
  }

  // Derive initials and display name from user object
  const displayName = user?.username || user?.email || 'User'
  const role = user?.is_admin ? 'Admin' : 'Resident'
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <div />

      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>

          {/* Avatar button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2.5 rounded-lg px-2 py-1 hover:bg-gray-50 transition-colors"
          >
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900 leading-tight">{displayName}</div>
              <div className="text-xs text-gray-500">{role}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              {initials}
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
              {/* User info header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 truncate">{displayName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <button
                  onClick={() => { setOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User size={15} className="text-gray-400" />
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} className="text-red-500" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}