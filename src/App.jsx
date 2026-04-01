import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import TicketsPage from './pages/TicketsPage'
import TicketDetailPage from './pages/TicketDetailPage'
import DocumentsPage from './pages/DocumentsPage'
import DocumentDetailPage from './pages/DocumentDetailPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import ChatPage from './pages/ChatPage'

function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex flex-1 overflow-hidden">
          <Routes>
            <Route path="/"                    element={<ChatPage botId="general" />} />
            <Route path="/ticket-chat"         element={<ChatPage botId="ticket" />} />
            <Route path="/tickets"             element={<TicketsPage />} />
            <Route path="/tickets/:uuid"       element={<TicketDetailPage />} />
            <Route path="/documents"           element={<DocumentsPage />} />
            <Route path="/documents/:uuid"     element={<DocumentDetailPage />} />
            <Route path="/analytics"           element={<AnalyticsPage />} />
            <Route path="/settings"            element={<SettingsPage />} />
            <Route path="*"                    element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
