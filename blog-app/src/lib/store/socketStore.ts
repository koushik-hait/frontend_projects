// src/store/socketStore.ts

import socketio, { Socket } from "socket.io-client";
import { create } from "zustand";
import { toast } from "@/hooks/use-toast";
import { LocalStore } from "../utils";
// import { persist } from "zustand/middleware";
const MAX_NOTIFICATIONS = 50; // Adjust this number as needed
// Define the store state type
type SocketStore = {
  socket: Socket | null;
  isConnected: boolean;
  connectSocket: () => void;
  disconnectSocket: () => void;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  getFilteredNotifications: (type?: Notification["type"]) => Notification[];
};

export type Notification = {
  id: string;
  type: "like" | "dislike" | "follow" | "unfollow" | "bookmark";
  message: string;
  timestamp: Date;
  read: boolean;
};

// Function to establish a socket connection with authorization token
const createSocket = (): Socket => {
  const token = LocalStore.get("token");
  return socketio(import.meta.env.VITE_SOCKET_URI, {
    withCredentials: true,
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
  });
};

// Create the Zustand store
const useSocketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications].slice(
        0,
        MAX_NOTIFICATIONS
      ),
    })),
  markNotificationAsRead: (id: string) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  getFilteredNotifications: (type?: Notification["type"]) => {
    const { notifications } = get();
    return type ? notifications.filter((n) => n.type === type) : notifications;
  },
  connectSocket: () => {
    const { socket, isConnected } = get();
    if (socket && isConnected) return; // Don't connect if already connected

    const newSocket = createSocket();

    newSocket.on("connect", () => {
      console.log("Socket connected");
      set({ isConnected: true });
      toast({ variant: "default", title: "Socket connected!" });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      set({ isConnected: false });
      toast({ variant: "default", title: "Socket disconnected!" });
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      toast({
        variant: "destructive",
        title: "Connection error",
        description: error.message,
      });
    });

    newSocket.on("notification", ({ type, message, timestamp }) => {
      console.log("Received notification:", type, message, timestamp);
      get().addNotification({
        id: Date.now().toString(),
        type: type,
        message: message,
        timestamp: timestamp,
        read: false,
      });
      toast({
        variant: "default",
        title: `${type} notification received`,
        description: message,
      });
    });

    // Add other event listeners here
    // newSocket.on("notification", (data) => {
    //   console.log("Received notification:", data);
    //   toast({ variant: "default", title: data.message });
    // });

    set({ socket: newSocket });
  },
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      // Remove all listeners to prevent memory leaks
      socket.removeAllListeners();
      socket.disconnect();
      set({ socket: null, isConnected: false });
      toast({ variant: "default", title: "Socket disconnected" });
    }
  },
}));

export default useSocketStore;
