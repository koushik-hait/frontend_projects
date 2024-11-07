import { expressApi } from "@/lib/axios-conf";
import { IResponse, IPayload, IUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getAllUsers = async ({
  status = "published",
  tag = "",
  category = "",
  author = "",
  deleted = false,
  publishedAt = "",
  page = 1,
  limit = 100,
}) => {
  const { data } = await expressApi.get<IResponse<IPayload<IUser[]>>>(
    `/blog/admin/posts/all?status=${status}&tag=${tag}&author=${author}&category=${category}&deleted=${deleted}&publishedAt=${publishedAt}&page=${page}&limit=${limit}`
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
    publishedAt: "",
    page: 1,
    limit: 100,
  });
  const { data, error, isError, isPending } = useQuery({
    queryKey: ["admin-posts-all"],
    queryFn: async () => await getAllUsers(filter),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  console.log(data);

  return <div>All Posts</div>;
};

export default AllPosts;
