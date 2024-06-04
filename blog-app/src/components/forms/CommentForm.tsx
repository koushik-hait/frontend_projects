import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

const commentSchema = z.object({
  content: z.string().min(1, { message: "Comment is required" }),
});

const CommentForm = () => {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    console.log(values);
  };
  return (
    <div className="flex-col w-full py-4 mx-auto bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-2/3">
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage
            className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full"
            src="https://github.com/shadcn.png"
            alt="@avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-col w-full mt-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add Blog discussion here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.isSubmitting ? (
                <Button type="button">
                  {" "}
                  Commenting...{" "}
                  <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
                </Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
