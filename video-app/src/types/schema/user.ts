import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Email is invalid." }),
  password: z.string().min(8, { message: "Password is required." }),
  role: z.string().optional(),
  //   avater: z.instanceof(FileList).optional(),
});

export type registerType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .optional(),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Email is invalid." })
    .optional(),
  password: z.string().min(1, { message: "Password is required." }),
});

export type loginType = z.infer<typeof loginSchema>;
