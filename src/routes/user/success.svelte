<script lang="ts">
import type { ClientUser } from "$lib/authentification";
import { currentUser, loggedIn } from "$lib/user";


    export let clientUser: ClientUser;
    currentUser.set(clientUser);
    let localClientUser: ClientUser;
    currentUser.subscribe((val) => {
        localClientUser = val;
    })
    loggedIn.set(true);
    
</script>

<div class="grid place-items-center h-screen">
	<div class="place-self-center class w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title m-2 text-2xl">Welcome { localClientUser.firstName } { localClientUser.lastName }!</h2>
            <h3>You can now use your account.</h3>
            <a href="/"><h3 class="font-extrabold">Back to main page.</h3></a>
		</div>
	</div>
</div>