import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { expressApi } from "@/lib/axios-conf";
import { Blog } from "@/types/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    setLoader(true);
    (async () => {
      const response = await expressApi.get("/blog/all-blog");
      if (response?.status === 200) {
        console.log("All blog fetched successfully");
        const res = response.data;
        setBlogs(res.data);
        setLoader(false);
      } else if (response?.status === 404) {
        console.log("No blog found");
        setLoader(false);
      } else {
        console.log("Something went wrong");
        setLoader(false);
      }
    })();
  }, []);
  return (
    <div className="w-full m-5 flex flex-col justify-center items-center gap-2">
      <div className="col-span-5">All Blogs</div>
      {loader && <div>Loading...</div>}
      <div className="grid grid-cols-3 gap-3 max-w-7xl">
        {!loader &&
          blogs.map((blog) => {
            return (
              <Link to={`/blog/reading/${blog._id}`} key={blog._id}>
                <Card className="w-96 bg-base-100 shadow-xl text-white">
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                    <CardDescription>{blog.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img src={blog.coverImage} alt={blog.title} />
                  </CardContent>
                  <CardFooter>{blog.publishStatus}</CardFooter>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default AllBlogs;
