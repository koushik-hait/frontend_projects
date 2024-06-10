import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import RTE from "../editor/RTE";
import { useToast } from "@/components/ui/use-toast";
import { expressApi } from "@/lib/axios-conf";
import { useAuthStore } from "@/lib/store/authStore";
import { commentSchema, CommentType } from "@/types/schema/video";
import RichTextEditor from "../editor/RichTextEditor";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

type CommentFormProps = {
  pid: string;
};

const CommentForm: React.FC<CommentFormProps> = ({ pid }) => {
  const { user, isAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const form = useForm<CommentType>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      postId: pid,
      author: user?._id,
    },
  });

  const onSubmit = async (values: CommentType) => {
    try {
      const data = {
        content: JSON.stringify(values.content),
        postId: pid,
        author: user?._id,
      };
      const response = await expressApi.post("/blog/comment/create", data);
      if (response.status == 201) {
        toast({
          variant: "default",
          title: "Comment successful",
          description: response.data.message,
        });
        form.reset();
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-col w-full py-4 mx-auto bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage
            className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
            src={user?.avatar.url}
            alt="@avatar"
          />
          <AvatarFallback>{user?.username[1]}</AvatarFallback>
        </Avatar>
        <div className="flex-col w-full mt-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* <RTE
                label="Comment :"
                name="content"
                control={form.control}
                defaultValue={form.getValues("content")}
              /> */}

              <RichTextEditor
                label="Comment: "
                name="content"
                control={form.control}
                defaultValue={form.getValues("content")}
                disabled={!isAuthenticated}
              />

              {form.formState.isSubmitting ? (
                <Button type="button">
                  {" "}
                  Commenting...{" "}
                  <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
                </Button>
              ) : (
                <Button type="submit" disabled={!isAuthenticated}>
                  Submit
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
