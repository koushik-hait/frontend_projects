import { Outlet } from "react-router-dom";
import Footer from "./components/layout/footer";
import HeaderX from "./components/layout/header";
import { Sidebar } from "./components/layout/sidebar";
// import { Notification } from "./components/layout/notification";
// import { Toaster } from "./components/ui/toaster";
// import { useEffect } from "react";
// import useSocketStore from "./lib/store/socketStore";

const App = () => {
  // const { socket, connectSocket, disconnectSocket } = useSocketStore();

  // useEffect(() => {
  //   connectSocket();

  //   return () => {
  //     disconnectSocket();
  //   };
  // }, [connectSocket, disconnectSocket]);
  return (
    <>
      <div className="w-full min-h-screen flex flex-col dark">
        <HeaderX />
        {/* <Toaster /> */}
        {/* <Notification /> */}
        <div className="flex flex-row">
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          <Sidebar key="sidebar" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
