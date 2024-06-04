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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(20, {
    message: "Video title must be at least 20 characters.",
  }),
  description: z.string().optional(),
  thumbnail: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "Thumbnail is required."),
  video: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "Video is required."),
  tags: z.array(z.string()).optional(),
  publishStatus: z.enum(["DRAFT", "PUBLISHED"]),
});

const UploadVideoForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined,
      video: undefined,
      tags: [],
      publishStatus: "DRAFT",
    },
  });

  const imageRef = form.register("thumbnail");
  const videoRef = form.register("video");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values.video[0], values.thumbnail[0]);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append(
        "description",
        values.description ? values.description : ""
      );
      formData.append("publishStatus", values.publishStatus);
      formData.append("thumbnail", values.thumbnail[0]);
      formData.append("video", values.video[0]);
      formData.append("tags", JSON.stringify(values.tags));
      const response = await expressApi.post("/video/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 200) {
        toast({
          description: "Video uploaded successfully",
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
              <FormLabel>Video Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="title" {...field} />
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
              <FormLabel>Video Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add video description here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Thumbnail</FormLabel>
              <FormControl>
                <Input type="file" placeholder="Thumbnail" {...imageRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video File</FormLabel>
              <FormControl>
                <Input type="file" placeholder="Video" {...videoRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publishStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Publish Status</FormLabel>
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
            Uploading...{" "}
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
          </Button>
        ) : (
          <Button type="submit">Upload Video</Button>
        )}
      </form>
    </Form>
  );
};

export default UploadVideoForm;
