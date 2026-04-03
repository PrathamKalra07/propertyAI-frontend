// src/App.jsx

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
import AuthPage from './pages/AuthPage'

import { useAuth } from './context/AuthContext'
import {
    RequireAdmin,
    RequireUser,
    RedirectIfAuthenticated,
} from './components/ProtectedRoute'
import OpenLeadsPage from './pages/OpenLeadsPage'
import OpenLeadsDetailPage from './pages/OpenLeadsDetailPage'

function AppShell() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <TopBar />
                <main className="flex flex-1 overflow-hidden">
                    <Routes>

                        {/* User-only routes */}
                        <Route path="/" element={
                            <RequireUser><ChatPage botId="general" /></RequireUser>
                        } />
                        <Route path="/ticket-chat" element={
                            <RequireUser><ChatPage botId="ticket" /></RequireUser>
                        } />
                        <Route path="/lease-chat" element={
                            <RequireUser><ChatPage botId="lease" /></RequireUser>
                        } />
                        <Route path="/tickets" element={
                            <RequireUser><TicketsPage /></RequireUser>
                        } />
                        <Route path="/tickets/:uuid" element={
                            <RequireUser><TicketDetailPage /></RequireUser>
                        } />

                        {/* Admin-only routes */}
                        <Route path="/manage-tickets" element={
                            <RequireAdmin><TicketsPage /></RequireAdmin>
                        } />
                        <Route path="/manage-tickets/:uuid" element={
                            <RequireAdmin><TicketDetailPage /></RequireAdmin>
                        } />
                        <Route path="/open-leads" element={
                            <RequireAdmin><OpenLeadsPage /></RequireAdmin>
                        } />
                        <Route path="/open-leads/:uuid" element={
                            <RequireAdmin><OpenLeadsDetailPage /></RequireAdmin>
                        } />
                        <Route path="/documents" element={
                            <RequireAdmin><DocumentsPage /></RequireAdmin>
                        } />
                        <Route path="/documents/:uuid" element={
                            <RequireAdmin><DocumentDetailPage /></RequireAdmin>
                        } />
                        <Route path="/analytics" element={
                            <RequireAdmin><AnalyticsPage /></RequireAdmin>
                        } />
                        <Route path="/settings" element={
                            <RequireAdmin><SettingsPage /></RequireAdmin>
                        } />

                        {/* Catch-all */}
                        <Route path="*" element={<RoleBasedRedirect />} />

                    </Routes>
                </main>
            </div>
        </div>
    )
}

function RoleBasedRedirect() {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/auth" replace />;
    return <Navigate to={user?.is_admin ? '/manage-tickets' : '/'} replace />;
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={
                    <RedirectIfAuthenticated><AuthPage /></RedirectIfAuthenticated>
                } />
                <Route path="/login" element={<Navigate to="/auth" replace />} />
                <Route path="/*" element={<AppShell />} />
            </Routes>
        </BrowserRouter>
    )
}