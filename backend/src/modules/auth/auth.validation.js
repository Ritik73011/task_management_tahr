import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters.")
      .max(100, "Name cannot exceed 100 characters."),

    email: z.string().trim().email("Please enter a valid email address."),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(100, "Password cannot exceed 100 characters."),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Please enter a valid email address."),

    password: z.string().min(1, "Password is required."),
  }),
});
