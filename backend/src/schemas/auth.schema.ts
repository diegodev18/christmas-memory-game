import { z } from "zod";

export const LoginBodySchema = z.object({
  password: z.string().min(1, "Password is required"),
  user_name: z
    .string()
    .min(1, "Username is required")
    .transform((val) => val.trim().toLowerCase()),
});

export const RegisterBodySchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(64, { message: "Password cannot exceed 64 characters." })
    .refine((val) => /[a-z]/.test(val), {
      message: "Must contain at least one lowercase letter.",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Must contain at least one uppercase letter.",
    })
    .refine((val) => /\d/.test(val), {
      message: "Must contain at least one number.",
    })
    .refine((val) => /[!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]/.test(val), {
      message: "Must contain at least one special character.",
    }),
  user_name: z
    .string()
    .min(1, "Username is required")
    .transform((val) => val.trim().toLowerCase()),
});
