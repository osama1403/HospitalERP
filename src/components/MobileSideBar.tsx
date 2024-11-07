import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import NLink from "./NLink";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { getLinksForRole } from "@/Layouts/links";
import ThemeToggle from "./ThemeToggle";

const MobileSideBar = () => {
  const links = getLinksForRole('ADMIN')

  return (
    <header className="md:hidden sticky top-0 flex h-14 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6">
      {/* <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"> */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="max-w-xs w-full sm:w-full">

          {/* for aria */}
          <VisuallyHidden>
            <SheetTitle>Navigation Content</SheetTitle>
          </VisuallyHidden>
          <VisuallyHidden>
            <SheetDescription>Navigation content</SheetDescription>
          </VisuallyHidden>

          <div className="h-full flex flex-col justify-between">
            <div>
              <nav className="space-y-2 text-lg font-medium mt-6">
                {
                  links.map(el => (
                    <SheetClose asChild key={el.to}>
                      <NLink to={el.to} text={el.text} Icon={el.icon} />
                    </SheetClose>
                  ))
                }

              </nav>
            </div>

            <div className="p-1">
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default MobileSideBar;