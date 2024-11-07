import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/lib/store/authStore";
import { Menu, NotebookPen, Package2, Snowflake } from "lucide-react";
import { Link } from "react-router-dom";
import SearchForm from "../forms/SearchForm";
import ProfileButton from "./profile-button";
import { Notification } from "./notification";

const HeaderX = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  return (
    <header className="sticky top-0 flex z-20 h-16 items-center lg:justify-evenly gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Snowflake
            size={28}
            color="#165f02"
            strokeWidth={1.5}
            absoluteStrokeWidth
          />
          <span className="sr-only">D3vdut</span>
        </Link>
        <Link
          to="/add-post"
          className="text-muted-foreground text-xl transition-colors hover:text-foreground"
        >
          <span className="flex items-center gap-2">
            <NotebookPen
              size={28}
              color="#165f02"
              strokeWidth={1.5}
              absoluteStrokeWidth
            />{" "}
            Write
          </span>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Snowflake
                size={28}
                color="#165f02"
                strokeWidth={1.5}
                absoluteStrokeWidth
              />
              <span className="sr-only">D3vdut</span>
            </Link>
            <Link
              to="/add-post"
              className="text-muted-foreground text-xl transition-colors hover:text-foreground"
            >
              <span className="flex items-center gap-2">
                <NotebookPen
                  size={28}
                  color="#165f02"
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                />{" "}
                Write
              </span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex items-center gap-4 justify-center">
        <Link to="/" className="text-3xl font-bold text-green-600 capitalize">
          D3vdut
        </Link>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <SearchForm />
        {isAuthenticated ? (
          <>
            <Notification />
            <ProfileButton />
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login">
              <Button type="button" variant="outline">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button type="button" variant="outline">
                Signup
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderX;
