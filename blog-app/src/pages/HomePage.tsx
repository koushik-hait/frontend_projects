import AllBlogs from "./blog/AllBlogs";
import WithAuth from "@/components/WithAuth";

const HomePage = () => {
  return (
    <div>
      <AllBlogs />
    </div>
  );
};

export default WithAuth(HomePage);
