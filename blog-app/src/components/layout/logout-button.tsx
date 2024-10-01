import { logoutUser } from "@/apis/user";
import { useAuthStore } from "@/lib/store/authStore";
import { RiShutDownLine } from "react-icons/ri";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const LogoutButton = () => {
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
    <Button onClick={handleLogout}>
      <RiShutDownLine />
    </Button>
  );
};

export default LogoutButton;
