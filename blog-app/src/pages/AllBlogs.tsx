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
import { randomInt } from "crypto";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoader(true);
    }
  };

  useEffect(() => {
    setLoader(true);
    (async () => {
      const response = await expressApi.get(`/blog/all?page=${page}&limit=10`);
      if (response?.status === 200) {
        console.log("All blog fetched successfully");
        const payload = response.data.data;
        setBlogs((prev) => [...new Set([...prev, ...payload.data])]);
        setLoader(false);
      } else if (response?.status === 404) {
        console.log("No blog found");
        setLoader(false);
      } else {
        console.log("Something went wrong");
        setLoader(false);
      }
    })();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (loader) handleLoadMore();
  }, [loader]);

  const debounce: any = (func: (...args: any) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return function (...args: any) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  window.addEventListener("scroll", debounce(handleScroll, 500));

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
            blogs.map((blog, i) => {
              return <PostCard post={blog} key={blog._id + i} />;
            })}
        </div>
      </section>
    </div>
  );
};

export default AllBlogs;
