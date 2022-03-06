<script>

    console.log("Imported");
    import { loggedIn } from "$lib/user";
    

    let loggedInValue;

    loggedIn.subscribe(value => {
        loggedInValue = value;
    });
</script>

<div class="p-5">
    <div class="navbar bg-slate-400 rounded">
        <div class="flex-1">
            <h1 class="normal-case text-2xl antialiased font-bold">
                Virtual Bank International
            </h1>
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal p-0">
                <li>
                    {#if loggedInValue}
                        <a href="/user/logout">Logout</a>
                    {:else}
                        <a href="/user/login">Login</a>
                    {/if}
                    
                </li>
            </ul>
        </div>
    </div>
</div>
