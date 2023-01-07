<script>
	import Papa from 'papaparse';
	import Table from '../lib/Table.svelte';
	import Search from '../lib/Search.svelte';
	import {
		title,
		contentBeforeTable,
		src
	} from '../lib/config.js';
	let headers;
	let rows;
	let textToSearch = '';

	async function fetchCsv() {
		const response = await fetch(src);
		const csv = await response.text();
		const parse = await Papa.parse(csv, {
			delimiter: "\t",
			fastMode: true
		}).data;
		return parse;
	}
	const dataParsed = fetchCsv();
</script>


<h1>{title}</h1>

{#await dataParsed}
	<p><span class="loader"></span></p>
	<p>Chargement des données. Merci de patienter.</p>
{:then dataParsed}
	<div class="search">
		<Search bind:textToSearch/>
		<div class="contentBeforeTable">{@html contentBeforeTable}</div>
	</div>
	<Table {dataParsed} bind:textToSearch />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
		color: #333;
	}

	h1,
	p {
		text-align: center;
		margin-top: 1em;
	}

	.search {
		max-width: 800px;
		margin: auto;
		width: 80%;
		text-align: center;
		font-size: 0.9em;
	}

	.contentBeforeTable {
		font-size: 0.8em;
	}

	.loader {
		border: 16px solid #f3f3f3;
		border-top: 16px solid #3498db;
		border-radius: 50%;
		width: 120px;
		height: 120px;
		animation: spin 2s linear infinite;
		display: block;
		text-align: center !important;
		padding: 20px;
		margin: 3em auto;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>