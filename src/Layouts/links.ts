import {
  Home,
  LucideIcon,
  Plus,
  LayoutGrid,
  UserRound,
  List,
  Heart
} from "lucide-react"

interface navigationLink {
  icon: LucideIcon;
  to: string;
  text: string;
}

interface linksType {
  [index: string]: navigationLink
}

const links: linksType = {
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
  staff: {
    icon: UserRound,
    to: '/staff',
    text: 'Staff'
  },
  admissions: {
    icon: List,
    to: '/admissions',
    text: 'Admissions'
  },
  doctors: {
    icon: Heart,
    to: '/doctors',
    text: 'Doctors'
  }
}

export default links

//dynamically get links for roles
export const getLinksForRole = (role: string): navigationLink[] => {
  let result: navigationLink[] = []
  switch (role) {
    case 'ADMIN': {
      result = [links.home, links.departments, links.register, links.staff, links.admissions, links.doctors]
    }
  }
  return result
}