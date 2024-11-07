import NLink from "./NLink";
import { getLinksForRole } from "@/Layouts/links";
import ThemeToggle from "./ThemeToggle";

const SideBar = () => {
  const links = getLinksForRole('ADMIN')

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="h-screen sticky top-0 overflow-y-auto flex flex-col justify-between">
        <div>


          {/* <div className="flex flex-col h-14 justify-center items-start border-b px-4 lg:h-[60px] lg:px-6 bg-pink-600/25">
            <p className="text-lg font-semibold">Name</p>
            <p className="text-sm ">role</p>
          </div> */}
<div className="h-4"></div>

          <nav className="flex flex-col px-2 text-sm font-medium lg:px-4 gap-2 mt-4">
            {
              links.map(el => (
                <NLink key={el.to} to={el.to} text={el.text} Icon={el.icon} />
              ))
            }
          </nav>
        </div>
        <div className="m-2 p-1">
          <ThemeToggle />
        </div>

      </div>
    </div>
  );
}

export default SideBar;