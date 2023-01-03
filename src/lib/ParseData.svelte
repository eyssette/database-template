<script>
	import Papa from 'papaparse';
	import { onMount } from 'svelte';
	export let url;
	export let dataParsed;
	
	onMount(async () => {
	  const response = await fetch(url);
	  const csv = await response.text();
	  dataParsed = await Papa.parse(csv, {
						delimitersToGuess: ["\t","    "],
						fastMode:true
					}).data;
	})
</script>