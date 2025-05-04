import { z } from "zod"

const signUpSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
}).strict();

const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
}).strict();


export { signUpSchema, logInSchema };

export type SignUpSchema = z.infer<typeof signUpSchema>;