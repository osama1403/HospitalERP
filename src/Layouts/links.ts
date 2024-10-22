import {
  Home,
  LucideIcon,
  Plus,
  LayoutGrid,
  UserRound
} from "lucide-react"

interface navigationLink {
  icon: LucideIcon;
  to: string;
  text: string;
}

interface linksType{
  [index:string]:navigationLink
}

const links:linksType = {
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
  },
  admissions: {
    icon: UserRound,
    to: '/admissions',
    text: 'Admissions'
  }
}

export default links

//dynamically get links for roles
export const getLinksForRole = (role: string): navigationLink[] => {
  let result: navigationLink[] = []
  switch (role) {
    case 'ADMIN': {
      result = [links.home, links.departments, links.register,links.admissions]
    }
  }
  return result
}