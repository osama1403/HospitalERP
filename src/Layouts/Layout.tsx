import { Outlet } from 'react-router-dom'
import SideBar from "@/components/SideBar";
import MobileSideBar from "@/components/MobileSideBar";
import { Suspense } from 'react';
import PageLoader from '@/components/PageLoader';

const Layout = () => {

  return (
    <div className="md:grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* desktop sidebar */}
      <SideBar />

      {/* Content */}
      <div>
        <MobileSideBar />
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;