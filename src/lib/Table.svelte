<script>
	import {columnsToGroup,groupColumns,changeHeader,newHeader,markText} from '../routes/config.js'
	import Mark from 'mark.js';
	export let dataParsed;
	export let textToSearch;
	let markInstance;
	let dataTable;
	let search_items
	
	
	function markMatches(text) {
    	if (markInstance) {
      		markInstance.unmark();
    	}
		if (text !='') {
			markInstance = new Mark(dataTable);
			search_items = text.split("+");
			let i_search = 1;
			search_items.forEach((search_item) => {
				markInstance.mark(search_item, {
					"element": "span",
					"className": "match" + i_search,
					"accuracy": "complementary",
					"separateWordSearch": false
				});
				i_search = i_search + 1;
			});
		}
  	}

	let headers;
	let dataArray = Object.values(dataParsed);
	if (columnsToGroup) {
		dataArray = groupColumns(dataArray);
	}
	headers = dataArray.shift()
	if (changeHeader) {
		headers=newHeader;
	}
	let rows = dataArray;
	function sortColumnOnClick(i) {
		markMatches('');
		setTimeout(function() {
		rows = rows.sort((a, b) => a[i].localeCompare(b[i]));
		},10)
	}
	$: if(markText) {
			setTimeout(function() {
				markMatches(textToSearch)
   			}, 20)
		}

	$: if (textToSearch!=='') {
		search_items = textToSearch.split("+");
		let pattern = "";
		search_items.forEach((search_item) => {
			pattern = pattern + "(?=.*" + search_item + ")";
		});
		let regex = new RegExp(pattern, 'i');
		setTimeout(function() {
		rows = dataArray.filter((row) => row.toString().toLowerCase().match(regex));
		},10)
	} else {rows = dataArray}

	
</script>

<table>
{#if headers}	
	<thead>
		<tr>
			{#each headers as header, i}
					<th data-key="{header}" on:click={() => sortColumnOnClick(i)}>{@html header}<span>&updownarrow;</span></th>
			{/each}
		</tr>
	</thead>
{/if}
<tbody bind:this={dataTable}>
	{#each rows as row}
		<tr>
			{#each row as cell}
				<td>{@html cell} </td>
			{/each}
		</tr>
	{/each}
</tbody>
</table>

<style>
	table {
		text-align: justify;
		border-collapse: separate;
		border-spacing: 0;
		border: 2px solid #ed1c40;
		margin: 50px auto;
		border-radius: .25rem;
		table-layout: auto;
		width: 95%;
		max-width: 1200px;
	}

	th {
		cursor: pointer;
		font-weight: 600;
	}

	thead tr:first-child {
		background: #ed1c40;
		color: #fff;
		border: none;
	}

	th:first-child,
	td:first-child {
		padding: 0 15px 0 20px;
	}

	thead tr {
		height: 2em
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

	th span:last-child {	
		font-size:0.7em;
		position:relative;
		left:5px;
		top:-2px;
	}
	:global(.match1){
  background: hsl(53, 100%, 90%);
}
:global(.match2){
  background: hsl(197, 71%, 92%);
}
:global(.match3){
  background: hsl(150, 86%, 92%);
}
:global(.match4), :global(.match5), :global(.match6){
  background: hsl(256, 85%, 93%);
}
</style>