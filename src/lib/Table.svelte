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
		automaticSearch
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
	let rows = dataArray;
	let pattern = '';
	let regex;
	let previoustextToSearch = '';

	function sortColumnOnClick(i) {
		if (historyColumnsClick.includes(i)) {
			const index = historyColumnsClick.indexOf(i);
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

	function searchFunction(arr, target) {
		return target.every((v) => arr.includes(v));
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
/* function occurrences(string, subString, allowOverlapping) {

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

function occurencesMultiples(arr,string) {
	return (arr.reduce(function (accumulator, currentValue) {
		const occurencesNumber = occurrences(string,currentValue,false);
		return accumulator + occurencesNumber;
	}, 0));
} */

/* .sort(function (a, b) {
							occA = occurencesMultiples(search_items,a[4].toLowerCase());
							occB = occurencesMultiples(search_items,b[4].toLowerCase());
							return (occA - occB)}); */

	$: if (textToSearch !== '') {
			pattern = '';
			search_items = textToSearch.toLowerCase().split("+");
			if (desactivateRegex === false) {
				search_items.forEach((search_item) => {
					pattern = pattern + "(?=.*" + search_item + ")";
				});
				regex = new RegExp(pattern, 'i');
				try {
					setTimeout(function () {
						rows = dataArray.filter((row) => row.toString().toLowerCase().match(regex));
					}, 5)
				} catch (e) {
					console.log("Invalid Regular Expression");
					textToSearch == '';
				}				
			} else {
					setTimeout(function () {
						rows = dataArray.filter((row) => searchFunction(row.toString().toLowerCase(), search_items))
						previoustextToSearch = textToSearch;
					}, 5)						
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
		{#if desactivateRegex==true && textToSearch==''}
			<tr><td colspan="{headers.length}" class="info-search">Utilisez l'outil de recherche ci-dessus : les textes qui correspondent à la recherche s'afficheront ci-dessous</td></tr>
		{:else}
			{#if previoustextToSearch != textToSearch && automaticSearch === false}
				<tr><td colspan="{headers.length}"><p><span class="loader"></span></p><p class="info-search">Recherche en cours</p></td></tr>
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
					<tr><td colspan="{headers.length}" class="info-search">Aucun résultat trouvé</td></tr>
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