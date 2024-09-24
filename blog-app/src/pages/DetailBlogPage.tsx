import Comment from "@/components/comment/Comment";
import { Editor } from "@/components/editor/BlockNoteEditor";
import DeletePostBtn from "@/components/post/DeletePostBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { expressApi } from "@/lib/axios-conf";
import { useAuthStore } from "@/lib/store/authStore";
import { Blog } from "@/types";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailBlogPage = () => {
  const { pid } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const { user } = useAuthStore();
  // const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const isAuthor = blog && user ? blog.author[0]._id === user._id : false;

  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await expressApi.get(`/blog/reading/${pid}`);
      if (response?.status === 200) {
        setBlog(response.data.data[0]);
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

  // if (isAuthenticated) {
  //   setIsAuthor(user?._id === blog?.author);
  // }

  return (
    <>
      <div className="w-full flex justify-center items-center ">
        {loader && (
          <div className="w-[1080px] h-[720px] bg-[#3a3737] animate-pulse flex justify-center items-center text-9xl text-white">
            Loading...
          </div>
        )}
        {!loader && (
          <div className="w-7xl flex flex-col justify-center items-center gap-4 bg-[#3f3f3f]">
            <div className="w-7xl mx-5">
              <img
                src={blog?.coverImage}
                alt={blog?.title}
                className="w-full max-w-7xl"
                width={1080}
                height={720}
              />
              {isAuthor && (
                <div className="absolute right-20 top-20">
                  <Link to={`/edit-post/${blog?._id}`}>
                    <Button className="mr-3 bg-green-500">Edit</Button>
                  </Link>
                  <DeletePostBtn pid={blog?._id!} />
                </div>
              )}
            </div>
            <div className="flex flex-row gap-3  items-start">
              <Avatar>
                <AvatarImage
                  className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                  src={blog?.author[0].avatar.url}
                  alt="@avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <p className="text-slate-100">{blog?.author[0].username}</p>
                <p className="text-slate-100">
                  Posted on {new Date(blog?.createdAt!).toDateString()}
                </p>
              </div>
            </div>
            <h1 className="w-full text-slate-100 text-5xl text-center my-4 text-balance">
              {blog?.title}
            </h1>
            <div className="w-full max-w-7xl ">
              <Editor
                initialContent={blog?.content}
                editable={false}
                onChange={() => {}}
              />
            </div>
          </div>
        )}
      </div>
      <Comment pid={pid!} />
    </>
  );
};

export default DetailBlogPage;
