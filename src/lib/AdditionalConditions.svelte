<script>
	import {
		additionalConditionsArray
	} from './config.js';
	export let textToSearch;
	let conditionsHash;
	let conditionsHashString;
	let conditionsHashArray = [];
	let conditionChecked = [];
	$: additionalConditionsArray.forEach(
		(condition, index) => {
			conditionsHash=textToSearch.split('$');
			textToSearch=conditionsHash[0];
			conditionsHash.shift();
			conditionsHashString=conditionsHash[0];
			if(conditionsHashString) {
				conditionsHashArray=conditionsHashString.split('C').map(v => parseInt(v));
			} else {
				conditionsHashArray=[]
			}
			if (conditionChecked[index] == true || conditionsHashArray.includes(index+1)) {
				conditionChecked[index] = true
				if (textToSearch!='2022\t') {textToSearch = textToSearch + condition[1];}
			} else {
				textToSearch = textToSearch.replace(condition[1], '');
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