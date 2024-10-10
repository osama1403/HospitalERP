import Container from "@/components/Container";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, Outlet } from 'react-router-dom'
import { Badge, Home, Menu, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button";
import SideBar from "@/components/SideBar";
import MobileSideBar from "@/components/MobileSideBar";

const Layout = () => {

  // const Links = [
  //   {
  //     to: '/page',
  //     icon: Menu
  //   }
  // ]


  return (
    <>

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

        {/* desktop sidebar */}
        <SideBar />

        {/* Content */}
        <div>
          <MobileSideBar />
          <Outlet />
        </div>

      </div>

    </>
  );
}

export default Layout;