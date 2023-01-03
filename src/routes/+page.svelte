<script>
	import ParseData from '../lib/ParseData.svelte'
	let dataParsed;
	let headers;
	let rows;
	let textToSearch='';
	import Table from '../lib/Table.svelte'
	import Search from '../lib/Search.svelte'
	import {title, src, contentBeforeTable} from './config.js'
</script>

<ParseData url={src} bind:dataParsed/>

<h1>{title}</h1>

<div class="search">
<Search bind:textToSearch/>
<div class="contentBeforeTable">{@html contentBeforeTable}</div>
</div>

{#if dataParsed}
	<Table {dataParsed} bind:textToSearch />
{:else}
	<p><span class="loader"></span></p>
	<p>Chargement des données. Merci de patienter.</p>
{/if}

<style>
	:global(body) {font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif; color: #333;}
	h1, p {text-align:center; margin-top:1em;}
	.search {max-width: 800px; margin:auto; width:80%; text-align:center; font-size:0.9em;}
	.contentBeforeTable {font-size:0.8em;}
	.loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    display:block;
    text-align:center!important;
    padding:20px;
    margin:3em auto;
  }
  	@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>