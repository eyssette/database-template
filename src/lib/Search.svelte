<script>
	import {
		automaticSearch,
		useAdditionalConditions
	} from './config.js';
	import AdditionalConditions from './AdditionalConditions.svelte';
	import {
		onMount
	} from 'svelte';
	export let textToSearch = '';

	let hash;
	let inputValue;


	onMount(() => {
		hash = window.location.hash;
		if (hash) {
			textToSearch = hash.slice(1);
		}
	});

	function searchDatabase() {
		textToSearch = inputValue;
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

<div class="search-explanations"><em>Astuce 1 : </em>ne mettre que le début d'un terme que l'on recherche pour pouvoir trouver tous les mots dérivés (p.ex. : “lib” pour “liberté”, “libération”, “libérer”, “libre”). <em>Astuce 2 :</em> utiliser “terme1+terme2” pour imposer la présence des deux termes. <em>Astuce 3 :</em> chaque séparation entre colonne est représentée par une virgule (“,terme” recherche donc un terme qui est au début d'une colonne sauf la première). {#if automaticSearch == true}<em>Astuce 4 :</em> on peut utiliser des regex (p.ex. “parler|parole”){/if}
</div>


<style>
	label {
		font-size: 1.1em;
	}

	div:nth-of-type(1) {
		margin: 0.75em auto;
	}

	div:nth-of-type(2) {
		text-align: justify;
		padding-bottom: 1.5em;
		padding-top: 1em;
		font-style: italic;
	}

	.search-explanations {
		text-align:justify;
	}
</style>