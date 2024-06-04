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

import { useToast } from "@/components/ui/use-toast";
import { multipartHeaders, pythonFastApi } from "@/lib/axios-conf";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  text: z.string().min(10, {
    message: "Question must be at least 10 characters.",
  }),
  image: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "CoverPhoto Photo is required."),
});

const AskAiForm = () => {
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      image: undefined,
    },
  });

  const imageRef = form.register("image");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image[0]);
      const response = await pythonFastApi.post(
        `/aiml/ask/?text=${values.text}`,
        formData,
        {
          headers: multipartHeaders,
        }
      );
      console.log(response.data);
      if (response.status == 200) {
        setResult(response.data?.answer);
        toast({
          content: "Okk, Question asked successfully",
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
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Image upload"
                  {...imageRef}
                  onChange={(e) =>
                    setPreviewUrl(URL.createObjectURL(e.target.files![0]))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <img
          src={previewUrl}
          className="w-1/3 aspect-auto]"
          alt="Preview image"
        />

        <p className="text-md text-green-600">Result: {result}</p>

        {form.formState.isSubmitting ? (
          <Button type="button">
            {" "}
            Responding...{" "}
            <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
          </Button>
        ) : (
          <Button type="submit">Ask Question</Button>
        )}
      </form>
    </Form>
  );
};

export default AskAiForm;
