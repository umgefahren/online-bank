import { hash } from "@node-rs/argon2";
import { CreateUser } from "$lib/database";
import { ClientUserFromUser, newJWT } from "$lib/authentification";

/** @type {import('./user/register').RequestHandler} */
export async function post({ request }) {   
    // let content = await request.text();
    // console.log("Form Data => ", content);
    let form = await request.formData();
    const firstName: string = form.get("firstName");
    const lastName: string = form.get("lastName");
    const userName: string = form.get("userName");
    const password: string = form.get("password");
    
    const hahsedPassword = await hash(password);
    console.log("Hashed Password => ", hahsedPassword);
    try {
        let user = await CreateUser(firstName, lastName, userName, hahsedPassword);
        console.log("User => ", user);
        let clientUser = ClientUserFromUser(user);
        let jwt = await newJWT(clientUser);
        console.log("JWT => ", jwt);
        return {
            status: 303,
            headers: {
                'Set-Cookie': `token=${jwt}`,
                location: `/user/success`,
            },
        }
    } catch (error) {
        return {
            body: {
                errors: [error]
            }
        }
    }
}