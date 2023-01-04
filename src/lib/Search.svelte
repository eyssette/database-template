<script>
	import {contentAfterSearch, automaticSearch, useAdditionalConditions} from './config.js'
	import AdditionalConditions from './AdditionalConditions.svelte';
	import { onMount } from 'svelte';
	export let textToSearch='';

	let hash;
	let inputValue;


	onMount(() => {
		hash = window.location.hash;
		if (hash) {
			textToSearch=hash.slice(1);
		}
	});

	function searchDatabase() {
		textToSearch=inputValue;
	}
	

</script>

<label for="search">Rechercher dans le sujet :</label>
{#if automaticSearch == true}
	<input type="text" id="search" name="search" bind:value={inputValue} on:input={searchDatabase}>
{:else}
<input type="text" id="search" name="search" bind:value={inputValue} on:change={searchDatabase}>
{/if}

{#if useAdditionalConditions == true}
	<div>
		<AdditionalConditions bind:textToSearch/>
	</div>
{/if}

<div>{@html contentAfterSearch}</div>

<style>
	label {font-size:1.1em}
	div:nth-of-type(1) {margin:0.75em auto}
	div:nth-of-type(2) {text-align:justify; padding-bottom:1.5em; padding-top:1em; font-style:italic;}
</style>