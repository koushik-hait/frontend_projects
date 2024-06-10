import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/lib/store/authStore";
import { Menu, Package2 } from "lucide-react";
import { Link } from "react-router-dom";
import SearchForm from "../forms/SearchForm";
import ProfileButton from "./ProfileButton";

const HeaderX = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          to="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <Link
          to="/all-posts"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Posts
        </Link>
        <Link
          to="/add-post"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Add Posts
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
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <Link
              to="/all-posts"
              className="text-muted-foreground hover:text-foreground"
            >
              Posts
            </Link>
            <Link
              to="/add-post"
              className="text-muted-foreground hover:text-foreground"
            >
              Add Post
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <SearchForm />
        {isAuthenticated ? (
          <ProfileButton />
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
