import useSocketStore from "@/lib/store/socketStore";
import { useEffect, useState } from "react";
import { Toaster } from "../ui/toaster";
import { Button } from "../ui/button";
import { BellRing } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Notification as NotificationType } from "@/lib/store/socketStore";
import { format } from "date-fns";

export const Notification = () => {
  const {
    socket,
    notifications,
    connectSocket,
    disconnectSocket,
    markNotificationAsRead,
    getFilteredNotifications,
  } = useSocketStore();
  const [filter, setFilter] = useState<NotificationType["type"] | undefined>(
    undefined
  );

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" className="relative">
            <BellRing color="#0e622e" />
            <Badge variant="destructive">{notifications.length}</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-120">
          <DropdownMenuLabel>
            {notifications.length === 0
              ? "You have no new notifications"
              : "My Notifications"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {notifications.map((notification) => (
            <>
              <DropdownMenuItem
                key={notification.id}
                style={{ opacity: notification.read ? 0.5 : 1 }}
              >
                {notification.message} -{" "}
                {format(notification.timestamp, "MMM dd, yyyy")} at{" "}
                {format(notification.timestamp, "h:mm a")}
              </DropdownMenuItem>
              {!notification.read && (
                <button onClick={() => markNotificationAsRead(notification.id)}>
                  Mark as read
                </button>
              )}
              <DropdownMenuSeparator />
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Toaster />
    </>
  );
};
