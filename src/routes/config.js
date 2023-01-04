export let title = "Sujets de dissertation donnés au baccalauréat";

export let src = "https://raw.githubusercontent.com/eyssette/sujets-philosophie-bac/main/data/dissertations.tsv";
/* https://raw.githubusercontent.com/eyssette/textes-philo/main/data/textes-new.tsv */
/* https://raw.githubusercontent.com/eyssette/sujets-philosophie-bac/main/data/dissertations.tsv */
/* https://raw.githubusercontent.com/eyssette/sujets-philosophie/main/data/sujets-vrac.tsv */

export let contentBeforeTable = 'Site créé par <a href="http://eyssette.github.io/">Cédric Eyssette</a> à partir du travail de François Elie : <a href="https://philo-labo.fr/sujets/">https://philo-labo.fr/sujets/</a>'

export let contentAfterSearch = 'Vous pouvez mettre par exemple "lib+consc" pour rechercher tous les sujets qui contiennent "lib" (pour "liberté", "libération", "libérer"…) et qui contiennent "consc" (pour "conscient", "conscience", "inconscient" …)'

/* Si la base de données est trop importante, il faut que la recherche ne se déclenche pas automatiquement, mais seulement en appuyant sur Entrée */
export let automaticSearch=true;

/* Pour regrouper certaines colonnes */
export let columnsToGroup = false
export function groupColumns(arrInit) {
	let newArr = []
		arrInit.forEach(element => {
			/* Un exemple de regroupement */
			newArr.push([element[0],element[2]+'<br/>'+element[1]+(element[3] ? element[3] : '')]);
		});
	return newArr;
}

/* Pour changer le titre des colonnes  */
export let dataNoHeader=false;
export let changeHeader = false;
export let newHeader=['Intitulé du sujet'];
/* export let newHeader=['Auteur·e','Texte']; */

/* Surligner les mots recherchés */
export let markText=true;

/* Si les données sont déjà triées en ordre ascendant pour une colonne, il faut l'indiquer ici */
export let historyColumnsClickDefault=[0]

export let tableCSS=''
/* export let tableCSS='small' */

/* Pour indiquer des conditions supplémentaires possibles (cases à cocher) avec le format suivant : intitulé de la condition, numéro de la colonne concernée, regex correspondante */
export let useAdditionalConditions = false;
export let additionalConditionsArray=[['Seulement des sujets avec une question','(?=.*\\?$)'],['Seulement des sujets sans question','(?=.*([A-zÀ-ÿ]|»|\\)|[0-9]|!|>)$)']];