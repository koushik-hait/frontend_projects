import CommentCard from "@/features/comment/comment-card";
import useSocketStore from "@/lib/store/socketStore";
import { IComment } from "@/types";
import { format } from "date-fns";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";

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
  console.log(comments);
  const { pid } = useParams();
  const { socket } = useSocketStore();
  const [comment, setComment] = useState<IComment[]>(comments);

  useEffect(() => {
    if (socket && socket!.connected) {
      socket?.emit("READING_POST", pid!);

      socket.on("NEW_COMMENT", (data) => {
        console.log(data.data);
        setComment(data.data);
      });
    }
    return () => {
      socket?.off("NEW_COMMENT", (data) => {
        setComment(data.data);
      });
    };
  }, [socket]);

  useEffect(() => {
    setComment(comments);
  }, [comments]);
  return (
    <div className="flex-col w-full py-4 mx-auto mt-3  border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
      {isError && (
        <>
          <p>{error?.message}</p>
        </>
      )}

      {isPending ? (
        <div className="flex flex-row md-10 mt-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-col mt-1">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ) : (
        comment?.map((comment: IComment) => {
          return (
            <>
              <CommentCard comment={comment} key={comment._id} />
            </>
          );
        })
      )}
    </div>
  );
};

export default PostComment;
