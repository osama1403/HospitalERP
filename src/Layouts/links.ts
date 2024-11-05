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
  },
  accounts: {
    icon: UserRound,
    to: '/accounts',
    text: 'Accounts'
  },
  admissions: {
    icon: List,
    to: '/admissions',
    text: 'Admissions'
  },
  staff: {
    icon: Heart,
    to: '/staff',
    text: 'Staff'
  },
  patient: {
    icon: Heart,
    to: '/patient',
    text: 'Patient'
  }
}

export default links

//dynamically get links for roles
export const getLinksForRole = (role: string): navigationLink[] => {
  let result: navigationLink[] = []
  switch (role) {
    case 'ADMIN': {
      result = [links.home, links.departments, links.register, links.accounts, links.admissions, links.staff,links.patient]
    }
  }
  return result
}