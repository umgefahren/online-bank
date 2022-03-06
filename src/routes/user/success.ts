import { verifyJWT } from "$lib/authentification";

/** @type {import('./success').RequestHandler} */
export async function get({ request }) {
    console.log("Header => ", request.headers);
    let authoirzation_header: string = request.headers.get('Cookie');
    let jwtToken: string = authoirzation_header.split('=')[1];
    let clientUser = await verifyJWT(jwtToken);
    return {
        body: {
            clientUser
        }
    }
}