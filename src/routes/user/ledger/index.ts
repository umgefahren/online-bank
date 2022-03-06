import { verifyJWT } from "$lib/authentification";
import { AllLedgersOfUser, GetUser } from "$lib/database";

/** @type {import('./user/ledger').RequestHandler} */
export async function get({ request }) {
    let authoirzation_header: string = request.headers.get('Cookie');
    let jwtToken: string = authoirzation_header.split('=')[1];
    let clientUser = await verifyJWT(jwtToken);
    let user = await GetUser(clientUser.userId);
    let ledgers = await AllLedgersOfUser(user);
    console.log("Ledgers => ", ledgers);
    return {
        body: {
            entries: ledgers
        }
    }
}