import { UseQueryResult } from "@tanstack/react-query";
import CommentForm from "../forms/CommentForm";
import PostComment from "./PostComment";
import { IPayload, IComment } from "@/types";
import { useParams } from "react-router-dom";

type CommentProps = {
  comments: UseQueryResult<IPayload<IComment[]>, Error>;
  pid: string;
};

export const Comment: React.FC<CommentProps> = ({ comments, pid }) => {
  const { data, error, isPending, isError } = comments;
  return (
    <section className="relative flex items-center justify-center antialiased min-w-7xl">
      <div className="container px-0 mx-auto sm:px-5">
        <CommentForm pid={pid!} />
        <PostComment
          pid={pid}
          comments={data?.data as IComment[]}
          isError={isError}
          error={error}
          isPending={isPending}
        />
      </div>
    </section>
  );
};
