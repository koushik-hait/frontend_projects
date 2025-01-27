import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import NotFound from "./pages/404.tsx";
import AllBlogs from "./pages/blog/AllBlogs.tsx";
import DetailBlogPage from "./pages/blog/DetailBlogPage.tsx";
import EditBlogPage from "./pages/blog/EditBlogPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import NewBlog from "./features/post/components/NewBlog.tsx";
import ProfilePage from "./pages/auth/profile-page.tsx";
import Search from "./pages/Search.tsx";
import SignupPage from "./pages/auth/SignupPage.tsx";
import ErrorBoundary from "./components/Error.tsx";
import { ErrorElement } from "./components/error-element.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ForgotPassword from "./pages/auth/forgot-password.tsx";
import ResetPassword from "./pages/auth/reset-password.tsx";
import VerifyEmail from "./pages/auth/verify-email.tsx";
import { Dashboard } from "./features/admin/pages/dashboard.tsx";
import AdminApp from "./features/admin/admin-app.tsx";
import { AllUsers } from "./features/admin/pages/all-users.tsx";
import AllPosts from "./features/admin/pages/AllPosts.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "all-posts",
        element: <AllBlogs />,
      },
      {
        path: "add-post",
        element: <NewBlog />,
      },
      {
        path: "edit-post/:pid",
        element: <EditBlogPage />,
      },
      {
        path: "post/:pid",
        element: <DetailBlogPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
        errorElement: <ErrorElement />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdminApp />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "posts",
        element: <AllPosts />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "reset-password/:resetPasswordToken",
    element: <ResetPassword />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
