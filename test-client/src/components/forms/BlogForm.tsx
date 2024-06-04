import { Editor } from "@/components/editor/BlockNoteEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { expressApi } from "@/lib/axios-conf";
import { PartialBlock } from "@blocknote/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { string, z } from "zod";
import { Label } from "../ui/label";
import TagsInput from "../ui/tags-input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(20, {
    message: "Blog title must be at least 20 characters.",
  }),
  content: z.string().optional(),
  description: z.string().optional(),
  coverPhoto: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "CoverPhoto Photo is required."),
  tags: z.array(z.string()).optional(),
  publishStatus: z.enum(["DRAFT", "PUBLISHED"]),
});

const BlogForm = () => {
  const [contentStr, setContentStr] = useState<string>("");
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      coverPhoto: undefined,
      tags: [],
      publishStatus: "DRAFT",
    },
  });

  const imageRef = form.register("coverPhoto");

  const onchange = (content: string) => {
    console.log(content);
    setContentStr(content);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", contentStr);
      formData.append(
        "description",
        values.description ? values.description : ""
      );
      formData.append("publishStatus", values.publishStatus);
      formData.append("coverPhoto", values.coverPhoto[0]);
      formData.append("tags", JSON.stringify(values.tags));
      const response = await expressApi.post("/blog/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 200) {
        toast({
          content: "Blog created successfully",
        });
        form.reset();
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverPhoto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Cover Photo</FormLabel>
              <FormControl>
                <Input type="file" placeholder="Cover Photo" {...imageRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add Blog description here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Editor onChange={onchange} editable={true} />

        {/* <Label>Add Blogs Tags Here</Label> */}
        <TagsInput />

        <FormField
          control={form.control}
          name="publishStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Publish Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Publish Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Publish</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.isSubmitting ? (
          <Button type="button">
            {" "}
            Creating...{" "}
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
          </Button>
        ) : (
          <Button type="submit">Publish Blog</Button>
        )}
      </form>
    </Form>
  );
};

export default BlogForm;
