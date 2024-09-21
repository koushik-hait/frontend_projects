import CardSkeleton from "@/components/loader/CardSkeleton";
import PostCard from "@/components/post/PostCard";
import { useToast } from "@/components/ui/use-toast";
import { expressApi } from "@/lib/axios-conf";
import { Blog } from "@/types";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";

const Search = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [visible, setVisible] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const searchBlogs = async () => {
    try {
      setLoader(true);
      setError(null);
      const response = await expressApi.get(
        `/blog/search?q=${query}&page=${page}&limit=10`
      );
      if (response?.status === 200) {
        toast({
          title: "Search result's for " + query,
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
      } else if (response?.status === 500) {
        toast({
          title: "Something went wrong",
          description: "Something went wrong",
          variant: "destructive",
        });
        setError("Something went wrong");
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
    } catch (error) {
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
    searchBlogs();
  }, [page]);

  useEffect(() => {
    setBlogs([]);
    setVisible(0);
    setPage(1);
    setError(null);
    searchBlogs();
  }, [query]);

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
      {error && <div className="text-red-500">{error}</div>}
      <div className="col-span-5">Search Results for "{query}"</div>
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

export default Search;
