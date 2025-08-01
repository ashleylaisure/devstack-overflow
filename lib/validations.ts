import {regex, z} from "zod"

export const SignInSchema = z.object({
    email: z
    .string()
    .min(1, {message: "Email is required"})
    .email({message: "Please Provide a Valid Email Address."}),

    password: z.string()
    .min(6, {message: "Password must be at least 6 characters."})
    .max(30, {message: "Password cannot exceed 30 characters."}),
})

export const SignUpSchema = z.object({
    username: z
    .string()
    .min(3, {message: "Username must be at least 3 characters."})
    .max(30, {message: "Username cannot exceed 30 characters."})
    .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores.",
    }),

    name: z
    .string()
    .min(1, {message: "Name is required"})
    .max(50, {message: "Name cannot exceed 50 characters."})
    .regex(/^[a-zA-Z\s]+$/, {
        message: "Name can only contain letters and spaces.",
    }),

    email: z
    .string()
    .min(1, {message: "Email is required"})
    .email({message: "Please Provide a Valid Email Address."}),

    password: z
    .string()
    .min(6, {message: "Password must be at least 6 characters long."})
    .max(30, {message: "Password cannot exceed 30 characters."})
    .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, {
        message: "Password must contain at least one number",
    })
    .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character",
    }),
});

export const AskQuestionSchema= z.object({
    title: z
        .string()
        .min(5, {message: "Title must be at least 5 characters long."})
        .max(100, {message: "Title cannot exceed 100 characters."}),
    content: z
        .string()
        .min(1, {message: "Body is required"}),
    tags: z
        .array(
            z.string()
            .min(1, {message: "Tag is required"})
            .max(20, {message: "Tag cannot exceed 20 characters."})
        )
        .min(1, {message: "At least one tag is required."})
        .max(3, {message: "A maximum of 3 tags is allowed."}),
})