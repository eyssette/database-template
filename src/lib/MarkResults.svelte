<script>
	import {
		markText
	} from './config.js';
	import Mark from 'mark.js';
	export let dataTable;
	export let textToSearch;
	export let sortColumns;
	let markInstance;
	let search_items;

	function markMatches(text) {
		if (markInstance) {
			markInstance.unmark();
		}
		if (text != '') {
			markInstance = new Mark(dataTable);
			search_items = text.split("(")[0].split("+");
			search_items.forEach((search_item, index) => {
				markInstance.mark(search_item.replace("^", ""), {
					"element": "span",
					"className": "match" + (index+1),
					"accuracy": "complementary",
					"separateWordSearch": false
				});
			});
		}
	}

	$: {
		if (markText) {
			setTimeout(function () {
				markMatches(textToSearch);
			}, 10);
		}
	}

	$: if (sortColumns == true) {
		if (markText) {
			setTimeout(function () {
				markMatches(textToSearch);
			}, 10);
		}
		sortColumns = false;
	}
</script>
<style>
	:global(.match1) {
		background: hsl(53, 100%, 88%);
	}

	:global(.match2) {
		background: hsl(197, 71%, 92%);
	}

	:global(.match3) {
		background: hsl(150, 86%, 92%);
	}

	:global(.match4),
	:global(.match5),
	:global(.match6) {
		background: hsl(256, 85%, 93%);
	}
</style>