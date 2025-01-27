import { expressApi } from "@/lib/axios-conf";
import { IResponse, IPayload, IUser, Blog } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { format } from "date-fns";
import Table from "../components/table";
import CustomFilter from "../components/custom-filter";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { SortApiModule } from "node_modules/@ag-grid-community/core/dist/types/src/api/apiModule";

type TBlog = Blog & {
  author: IUser;
  status: string;
  category: string;
  tags: string[];
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

const getAllPosts = async ({
  status = "PUBLISHED",
  tag = "",
  category = "",
  author = "",
  deleted = false,
  publishedAt = {
    from: "",
    to: "",
  },
  page = 1,
  limit = 100,
  sortBy = "createdAt",
  sortDirection = "desc",
}) => {
  const { data } = await expressApi.get<IResponse<IPayload<TBlog[]>>>(
    `/blog/admin/posts/all?status=${status}&tag=${tag}&author=${author}&category=${category}&deleted=${deleted}&publishedFrom=${publishedAt.from}&publishedTo=${publishedAt.to}&sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}&limit=${limit}`
  );
  return data.data;
};

const AllPosts = () => {
  const [filter, setFilter] = useState({
    status: "PUBLISHED",
    tag: "",
    category: "",
    author: "",
    deleted: false,
    publishedAt: {
      from: "",
      to: "",
    },
    page: 1,
    limit: 100,
    sortBy: "createdAt",
    sortDirection: "desc",
  });
  const {
    data: posts,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["admin-posts-all", filter],
    queryFn: async () => await getAllPosts(filter),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  // console.log(posts);

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page });
    console.log(page);
  };

  const handleLimitChange = (limit: number) => {
    setFilter({ ...filter, limit });
    console.log(limit);
  };

  return (
    <>
      {isPending && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
      {posts && (
        <div>
          <CustomFilter filter={filter} setFilter={setFilter} />
          <Table
            colDefs={[
              { header: "ID", key: "_id" },
              {
                header: "Cover Image",
                key: "coverImage",
                render: (value) => (
                  <img
                    src={value}
                    alt="Cover Image"
                    style={{ width: "100px" }}
                  />
                ),
              },
              { header: "Title", key: "title", style: { width: "300px" } },
              { header: "Status", key: "status" },
              {
                header: "Author",
                key: "author",
                sortable: true,
                render: (value: IUser) => <strong>{value?.username}</strong>,
              },
              { header: "Category", key: "category" },
              {
                header: "Tags",
                key: "tags",
                formatter: (value) => {
                  if (Array.isArray(value)) return value.join(", ");
                  else return "N/A";
                },
              },
              {
                header: "Deleted",
                key: "deleted",
                formatter: (value: boolean) => (value == true ? "Yes" : "No"),
              },
              {
                header: "Created At",
                key: "createdAt",
                render: (value: string) => (
                  <strong>{format(value, "PPpp")}</strong>
                ),
              },
              {
                header: "Updated At",
                key: "updatedAt",
                render: (value: string) => (
                  <strong>{format(value, "PPpp")}</strong>
                ),
              },
            ]}
            data={posts.data}
          />

          <div className="w-full flex flex-col md:flex-row justify-between">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="w-1/2 flex flex-col md:flex-row items-center space-x-2 text-xs">
                <div className="w-50">
                  <Select
                    onValueChange={(e) =>
                      handleLimitChange(parseInt(e) ? parseInt(e) : 100)
                    }
                    defaultValue={`${filter.limit}`}
                  >
                    <SelectTrigger>
                      <ChevronDown />
                      <SelectValue placeholder="Items" />
                    </SelectTrigger>
                    <SelectContent className="w-32">
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="250">250</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <p className="text-gray-500 mt-4 lg:mt-0">
                  {`Showing ${posts.serialNumberStartFrom} to ${
                    posts.serialNumberStartFrom + (posts.limit - 1)
                  } of ${posts.totalItems} entires`}
                </p>
              </div>

              <nav className="flex justify-center items-center text-gray-100 mt-8 lg:mt-0">
                <Button
                  onClick={() => handlePageChange(posts.page - 1)}
                  className={`p-2 mr-4 rounded hover:bg-gray-700 ${
                    posts.hasPrevPage ? "" : "disabled:opacity-50"
                  }`}
                >
                  <ChevronLeft />
                </Button>
                {Array.from({
                  length: posts.totalPages < 5 ? posts.totalPages : 5,
                }).map((_, index) => (
                  <Button
                    onClick={() => handlePageChange(index + 1)}
                    key={index}
                    className={`px-4 py-2 rounded hover:bg-gray-700 ${
                      index + 1 === posts.page ? "bg-gray-700" : ""
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}
                <p>....</p>
                <Button
                  onClick={() => handlePageChange(posts.page + 1)}
                  className={`p-2 ml-4 rounded hover:bg-gray-700 ${
                    posts.hasNextPage ? "" : "disabled:opacity-50"
                  }`}
                >
                  <ChevronRight />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllPosts;
