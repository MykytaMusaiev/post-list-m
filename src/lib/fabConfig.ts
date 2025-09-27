import { FabConfig } from './types'

export const FAB_CONFIG: Record<'CREATE' | 'HOME', FabConfig> = {
  CREATE: {
    href: '/posts/new',
    label: 'Створити новий пост',
    icon: '➕',
    bgColor: 'bg-blue-600',
    hoverBgColor: 'hover:bg-blue-700',
  },
  HOME: {
    href: '/',
    label: 'На головну сторінку',
    icon: '🏠︎',
    bgColor: 'bg-purple-600',
    hoverBgColor: 'hover:bg-purple-700',
  },
} as const
