<script lang="ts">
	export const errors: string = null;
</script>

<div class="grid place-items-center h-screen">
	<div class="place-self-center class w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title m-2 text-2xl">Login:</h2>
			<form method="post">
				<input
					type="text"
					name="username"
					id="username"
					placeholder="username"
					class="input input-bordered w-full max-w-xs m-1"
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					id="password"
					class="input input-bordered w-full max-w-xs m-1"
				/>
				<div class="grid m-2">
					<button type="submit" class="btn mt-2">Login</button>
				</div>
				<div class="grid m-2">
					<h2 class="btn"><a href="/user/register">Register</a></h2>
				</div>
				
			</form>
			
		</div>
	</div>
</div>
