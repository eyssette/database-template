<script>
	import {markText} from '../routes/config.js'
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

	  $: {
		if(markText) {
			setTimeout(function() {
				markMatches(textToSearch)
   			}, 10)
		}
	}

	$: if (sortColumns==true) {
		if(markText) {
			setTimeout(function() {
				markMatches(textToSearch)
   			}, 10)
		};
		sortColumns=false}
</script>
<style>
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