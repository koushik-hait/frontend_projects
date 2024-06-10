import { expressApi } from "@/lib/axios-conf";
import { type Comment } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

const PostComment = () => {
  const { pid } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await expressApi.get(`/blog/comment/all/${pid}`);
      if (response?.status === 200) {
        setComments(response.data.data);
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
    <div className="flex-col w-full py-4 mx-auto mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
      {loader ? (
        <div className="flex flex-row md-10 mt-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-col mt-1">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ) : (
        comments.map((comment: Comment) => {
          return (
            <div className="flex flex-row md-10 mt-2" key={comment._id}>
              <Avatar>
                <AvatarImage
                  className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                  src={comment.author.avatar.url}
                  alt="avatar"
                />
                <AvatarFallback>{comment.author.username[1]}</AvatarFallback>
              </Avatar>
              <div className="flex-col mt-1">
                <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                  {comment.author.username}
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    {new Date(comment.createdAt).toDateString()}
                  </span>
                </div>
                <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                  <div className="browser-css">
                    {parse(JSON.parse(comment.content))}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PostComment;
