import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import NotFound from "./pages/404.tsx";
import AllVideosPage from "./pages/AllVideosPage.tsx";
import { Error } from "./pages/Error.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import UploadVideoPage from "./pages/UploadVideoPage.tsx";
import WatchVideoPage from "./pages/WatchVideoPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
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
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/upload-video",
        element: <UploadVideoPage />,
      },
      {
        path: "/all-videos",
        element: <AllVideosPage />,
      },
      {
        path: "/watch/:vid",
        element: <WatchVideoPage />,
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
