import { authClient } from "~/lib/auth-client"

export const signUp = async (email: string, password: string, name: string, image: string | undefined) => {
    const { data, error } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        image: image,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}