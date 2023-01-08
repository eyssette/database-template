<script>
	import {
		reorganizeData,
		reorganizeDataIfSmallScreen,
		reorganizeDataFunction,
		changeHeader,
		newHeader,
		historyColumnsClickDefault,
		dataNoHeader,
		tableCSS
	} from './config.js';
	import MarkResults from './MarkResults.svelte';
	export let dataParsed;
	export let textToSearch;
	let dataTable;
	let search_items;
	let sortColumns = false;
	let historyColumnsClick = historyColumnsClickDefault;

    const innerWidth = window.innerWidth;

	let headers;
	let dataArray = Object.values(dataParsed);
	if (reorganizeData || (reorganizeDataIfSmallScreen && innerWidth<=800)) {
		dataArray = reorganizeDataFunction(dataArray);
	}
	if (dataNoHeader == false) {
		headers = dataArray.shift();
		if (changeHeader) {
			headers = newHeader;
		}
	} else {
		headers = newHeader;
	}
	let rows = dataArray;

	function sortColumnOnClick(i) {
		if (historyColumnsClick.includes(i)) {
			let index = historyColumnsClick.indexOf(i);
			historyColumnsClick.splice(index, 1);
			setTimeout(function () {
				rows = rows.sort((a, b) => b[i].localeCompare(a[i]));
			}, 10)
		} else {
			setTimeout(function () {
				rows = rows.sort((a, b) => a[i].localeCompare(b[i]));
			}, 10)
			historyColumnsClick.push(i);
		}
		sortColumns = true;
	}

	$: if (textToSearch !== '') {
		search_items = textToSearch.split("+");
		let pattern = "";
		search_items.forEach((search_item) => {
			pattern = pattern + "(?=.*" + search_item + ")";
		});
		try {
			let regex = new RegExp(pattern, 'i');
			setTimeout(function () {
				rows = dataArray.filter((row) => row.toString().toLowerCase().match(regex));
			}, 10)
		} catch (e) {
			console.log("Invalid Regular Expression");
			textToSearch == '';
		}
	} else {
		rows = dataArray;
	}
</script>

<table class:one-column="{headers.length===1}" class="{tableCSS}">
	{#if headers}	
		<thead>
			<tr>
				{#each headers as header, i}
						<th data-key="{header}" on:click={() => sortColumnOnClick(i)}>{@html header}</th>
				{/each}
			</tr>
		</thead>
	{/if}
	<tbody bind:this={dataTable}>
		{#each rows as row}
			<tr>
				{#each row as cell}
					<td>{@html cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<MarkResults {dataTable} {textToSearch} bind:sortColumns/>

<style>
	table {
		text-align: justify;
		border-collapse: separate;
		border-spacing: 0;
		border: 2px solid #6a0012;
		margin: 50px auto;
		border-radius: .25rem;
		table-layout: auto;
		width: 95%;
		max-width: 1200px;
		line-height: 1.6em;
	}

	th {
		cursor: pointer;
		font-weight: 600;
	}
	th:after {
		content: "↕";
		font-size: 0.7em;
		position: relative;
		left: 5px;
		top: -2px;
	}

	thead tr:first-child {
		background: #6a0012;
		color: #fff;
		border: none;
	}

	th:first-child,
	td:first-child {
		padding: 0 15px 0 20px;
	}

	thead tr {
		height: 2em;
	}

	tbody tr:first-child td {
		padding-top: 10px;
	}

	tbody td {
		border-bottom: 1px solid #ddd;
		padding-bottom: 10px;
		padding-top: 10px;
	}

	tbody tr:hover {
		background-color: #f2f2f2;
	}

	th:last-child,
	td:last-child {
		padding-right: 30px;
	}

	th,
	td {
		padding-left: 1vw;
		padding-right: 1vw;
	}

	.one-column td,
	.one-column th {
		text-align: center;
		padding-left: 5vw;
		padding-right: 5vw;
	}

	.small {
		max-width: 800px;
	}
</style>