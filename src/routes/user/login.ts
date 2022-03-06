import { ClientUserFromUser, newJWT } from "$lib/authentification";
import { GetUserByUsername } from "$lib/database";
import { verify } from "@node-rs/argon2";
import type { User } from "@prisma/client";

/** @type {import('./user/login').RequestHandler} */
export async function post({ request }) {
    const form: FormData = await request.formData();
    const username: string = form.get("username") as string;
    const password: string = form.get("password") as string;
    const user: User = await GetUserByUsername(username);
    const hashedPassword = user.passwordHash;
    const verified = await verify(hashedPassword, password);
    if (verified) {
        console.log("User => ", user);
        let clientUser = ClientUserFromUser(user);
        let jwt = await newJWT(clientUser);
        console.log("JWT => ", jwt);
        return {
            status: 303,
            headers: {
                'Set-Cookie': `token=${ jwt }`,
                location: `/user/success`,
            }
        }
    } else {
        return {
            body: {
                errors: "Login failed"
            }
        }
    }
}