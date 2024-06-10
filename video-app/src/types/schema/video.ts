import { z } from "zod";

export const uploadFormSchema = z.object({
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
  status: z.enum(["DRAFT", "PUBLIC", "PRIVATE"]),
  category: z.string(),
  showComments: z.enum(["YES", "NO"]),
});

export type UploadFormType = z.infer<typeof uploadFormSchema>;

export const commentSchema = z.object({
  content: z.string().min(1, { message: "Comment is required" }),
  postId: z.string(),
  author: z.string(),
});

export type CommentType = z.infer<typeof commentSchema>;
