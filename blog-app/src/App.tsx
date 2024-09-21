import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import HeaderX from "./components/layout/HeaderX";

const App = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col dark">
        <HeaderX />
        <Toaster />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
