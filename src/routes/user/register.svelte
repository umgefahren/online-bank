<script lang="ts">
	export const errors = [];
</script>

<div class="grid place-items-center h-screen">
	<div class="place-self-center class w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title m-2">Register</h2>
			<form method="post">
				<input
					type="text"
					name="firstName"
					id="firstName"
					placeholder="First Name"
					class="input input-bordered w-full max-w-xs m-1"
				/>
				<input
					type="text"
					name="lastName"
					id="lastName"
					placeholder="Last Name"
					class="input input-bordered w-full max-w-xs m-1"
				/>
				<input
					type="text"
					name="userName"
					id="userName"
					placeholder="username"
					class="input input-bordered w-full max-w-xs m-1"
				/>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="password"
					class="input input-bordered w-full max-w-xs m-1"
				/>
				<div class="card-actions justify-end">
					<button type="submit" class="btn mt-2">Register</button>
				</div>
			</form>
		</div>
	</div>
</div>
