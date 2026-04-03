// src/config/navRoutes.js

import { MessageSquare, Wrench, Home, ClipboardList, FileText, BarChart2, Settings, TimerIcon } from "lucide-react";

export const getNavRoutes = (isAdmin) => {
    return isAdmin
        ? [
            {
                id: 'manage-tickets',
                path: '/manage-tickets',
                label: 'Manage Tickets',
                sublabel: 'Track requests',
                icon: ClipboardList,
            },
            {
                id: 'open-leads',
                path: '/open-leads',
                label: 'Manage Leads',
                sublabel: 'Track Appointments',
                icon: TimerIcon,
            },
            {
                id: 'documents',
                path: '/documents',
                label: 'Documents',
                sublabel: 'Browse property docs',
                icon: FileText,
            },
            {
                id: 'analytics',
                path: '/analytics',
                label: 'Analytics',
                sublabel: 'Usage & insights',
                icon: BarChart2,
            },
            {
                id: 'settings',
                path: '/settings',
                label: 'Settings',
                sublabel: 'Account & preferences',
                icon: Settings,
            },
        ]
        : [
            {
                id: 'assistant',
                path: '/',
                label: 'Knowledge Assistant',
                sublabel: 'Chat & get answers',
                icon: MessageSquare,
            },
            {
                id: 'ticket-chat',
                path: '/ticket-chat',
                label: 'Maintenance Requests',
                sublabel: 'Generate tickets via chat',
                icon: Wrench,
            },
            {
                id: 'lease-chat',
                path: '/lease-chat',
                label: 'Find a Property',
                sublabel: 'Learn more about available leases',
                icon: Home,
            },
            {
                id: 'tickets',
                path: '/tickets',
                label: 'My Tickets',
                sublabel: 'Track requests',
                icon: ClipboardList,
            },
        ];
};