<script lang="ts">
	export let errors;
</script>

<div class="grid place-items-center h-screen">
	<div class="place-self-center class w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title m-2">Createt New Ledger</h2>
			<form method="post">
				<input
					type="text"
					name="name"
					placeholder="Name"
					id="name"
					class="input input-bordered w-full max-w-xs m-1"
				/>
				<textarea
					name="description"
					id="description"
					placeholder="Description"
					class="textarea textarea-bordered m-1 w-full max-w-xs"
				/>
				<div class="card-actions">
					<button class="btn mt-2" type="submit">Create Ledger</button>
				</div>
			</form>
		</div>
	</div>
</div>
