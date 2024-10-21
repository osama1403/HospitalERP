import {
  Home,
  LucideIcon,
  Plus,
  LayoutGrid
} from "lucide-react"

interface navigationLink {
  icon: LucideIcon;
  to: string;
  text: string;
}

const links = {
  home: {
    icon: Home,
    to: '/',
    text: 'Home'
  },
  departments: {
    icon: LayoutGrid,
    to: '/departments',
    text: 'Departments'
  },
  register: {
    icon: Plus,
    to: '/register',
    text: 'Register'
  }
}

export default links

//dynamically get links for roles
export const getLinksForRole = (role: string): navigationLink[] => {
  let result: navigationLink[] = []
  switch (role) {
    case 'ADMIN': {
      result = [links.home, links.departments, links.register]
    }
  }
  return result
}