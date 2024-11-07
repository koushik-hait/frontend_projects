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
import { Blog, Category, IPayload, IResponse } from "@/types";
import { blogSchema, blogType } from "@/types/schema/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import TagsInput from "../../../components/ui/tags-input";
import { Textarea } from "../../../components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { CustomImageUpload } from "../../../components/custom-image-upload";

const getAllCategories = async () => {
  const { data } = await expressApi.get<IResponse<IPayload<Category[]>>>(
    `/blog/category/all`
  );
  return data.data;
};

const BlogForm = ({ blog }: { blog?: Blog }) => {
  const {
    data: categories,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });
  console.log(categories);
  const [contentStr, setContentStr] = useState<string>("");
  const { toast } = useToast();
  const form = useForm<blogType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: blog?.title || "",
      content: "",
      description: blog?.description || "",
      coverPhoto: undefined,
      tags: blog?.tags || [],
      category: blog?.category || "",
      author: blog?.author.account._id || "",
      status: "DRAFT", //TODO: Add default publish status
    },
  });

  useEffect(() => {
    const handleTagsChange = (tags: string[]) => {
      form.setValue("tags", tags);
      // console.log(tags);
    };
  }, []);

  const imageRef = form.register("coverPhoto");

  const onchange = (content: string) => {
    console.log(content);
    setContentStr(content);
  };

  const handleTagsChange = (tags: string[]) => {
    form.setValue("tags", tags);
    // console.log(tags);
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
      formData.append("status", values.status);
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
              {/* <FormLabel>Blog Title</FormLabel> */}
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your post title"
                  className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0 focus:border-none placeholder-gray-300 placeholder-opacity-100 bg-transparent"
                  {...field}
                />
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
              {/* <FormLabel>Blog Cover Photo</FormLabel> */}
              <FormControl>
                <CustomImageUpload
                  onImageChange={field.onChange}
                  {...imageRef}
                />
                {/* <Input
                  type="file"
                  placeholder="Cover Photo"
                  className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0 focus:border-none placeholder-gray-300 placeholder-opacity-100 bg-transparent"
                  {...imageRef}
                /> */}
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
              {/* <FormLabel>Blog Description</FormLabel> */}
              <FormControl>
                <Textarea
                  className="w-full text-3xl font-bold border-none focus:outline-none focus:ring-0 focus:border-none placeholder-gray-300 placeholder-opacity-100 bg-transparent"
                  placeholder="Add Blog description here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Editor
          onChange={onchange}
          editable={true}
          initialContent={blog?.content || ""}
        />

        {/* <Label>Add Blogs Tags Here</Label> */}
        <TagsInput
          initialValue={blog?.tags || []}
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
                  {categories?.data.map((category) => (
                    <SelectItem
                      key={category._id}
                      value={`category-${category._id}`}
                    >
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
          name="status"
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
