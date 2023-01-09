<script>
	import {
		reorganizeData,
		reorganizeDataIfSmallScreen,
		reorganizeDataFunction,
		changeHeader,
		newHeader,
		historyColumnsClickDefault,
		dataNoHeader,
		tableCSS,
		desactivateRegex,
		automaticSearch,
		scoreDisplay
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
	if (reorganizeData || (reorganizeDataIfSmallScreen && innerWidth <= 800)) {
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
	let headersLength = headers.length;
	let rows = dataArray;
	let pattern = '';
	let regex;
	let previoustextToSearch;

	function sortColumnOnClick(i) {
		if (historyColumnsClick.includes(i)) {
			const index = historyColumnsClick.indexOf(i);
			historyColumnsClick.splice(index, 1);
			/* setTimeout(function () { */
			rows = rows.sort((a, b) => b[i].toString().localeCompare(a[i].toString(), "fr", {
				numeric: true
			}));
			/* },5) */
		} else {
			/* setTimeout(function () { */
			rows = rows.sort((a, b) => a[i].toString().localeCompare(b[i].toString(), "fr", {
				numeric: true
			}));
			historyColumnsClick.push(i);
			/* },5) */
		}
		sortColumns = true;
	}

	function searchFunction(string, itemsToSearch) {
		return itemsToSearch.every((v) => string.includes(v));
	}

	/** Function that count occurrences of a substring in a string;
	 * @param {String} string               The string
	 * @param {String} subString            The sub string to search for
	 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
	 *
	 * @author Vitim.us https://gist.github.com/victornpb/7736865
	 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
	 * @see https://stackoverflow.com/a/7924240/938822
	 */
	function occurrences(string, subString, allowOverlapping) {

		string += "";
		subString += "";
		if (subString.length <= 0) return (string.length + 1);

		var n = 0,
			pos = 0,
			step = allowOverlapping ? 1 : subString.length;

		while (true) {
			pos = string.indexOf(subString, pos);
			if (pos >= 0) {
				++n;
				pos += step;
			} else break;
		}
		return n;
	}

	function occurencesMultiples(arr, string) {
		return (arr.reduce(function (accumulator, currentValue) {
			const occurencesNumber = occurrences(string, currentValue, false);
			return accumulator + occurencesNumber;
		}, 0));
	}

	let rowsFiltered = []
	let rowsFilteredAndSorted = []

	$: if (textToSearch !== '' && previoustextToSearch !== textToSearch) {
		pattern = '';
		search_items = textToSearch.toLowerCase().split("+");
		if (desactivateRegex === false) {
			search_items.forEach((search_item) => {
				pattern = pattern + "(?=.*" + search_item + ")";
			});
			regex = new RegExp(pattern, 'i');
			try {
				/* setTimeout(function () { */
				rows = dataArray.filter((row) => row.toString().toLowerCase().match(regex));
				previoustextToSearch = textToSearch;
				/* }, 5) */
			} catch (e) {
				console.log("Invalid Regular Expression");
				textToSearch == '';
			}
		} else {
			/* rows = dataArray.filter((row) => searchFunction(row.toString().toLowerCase(), search_items)); */
			setTimeout(function () {
				rows = dataArray;
				for (const row of rows) {
					const searchResults = searchFunction(row.toString().toLowerCase(), search_items)
					if (searchResults) {
						rowsFiltered = [...rowsFiltered, row]
					}
				}
				if (scoreDisplay === true) {
					for (const row of rowsFiltered) {
						const score = occurencesMultiples(search_items, row.toString().toLowerCase());
						const rowN = [...row, score];
						rowsFilteredAndSorted = [...rowsFilteredAndSorted, rowN];
					}
					rowsFilteredAndSorted = rowsFilteredAndSorted.sort((a, b) => {
						return b[headersLength] -
							a[headersLength]
					})
					rows = rowsFilteredAndSorted
				} else {
					rows = rowsFiltered
				}


				/* rows = rowsFilteredAndSorted.map(function (val) {
					return val.slice(0, -1);
				}); */
				previoustextToSearch = textToSearch;
				rowsFiltered = [];
				rowsFilteredAndSorted = [];
			}, 5)
		}
	} else {
		if (textToSearch == '') {
			rows = dataArray;
		}
	}
</script>

<table class:one-column="{headersLength===1}" class="{tableCSS}">
	{#if headers}	
		<thead>
			<tr>
				{#each headers as header, i}
						<th data-key="{header}" on:click={() => sortColumnOnClick(i)}>{@html header}</th>
				{/each}
				{#if scoreDisplay === true && automaticSearch === false}
					<th on:click={() => sortColumnOnClick(headersLength)}>Score</th>
				{/if}
			</tr>
		</thead>
	{/if}
	<tbody bind:this={dataTable}>
		{#if desactivateRegex==true && textToSearch==''}
			<tr><td colspan="{headersLength}" class="info-search">Utilisez l'outil de recherche ci-dessus : les textes qui correspondent à la recherche s'afficheront ci-dessous</td></tr>
		{:else}
			{#if previoustextToSearch != textToSearch && automaticSearch === false}
				<tr><td colspan="{headersLength}"><p><span class="loader"></span></p><p class="info-search">Recherche en cours</p></td></tr>
			{:else}
				{#if rows.length !=0}
					{#each rows as row}
						<tr>
							{#each row as cell}
								<td>{@html cell}</td>
							{/each}
						</tr>
					{/each}
				{:else}
					<tr><td colspan="{headersLength}" class="info-search">Aucun résultat trouvé</td></tr>
				{/if}
			{/if}
		{/if}
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

	.info-search {
		text-align:center;
		padding:2em!important;
	}
</style>