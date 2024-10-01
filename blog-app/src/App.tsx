import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/footer";
import HeaderX from "./components/layout/header";
import { Sidebar } from "./components/layout/sidebar";

const App = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col dark">
        <HeaderX />
        <Toaster />
        <div className="flex flex-row">
          <main className="flex-1 p-6">
            <Outlet />
          </main>
          <Sidebar key="sidebar" topTopics={[]} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
