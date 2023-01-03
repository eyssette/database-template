<script>
	import {contentAfterSearch, automaticSearch} from '../routes/config.js'
	import { onMount } from 'svelte';

	let hash;
	let inputValue;

	onMount(() => {
		hash = window.location.hash;
		if (hash) {
			textToSearch=hash.slice(1);
		}
	});
	export let textToSearch='';
	function searchDatabase() {
		textToSearch=inputValue;
	}
</script>

<label for="search">Rechercher dans le sujet :</label>
{#if automaticSearch == true}
	<input type="text" id="search" name="search" bind:value={textToSearch}>
{:else}
<input type="text" id="search" name="search" bind:value={inputValue} on:change={searchDatabase}>
{/if}
<div>{@html contentAfterSearch}</div>

<style>
	label {font-size:1.1em}
	div {text-align:justify; padding-bottom:1.5em; padding-top:1em; font-style:italic;}
</style>