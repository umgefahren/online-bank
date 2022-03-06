<script lang="ts" context="module">
	/** @type {import('./').Load} */
	export async function load({ fetch }) {
		const response: Response = await fetch('/data');
		const body = await response.json();
		const allMoney = body['allMoney'];
		const allLedgers = body['allLedgers'];
		const allRecords = body['allRecords'];
		const allUsers = body['allUsers'];
		return {
			props: {
				money: allMoney,
				ledgers: allLedgers,
				records: allRecords,
				users: allUsers
			}
		};
	}
</script>

<script lang="ts">
	import { loggedIn } from '$lib/user';

	import Navbar from '../components/Navbar.svelte';
	export let money: number = 0;
	export let ledgers: number = 0;
	export let records: number = 0;
	export let users: number = 0;

	let loggedInCurrent = false;
	loggedIn.subscribe((val) => {
		loggedInCurrent = val;
	});
</script>

<Navbar />

{#if loggedInCurrent}
	<div class="grid place-items-center">
		<div class="place-self-center class w-96 bg-base-100 shadow-xl">
			<div class="card-body flex justify-center">
				<a href="/user/ledger"><h2 class="card-title m-2 text-2xl">My Ledger</h2></a>
			</div>
		</div>
	</div>
{/if}

<div class="p-5 grid grid-cols-2 gap-5">
	<div class="stats shadow p-5">
		<div class="stat">
			<div class="stat-title">Total Money In Circulation</div>
			<div class="stat-value">{money} $</div>
			<div class="stat-desc">Money seems very much</div>
		</div>
	</div>
	<div class="stats shadow p-5">
		<div class="stat">
			<div class="stat-title">Total Ledgers created</div>
			<div class="stat-value">{ledgers}</div>
			<div class="stat-desc">All ledgers that have been created by users</div>
		</div>
	</div>
	<div class="stats shadow p-5">
		<div class="stat">
			<div class="stat-title">Total transactions created</div>
			<div class="stat-value">{records}</div>
			<div class="stat-desc">All transactions created by users</div>
		</div>
	</div>
	<div class="stats shadow p-5">
		<div class="stat">
			<div class="stat-title">Total users created</div>
			<div class="stat-value">{users}</div>
			<div class="stat-desc">Number of all users created</div>
		</div>
	</div>
</div>
