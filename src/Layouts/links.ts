import {
  Home,
  LucideIcon,
  ShoppingCart,
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
  test: {
    icon: ShoppingCart,
    to: '/test',
    text: 'Test'
  }
}

export default links

//dynamically get links for roles
export const getLinksForRole = (role: string): navigationLink[] => {
  let result: navigationLink[] = []
  switch (role) {
    case 'ADMIN': {
      result = [links.home, links.test]
    }
  }
  return result
}