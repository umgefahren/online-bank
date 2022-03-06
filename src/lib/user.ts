import type { User } from "@prisma/client";
import { readable, writable, type Writable } from "svelte/store";
import { verifyJWT, type ClientUser } from "./authentification";

export const loggedIn = writable(true);
export const currentUser: Writable<ClientUser> = writable(null);


export async function ExtractClientUser(request: Request): Promise<ClientUser> {
    let authoirzation_header: string = request.headers.get('Cookie');
    let jwtToken: string = authoirzation_header.split('=')[1];
    let clientUser = await verifyJWT(jwtToken);
    return clientUser;
}