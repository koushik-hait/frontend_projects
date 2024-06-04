import { logoutUser } from "@/apis/user";
import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "@/lib/store/authStore";
import { Link, Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const MainLayout = () => {
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    const res = await logoutUser();

    console.log(res);
    if (res?.status == 200) {
      toast({
        variant: "default",
        title: "Logout successful",
        description: res.data.message,
      });
      logout();
    } else {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: res?.data.message,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <Link
            to={"/"}
            className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
          >
            home
          </Link>

          <Link
            to={"/all-videos"}
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            All Video
          </Link>

          <Link
            to={"/upload-video"}
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Upload Video
          </Link>
          <Link
            to={"/pricing"}
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Pricing
          </Link>
          <Link
            to={"/cart"}
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Shoping Cart
          </Link>
          <Link
            to={"/all-blogs"}
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            All Blogs
          </Link>

          <Link
            to={"/new-blog"}
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            New Blog
          </Link>
          <Link
            to={"/ask-ai"}
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Ask Ai
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to={"/profile"}
                className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
              >
                <Avatar>
                  <AvatarImage src={user?.avatar.url} alt="@avater" />
                  <AvatarFallback>{user?.username[0]}</AvatarFallback>
                </Avatar>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link
                to={"/login"}
                className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>

      <hr />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default MainLayout;
