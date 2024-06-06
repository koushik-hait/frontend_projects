import CommentForm from "../forms/CommentForm";
import PostComment from "./PostComment";

type CommentProps = {
  pid: string;
};

const Comment: React.FC<CommentProps> = ({ pid }) => {
  return (
    <section className="relative flex items-center justify-center antialiased bg-white dark:bg-slate-900 min-w-7xl">
      <div className="container px-0 mx-auto sm:px-5">
        <CommentForm pid={pid!} />
        <PostComment />
      </div>
    </section>
  );
};

export default Comment;
