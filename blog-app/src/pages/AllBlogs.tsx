import CardSkeleton from "@/components/loader/CardSkeleton";
import PostCard from "@/components/post/PostCard";
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {Array.from({ length: 9 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      )}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-12 mb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {!loader &&
            blogs.map((blog) => {
              return (
                <Link to={`/post/${blog._id}`} key={blog._id}>
                  <PostCard post={blog} />
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default AllBlogs;
