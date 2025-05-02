import { z } from "zod";

export const SignUpFormValidation =
  z.object({
    name:
      z.string()
        .nonempty({ message: "Name is required" })
        .min(2, { message: "Name must be at least 2 characters." })
        .max(100, { message: "Name can't be bigger than 60 characters" })
        .trim(),
    username:
      z.string()
        .nonempty({ message: "Username is required" })
        .min(6, { message: "Username must be at least 6 characters." })
        .max(60, { message: "Username can't be bigger than 60 characters" })
        .trim(),
    email: z.string().email({ message: "Invalid Email Address" }).nonempty(),
    password:
      z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, { message: "Must include a lowercase letter" })
        .regex(/[A-Z]/, { message: "Must include an uppercase letter" })
        .regex(/[0-9]/, { message: "Must include a number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Must include a special character" }),
    confirmPassword: z.string().nonempty()
  })
    .required({
      email: true,
      password: true,
      name: true,
      username: true,
      confirmPassword: true,
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    })


export const SignInFormValidation = z.object({
  email: z.string().nonempty().email({ message: "Please enter a valid email" }),
  password: z.string().min(8).nonempty()
}).required(
  { email: true, password: true }
)


export const PostFormValidation = z.object({
  file: z.custom<File[]>().optional(),
  caption: z.string().min(5).max(2002).optional(),
  location: z.string().min(2).max(1000).optional(),
  tags: z.string().optional()
})