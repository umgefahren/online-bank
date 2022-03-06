<script lang="ts">
    import { currentUser, loggedIn } from "../../lib/user";
    import { goto } from "$app/navigation";

    async function logMeOut() {
        loggedIn.set(false);
        currentUser.set(null);
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/user;";
        await goto("/");
    }
</script>

<div class="grid place-items-center h-screen">
    <div class="place-self-center class w-96 bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title m-2 text-2xl">Wanna log out?</h2>
            <button on:click={ logMeOut } class="btn">
                Log Me Out
            </button>
        </div>
    </div>
</div>
