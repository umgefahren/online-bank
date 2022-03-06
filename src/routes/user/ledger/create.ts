import { ClientUserFromUser } from "$lib/authentification";
import { CreateLedger } from "$lib/database";
import { ExtractClientUser } from "$lib/user";

/** @type {import('./user/ledger/create').RequestHandler} */
export async function post({ request }) {   
    let form = await request.formData();
    const name: string = form.get("name");
    const description: string = form.get("description");
    console.log("Name => ", name);
    console.log("Description => ", description);
    let clientUser = await ExtractClientUser(request);
    let user = await clientUser.toUser();
    let ledger = await CreateLedger(user, name, description);
    console.log("Created ledger => ", ledger);
    return {
        status: 303,
        headers: {
            location: "/user/ledger/",
        }
    }
}