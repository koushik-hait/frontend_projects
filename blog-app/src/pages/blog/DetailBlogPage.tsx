// import { Comment } from "@/components/comment/Comment";
import PostComment from "@/features/comment/PostComment";
import { Editor } from "@/components/editor/BlockNoteEditor";
import CommentForm from "@/features/comment/forms/CommentForm";
import DeletePostBtn from "@/features/post/components/DeletePostBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { expressApi } from "@/lib/axios-conf";
import { useAuthStore } from "@/lib/store/authStore";
import { Blog, IComment, IPayload, IResponse } from "@/types";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";

const DetailBlogPage = () => {
  const { pid } = useParams();
  const { user } = useAuthStore();

  const fetchBlogById = async (pid: string) => {
    const { data } = await expressApi.get<IResponse<IPayload<Blog[]>>>(
      `/blog/p/${pid}`
    );
    return data.data;
  };

  const fetchCommentByPostId = async (pid: string) => {
    const { data } = await expressApi.get<IResponse<IPayload<IComment[]>>>(
      `/blog/comment/p/${pid}`
    );
    return data.data;
  };

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["blog", pid],
    queryFn: async () => await fetchBlogById(pid!),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  const {
    data: comments,
    error: err,
    isError: iserror,
    isPending: ispending,
  } = useQuery({
    queryKey: ["comments", pid],
    queryFn: async () => await fetchCommentByPostId(pid!),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 7,
  });

  const isAuthor =
    data?.data[0] && user
      ? data?.data[0]?.author?.account?._id === user._id
      : false;

  return (
    <>
      <div className="w-full flex justify-center items-center ">
        {isPending && (
          <div className="w-[1080px] h-[720px] bg-[#3a3737] animate-pulse flex justify-center items-center text-9xl text-white">
            Loading...
          </div>
        )}
        {isError && (
          <div className="w-[1080px] h-[720px] bg-[#3a3737] animate-pulse flex justify-center items-center text-9xl text-white">
            Something went wrong : {error?.message}
          </div>
        )}
        {data?.data.map((post) => (
          <div
            key={post?._id}
            className="w-7xl flex flex-col justify-center items-center gap-4 bg-[#3f3f3f]"
          >
            <div className="w-7xl mx-5">
              <img
                src={post?.coverImage}
                alt={post?.title}
                className="w-full max-w-7xl"
                width={1080}
                height={720}
              />
              {isAuthor && (
                <div className="absolute right-20 top-20">
                  <Link to={`/edit-post/${post?._id}`}>
                    <Button className="mr-3 bg-green-500">Edit</Button>
                  </Link>
                  <DeletePostBtn pid={post?._id!} />
                </div>
              )}
            </div>
            <div className="flex flex-row gap-3  items-start">
              <Avatar>
                <AvatarImage
                  className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                  src={post?.author?.account?.avatar?.url}
                  alt="@avatar"
                />
                <AvatarFallback>
                  <div className="w-12 h-12 border-2 rounded-full flex items-center justify-center">
                    {post?.author?.account?.username
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <p className="text-slate-100">
                  {post?.author?.account?.username}
                </p>
                <p className="text-slate-100">
                  Posted on {format(new Date(post?.createdAt), "MMM d, yyyy")}
                </p>
              </div>
            </div>
            <h1 className="w-full text-slate-100 text-5xl text-center my-4 text-balance">
              {post?.title}
            </h1>
            <div className="w-full max-w-7xl ">
              <Editor
                initialContent={post?.content}
                editable={false}
                onChange={() => {}}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <Comment comments={commentResult} pid={pid!} /> */}
      <section className="relative flex items-center justify-center antialiased min-w-7xl">
        <div className="container px-0 mx-auto sm:px-5">
          <CommentForm pid={pid!} />
          <PostComment
            pid={pid!}
            comments={comments?.data! as IComment[]}
            isError={iserror}
            error={err}
            isPending={ispending}
          />
        </div>
      </section>
    </>
  );
};

export default DetailBlogPage;
