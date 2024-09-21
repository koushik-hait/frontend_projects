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
import { useToast } from "@/hooks/use-toast";
import { expressApi } from "@/lib/axios-conf";
import { Blog } from "@/types/index";
import { randomInt } from "crypto";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [visible, setVisible] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getAllBlogs = async () => {
    setLoader(true);
    setError(null);
    const response = await expressApi.get(`/blog/all?page=${page}&limit=10`);
    if (response?.status === 200) {
      toast({
        title: "All blog fetched successfully",
        description: "All blog fetched successfully",
        variant: "default",
      });
      const payload = response.data.data;
      setTotalItems(payload.totalItems);
      setVisible((prev) => prev + payload.data.length);
      setBlogs((prev) => [...new Set([...prev, ...payload.data])]);
      setLoader(false);
    } else if (response?.status === 404) {
      toast({
        title: "No blog found",
        description: "No blog found",
        variant: "destructive",
      });
      setLoader(false);
    } else {
      toast({
        title: "Something went wrong",
        description: "Something went wrong",
        variant: "destructive",
      });
      setError("Something went wrong");
      setLoader(false);
    }
  };

  const handleScroll = () => {
    const { innerHeight, scrollY } = window;
    const { scrollHeight } = document.documentElement;

    if (innerHeight + scrollY >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, [page]);

  useEffect(() => {
    visible < totalItems && totalItems > 0
      ? window.addEventListener("scroll", handleScroll)
      : window.removeEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visible]);

  return (
    <div className="w-full m-5 flex flex-col justify-center items-center gap-2">
      {error && <p className="text-red-500">{error}</p>}
      <div className="col-span-5">All Blogs</div>
      {loader && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
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
