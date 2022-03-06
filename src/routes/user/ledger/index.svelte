<script lang="ts">
    export let entries;
</script>

<div class="flex justify-center border m-3 p-3">
    <a href="/user/ledger/create">
        <h1 class="text-3xl">Create Ledger</h1>
    </a>
</div>

<div class="m-3 max-w-screen-lg">
	<div class="flex justify-center">
		<table class="table-auto">
			<thead>
				<tr>
					<th class="border border-slate-600">
						<div class="p-3">
							<p>Id</p>
						</div>
					</th>
					<th class="border border-slate-600">
						<div class="p-3">
							<p>Uuid</p>
						</div>
					</th>
					<th class="border border-slate-600">
						<div class="p-3">
							<p>Name</p>
						</div>
					</th>
					<th class="border border-slate-600">
						<div class="p-3">
							<p>Description</p>
						</div>
					</th>
					<th class="border border-slate-600">
						<div class="p-3">
							<p>Balance</p>
						</div>
					</th>
					<th class="border border-slate-600">
						<div class="p-3">
							<p>Created At</p>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each entries as entry}
					<tr>
						<td class="border border-slate-700">
							<div class="p-3">
								<p>entry.ledgerId</p>
							</div>
						</td>
						<td class="border border-slate-700">
							<div class="p-3">
								<p />
							</div>
						</td>
						<td class="border border-slate-700">
							<div class="p-3">
								<p />
							</div>
						</td>
						<td class="border border-slate-700">
							<div class="p-3">
								<p />
							</div>
						</td>
						<td class="border border-slate-700">
							<div class="p-3">
								<p />
							</div>
						</td>
						<td class="border border-slate-700">
							<div class="p-3">
								<p />
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
