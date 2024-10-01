import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(20, {
    message: "Blog title must be at least 20 characters.",
  }),
  content: z.string().optional(),
  description: z.string().optional(),
  coverPhoto: z
    .instanceof(FileList)
    .refine((file) => file?.length == 1, "CoverPhoto Photo is required."),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type blogType = z.infer<typeof blogSchema>;

export const commentSchema = z.object({
  content: z.string().min(1, { message: "Comment is required" }),
  postId: z.string(),
  author: z.string(),
});

export type CommentType = z.infer<typeof commentSchema>;
