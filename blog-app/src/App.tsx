import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout";
import NotFound from "./pages/404";
// import AllBlogs from "./pages/AllBlogs";
import DetailBlogPage from "./pages/DetailBlogPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewBlog from "./pages/NewBlog";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="profile" element={<ProfilePage />} />
      {/* <Route path="all-blogs" element={<AllBlogs />} /> */}
      <Route path="new-blog" element={<NewBlog />} />
      <Route path="blog/reading/:bid" element={<DetailBlogPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => <AppRoutes />;

export default App;
