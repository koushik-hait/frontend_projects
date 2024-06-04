import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
      const response = await expressApi.get("/blog/all");
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
      {loader && (
        <div className="grid grid-cols-3 gap-3 max-w-7xl">
          {Array.from({ length: 9 }).map((_, index) => (
            <Card className="w-96 bg-base-100 shadow-xl text-white" key={index}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-4 w-[250px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[150px] w-[250px]" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-[250px]" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <div className="grid grid-cols-3 gap-3 max-w-7xl">
        {!loader &&
          blogs.map((blog) => {
            return (
              <Link to={`/blog/reading/${blog._id}`} key={blog._id}>
                <Card className="w-96 h-56 bg-base-100 shadow-xl text-white text-balance overflow-hidden">
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                    <CardDescription>{blog.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      className="w-[250px] h-[150px] object-cover "
                      src={blog.coverImage}
                      alt={blog.title}
                    />
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
