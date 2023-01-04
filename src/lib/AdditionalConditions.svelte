<script>
	import {additionalConditionsArray} from '../routes/config.js'
	export let textToSearch;
	let conditionChecked=[];
	$: additionalConditionsArray.forEach(
		(condition,index) => {
			if (conditionChecked[index]==true) {
				textToSearch=textToSearch+condition[1];
			} else {
				textToSearch=textToSearch.replace(condition[1],'');
			}
		}
	)
</script>

{#each additionalConditionsArray as condition,i}
<p><label for="condition-{i}">{condition[0]} </label> :
<input type="checkbox" id="condition-{i}" name="condition-{i}" bind:checked={ conditionChecked[i]}></p>
{/each}

<style>
	p {margin:0}
</style>