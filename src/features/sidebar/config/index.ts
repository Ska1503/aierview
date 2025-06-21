import { SidebarLinks } from '@/features/sidebar'
import { ROUTES } from '@/shared/config'

export const NAV_SIDEBAR: SidebarLinks[] = [
  {
    id: 1,
    link: ROUTES.DASHBOARD,
    icon: 'dashboard_icon',
    name: 'dashboard'
  },
  {
    id: 2,
    link: ROUTES.INTERVIEWER,
    icon: 'users_icon',
    name: 'interview'
  },
  {
    id: 3,
    link: ROUTES.AI_ENGINEER,
    icon: 'engineer_icon',
    name: 'aiEngineer'
  },
  {
    id: 4,
    link: ROUTES.AI_HR,
    icon: 'hr_icon',
    name: 'aiHr'
  },
  {
    id: 5,
    link: ROUTES.ANALYZER_RESUME,
    icon: 'resume_icon',
    name: 'analyzerResume'
  },
  {
    id: 6,
    link: ROUTES.SETTINGS,
    icon: 'settings_icon',
    name: 'settings'
  }
]
