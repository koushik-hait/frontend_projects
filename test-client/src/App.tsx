import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout";
import NotFound from "./pages/404";
import AllBlogs from "./pages/AllBlogs";
import AllVideoPage from "./pages/AllVideoPage";
import AskAi from "./pages/AskAi";
import Cancel from "./pages/Cancel";
import DetailBlogPage from "./pages/DetailBlogPage";
import DetailVideoPage from "./pages/DetailVideoPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewBlog from "./pages/NewBlog";
import Pricing from "./pages/Pricing";
import ProfilePage from "./pages/ProfilePage";
import ShopingCart from "./pages/ShopingCart";
import SignupPage from "./pages/SignupPage";
import Success from "./pages/Success";
import UploadVideoPage from "./pages/UploadVideoPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="all-videos" element={<AllVideoPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="upload-video" element={<UploadVideoPage />} />
      <Route path="watch/:vid" element={<DetailVideoPage />} />
      <Route path="all-blogs" element={<AllBlogs />} />
      <Route path="new-blog" element={<NewBlog />} />
      <Route path="blog/reading/:bid" element={<DetailBlogPage />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="success" element={<Success />} />
      <Route path="cancel" element={<Cancel />} />
      <Route path="cart" element={<ShopingCart />} />
      <Route path="ask-ai" element={<AskAi />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => <AppRoutes />;

export default App;
