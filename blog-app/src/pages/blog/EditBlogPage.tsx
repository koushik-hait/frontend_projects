import BlogForm from "@/features/post/forms/BlogForm";
import { expressApi } from "@/lib/axios-conf";
import { Blog } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditBlogPage = () => {
  const { pid } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await expressApi.get(`/blog/reading/${pid}`);
      if (response?.status === 200) {
        setBlog(response.data.data);
        setLoader(false);
      } else if (response?.status === 404) {
        console.log("No blog found");
        setLoader(false);
      } else {
        console.log("Something went wrong");
        setLoader(false);
      }
    })();
  }, [pid]);
  return (
    <div className="py-8">
      <div className="w-full max-w-7xl mx-auto px-4 text-white">
        {loader && (
          <div className="w-[1080px] h-[720px] bg-[#3a3737] animate-pulse flex justify-center items-center text-9xl text-white">
            Loading...
          </div>
        )}
        {blog && <BlogForm blog={blog} />}
      </div>
    </div>
  );
};

export default EditBlogPage;
