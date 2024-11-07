import CardSkeleton from "@/components/loader/CardSkeleton";
import { expressApi } from "@/lib/axios-conf";
import { Blog, IPayload, IResponse } from "@/types";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BlogPostCard } from "@/features/post/components/post-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFilters } from "@/lib/store/filterStore";

const Search = () => {
  const { page, setPage, limit, setLimit } = useFilters();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const searchBlogs = async (pageParam: number, query: string) => {
    const { data } = await expressApi.get<IResponse<IPayload<Blog[]>>>(
      `/blog/search?q=${query}&page=${pageParam}&limit=${limit}`
    );
    return data.data;
  };
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["search"],
    queryFn: () => searchBlogs(page, query!),
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });

  const handleScroll = () => {
    const { innerHeight, scrollY } = window;
    const { scrollHeight } = document.documentElement;

    if (innerHeight + scrollY >= scrollHeight) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    data?.pages[0].hasNextPage
      ? window.addEventListener("scroll", handleScroll)
      : window.removeEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data?.pages[0].hasNextPage]);

  return (
    <div className="w-full m-5 flex flex-col justify-center items-center gap-2">
      {status === "pending" && <div>Loading...</div>}
      {status === "error" && (
        <div className="text-red-500">{error.message}</div>
      )}
      <div className="col-span-5">Search Results for "{query}"</div>
      {status === "success" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mt-12 mb-12">
          {data?.pages?.map((page, i) => (
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-8 mt-5">
              {page.data.map((blog) => (
                <BlogPostCard post={blog} key={blog._id + i} />
              ))}
            </div>
          ))}
        </section>
      )}
      <div className="flex justify-center items-center">
        {isFetchingNextPage ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="text-pretty text-4xl border-2 border-pretty px-4 py-2 rounded-md hover:bg-pretty hover:text-white hover:border-pretty"
          >
            Load More...
          </button>
        ) : (
          <div className="text-center text-pretty text-4xl">No more posts</div>
        )}
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};

export default Search;
