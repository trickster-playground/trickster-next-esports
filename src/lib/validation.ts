import { z } from "zod";

const requiredString = z.string().trim().min(1, "This data is required.");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address."),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only alphabets, numbers, (-) and (_) allowed",
  ),
  password: requiredString.min(8, "Must be at lease 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type SignInValues = z.infer<typeof signInSchema>;

export const createPostSchema = z.object({
  content: requiredString,
  // mediaIds: z.array(z.string()).max(5, "Cannot have more than 5 attachments"),
});

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "Must be at most 1000 characters"),
});
