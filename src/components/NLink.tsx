import { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom';

interface navLinkProps {
  to: string;
  text: string;
  Icon: LucideIcon;
}
const NLink = ({ to, text, Icon, ...restProps }: navLinkProps) => {
  return (
    <NavLink
      to={to}
      {...restProps}
      className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? 'text-primary-foreground bg-primary' : 'text-muted-foreground hover:bg-muted'}`}
    >
      <Icon className="h-4 w-4" />
      {text}
    </NavLink>
  );
}

export default NLink;