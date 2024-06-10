import { getAllCategories } from "@/apis/video";
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
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { UploadFormType, uploadFormSchema } from "@/types/schema/video";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import TagsInput from "../ui/tags-input";
import { Textarea } from "../ui/textarea";

//TODO: upload video,
//details:-title, description, thumbnail, content-rating(age restriction), tags, language, category, show-comments on/off
// Other info:add-subtitle, add-ending, add-chapters
// visibility: publish-status, schedule-publishing

const UploadVideoForm = () => {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();
  const form = useForm<UploadFormType>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined,
      video: undefined,
      tags: [],
      status: "DRAFT",
      category: "",
      showComments: "YES",
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

  const imageRef = form.register("thumbnail");
  const videoRef = form.register("video");

  const handleTagsChange = (tags: string[]) => {
    form.setValue("tags", tags);
    // console.log(tags);
  };

  const onSubmit = async (values: UploadFormType) => {
    try {
      console.log(values.video[0], values.thumbnail[0]);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append(
        "description",
        values.description ? values.description : ""
      );
      formData.append("status", values.status);
      formData.append("thumbnail", values.thumbnail[0]);
      formData.append("video", values.video[0]);
      formData.append("category", values.category);
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
        <Progress className="w-full bg-orange-700" value={(step + 1) * 25} />
        <div className={step == 0 ? "block" : "hidden"}>
          <h1>Upload Video</h1>
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
        </div>
        <div className={step == 1 ? "block" : "hidden"}>
          <h1>Details Info</h1>
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
          <TagsInput initialValue={[]} onTagsChange={handleTagsChange} />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select video category" />
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
        </div>
        <div className={step == 2 ? "block" : "hidden"}>
          <h1>Other Info</h1>
          {/** TODO: Add subtitle and promotion related fields */}
        </div>
        <div className={step == 3 ? "block" : "hidden"}>
          <h1>Visibility</h1>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Visibility Option</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 text-white">
                      <FormControl>
                        <RadioGroupItem value="DRAFT" defaultChecked />
                      </FormControl>
                      <FormLabel className="font-normal">Draft</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="PUBLIC" />
                      </FormControl>
                      <FormLabel className="font-normal">Public</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="PRIVATE" />
                      </FormControl>
                      <FormLabel className="font-normal">Private</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="showComments"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select to Show comments</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 text-white">
                      <FormControl>
                        <RadioGroupItem value="YES" defaultChecked />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="NO" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.formState.isSubmitting ? (
          <Button type="button">
            {" "}
            Uploading...{" "}
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
          </Button>
        ) : (
          <>
            <Button
              type="button"
              disabled={step == 0}
              onClick={() => {
                setStep((currStep) => currStep - 1);
              }}
            >
              Prev
            </Button>
            <Button
              type={step == 3 ? "submit" : "button"}
              onClick={() => {
                if (step == 3) {
                  form.handleSubmit(onSubmit)();
                } else {
                  setStep((currStep) => currStep + 1);
                }
              }}
            >
              {step === 3 ? "Submit" : "Next"}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};

export default UploadVideoForm;
