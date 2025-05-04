import { z } from "zod"

import { PASSWORDLENGTH } from "~/lib/constants"

const signUpSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(PASSWORDLENGTH.MIN).max(PASSWORDLENGTH.MAX),
}).strict();

const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(PASSWORDLENGTH.MIN).max(PASSWORDLENGTH.MAX),
}).strict();


export { signUpSchema, logInSchema };

export type SignUpSchema = z.infer<typeof signUpSchema>;