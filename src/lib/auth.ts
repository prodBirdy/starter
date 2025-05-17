import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "~/generated/prisma-client-js";
import { compare, genSalt, hash } from 'bcrypt-ts';
import { PASSWORDLENGTH , USERNAMELENGTH } from "~/lib/constants";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    rateLimit: {
        window: 10, // time window in seconds
        max: 100, // max requests in the window
    },
    emailAndPassword: {
        minPasswordLength: PASSWORDLENGTH.MIN,
        maxPasswordLength: PASSWORDLENGTH.MAX,
        minUsernameLength: USERNAMELENGTH.MIN,
        maxUsernameLength: USERNAMELENGTH.MAX,
        enabled: true,
        password: {
            hash: async (password: string) => {
                const salt = await genSalt(10);
                const hashedPassword = await hash(password, salt);
                return hashedPassword;
            },
            verify: async (data: { hash: string; password: string; }) => {
                return compare(data.password, data.hash);
            }
        }
    },
});