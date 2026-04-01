import { MessageSquare, Ticket, FileText, Settings, BarChart2 } from 'lucide-react'

// Every nav item lives here. Add one entry = new sidebar item + route, nothing else to touch.
export const NAV_ROUTES = [
  {
    id: 'assistant',
    path: '/',
    label: 'AI Assistant',
    sublabel: 'Chat & get answers',
    icon: MessageSquare,
  },
  {
    id: 'ticket-chat',
    path: '/ticket-chat',
    label: 'Ticket Query',
    sublabel: 'Generate tickets via chat',
    icon: Ticket,
  },
  {
    id: 'tickets',
    path: '/tickets',
    label: 'Tickets',
    sublabel: 'Track requests',
    icon: Ticket,
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
