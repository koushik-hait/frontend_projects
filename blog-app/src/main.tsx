import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import NotFound from "./pages/404.tsx";
import AllBlogs from "./pages/AllBlogs.tsx";
import DetailBlogPage from "./pages/DetailBlogPage.tsx";
import EditBlogPage from "./pages/EditBlogPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NewBlog from "./pages/NewBlog.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SignupPage from "./pages/SignupPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/all-posts",
        element: <AllBlogs />,
      },
      {
        path: "/add-post",
        element: <NewBlog />,
      },
      {
        path: "/edit-post/:pid",
        element: <EditBlogPage />,
      },
      {
        path: "/post/:pid",
        element: <DetailBlogPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
