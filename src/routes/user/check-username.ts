import { UserNameExists } from "$lib/database";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    let req: Request = request;
    let body = await req.json();
    let username: string = body.username;
    let exists = await UserNameExists(username);
    return {
        body: {
            exists
        }
    }
}
