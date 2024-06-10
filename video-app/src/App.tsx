import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

const App = () => {
  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between bg-black">
        <div className="w-full block">
          <Header />
          {/* TODO: Add Sidebar */}
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
