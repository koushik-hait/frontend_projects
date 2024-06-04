import { getAllCategories } from "@/apis/blog";
import { Editor } from "@/components/editor/BlockNoteEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Category } from "@/types";
import { blogSchema, blogType } from "@/types/schema/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import TagsInput from "../ui/tags-input";
import { Textarea } from "../ui/textarea";

const BlogForm = () => {
  const [contentStr, setContentStr] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();
  const form = useForm<blogType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      coverPhoto: undefined,
      tags: [],
      category: "",
      author: "",
      publishStatus: "DRAFT",
    },
  });

  useEffect(() => {
    (async () => {
      const response = await getAllCategories();
      if (response.status == 200) {
        setCategories(response.data.data);
      }
    })();
  }, []);

  const imageRef = form.register("coverPhoto");

  const onchange = (content: string) => {
    console.log(content);
    setContentStr(content);
  };

  const handleTagsChange = (tags: string[]) => {
    form.setValue("tags", tags);

    console.log(tags);
  };

  const onSubmit = async (values: blogType) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", contentStr);
      formData.append(
        "description",
        values.description ? values.description : ""
      );
      formData.append("status", values.publishStatus);
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
        <TagsInput
          initialValue={["#JavaScript", "#Python"]}
          onTagsChange={handleTagsChange}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blog category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishStatus"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select Publish Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="DRAFT" />
                    </FormControl>
                    <FormLabel className="font-normal">Draft</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="PUBLISHED" />
                    </FormControl>
                    <FormLabel className="font-normal">Publish</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
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
