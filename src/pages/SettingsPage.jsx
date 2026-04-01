import React from 'react'
import { Settings, Bell, Lock, User, Palette } from 'lucide-react'

const sections = [
  {
    icon: User,
    title: 'Profile',
    description: 'Update your name, email, and contact details',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Configure how you receive alerts and updates',
  },
  {
    icon: Lock,
    title: 'Security',
    description: 'Manage your password and two-factor authentication',
  },
  {
    icon: Palette,
    title: 'Appearance',
    description: 'Choose your theme and display preferences',
  },
]

export default function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6 chat-scroll">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <Settings size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
            <p className="text-sm text-gray-500">Account & preferences</p>
          </div>
        </div>

        <div className="space-y-3">
          {sections.map(({ icon: Icon, title, description }) => (
            <button
              key={title}
              className="w-full flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:border-gray-300 hover:shadow-sm transition-all duration-150 text-left group"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
                <Icon size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-[14.5px] font-medium text-gray-800">{title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
