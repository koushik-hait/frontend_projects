import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
// import Header from "./components/layout/Header";
import HeaderX from "./components/layout/HeaderX";

const App = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col dark">
        {/* <Header /> */}
        <HeaderX />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
