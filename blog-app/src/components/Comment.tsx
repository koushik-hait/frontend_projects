import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import CommentForm from "./forms/CommentForm";

const Comment = () => {
  return (
    <section className="relative flex items-center justify-center antialiased bg-white dark:bg-slate-900 min-w-7xl">
      <div className="container px-0 mx-auto sm:px-5">
        <CommentForm />

        <div className="flex-col w-full py-4 mx-auto mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
          <div className="flex flex-row md-10">
            <Avatar>
              <AvatarImage
                className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-col mt-1">
              <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                Anonymous
                <span className="ml-2 text-xs font-normal text-gray-500">
                  3 days ago
                </span>
              </div>
              <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                Very cool! I'll have to learn more about Tailwind.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
