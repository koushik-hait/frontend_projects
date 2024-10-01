import { IComment } from "@/types";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns";
import CommentCard from "@/components/comment/comment-card";

type CommentProps = {
  pid: string;
  comments: IComment[];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
};

const PostComment: React.FC<CommentProps> = ({
  comments,
  isPending,
  isError,
  error,
}) => {
  const { pid } = useParams();
  return (
    <div className="flex-col w-full py-4 mx-auto mt-3  border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
      {isPending ? (
        <div className="flex flex-row md-10 mt-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-col mt-1">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ) : (
        comments.map((comment: IComment) => {
          return (
            <>
              <CommentCard comment={comment} key={comment._id} />
              {/* <div className="flex flex-row md-10 mt-2" key={comment._id}>
              <Avatar>
                <AvatarImage
                  className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                  src={comment?.author[0]?.avatar.url}
                  alt="avatar"
                />
                <AvatarFallback>
                  <div className="w-12 h-12 border-2 rounded-full flex items-center justify-center">
                    {comment.author[0].username.substring(0, 2).toUpperCase()}
                  </div>
                </AvatarFallback>
              </Avatar>
              <div className="flex-col mt-1">
                <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                  {comment.author[0].username}
                  <span className="ml-2 text-xs font-normal ">
                    {format(comment.createdAt, "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose ">
                  <div className="browser-css">
                    {parse(JSON.parse(comment.content))}
                  </div>
                </div>
              </div>
            </div> */}
            </>
          );
        })
      )}
    </div>
  );
};

export default PostComment;
