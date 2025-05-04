'use client'
import { authClient } from "~/lib/auth-client"
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export const signUp = async (email: string, password: string, name: string, image: string | undefined) => {
    const { data, error } = await authClient.signUp.email({
        email: email,
        password: password,
        name: name,
        image: image,
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            window.location.href = "/dashboard";

        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export const signIn = async (email: string, password: string) => {
    const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
    },
        {
            onRequest: (ctx) => {
                //show loading
                console.log("Loading...");

            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                window.location.href = "/dashboard";
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
            },
        });

    if (error) {
        throw new Error(error.message);
    }

    return data;

}
export const signOut = async () => {
    await authClient.signOut();
}

export const handleSignOut = async () => {
    await signOut();
    window.location.href = "/auth/sign-in";
}

export function User() {
    const {
        data: session,
        isPending,
        error,
        refetch
    } = authClient.useSession()

    return (
        <div>
            {isPending && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {session && (
                <div>
                    <h1>{session.user.name}</h1>
                    {session.user.image && (
                        <img src={session.user.image} alt={session.user.name} />
                    )}

                    <Button variant="destructive" className="cursor-pointer" onClick={() => handleSignOut()}>Sign Out</Button>
                </div>
            )}
        </div>

    )
}

export function useAuth() {
    const { data: session, isPending, error } = authClient.useSession();
    return { session, isPending, error };
}
