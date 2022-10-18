window.onload = () => {
	let estrelles = localStorage.getItem('number');
	let distancia = localStorage.getItem('distance');
	let radi = localStorage.getItem('size');
	eventRangeInputs_change();
	arr_estrelles = groupEstrelles(estrelles, radi);
	printEstrelles(arr_estrelles);
}

// mante actualitzats els valors dels inputs
function eventRangeInputs_change(){
	let element = document.querySelector("form > input");
	element.value = localStorage.getItem(element.name);
	document.querySelector("."+element.name).textContent = localStorage.getItem(element.name);
	element.addEventListener('change', () =>{
		afegirEstrelles(element)
		localStorage.setItem(element.name, element.value);
		document.querySelector("."+element.name).textContent = localStorage.getItem(element.name);
	});
}


/**
 * CLASS ESTRELLA 
 * 
 */
function groupEstrelles(quantitat, radi){
	arr_estrelles = [];
	for (var i = 0; i < quantitat; i++) {
		arr_estrelles[i] = new Estrella(i, radi); 
	}
	return arr_estrelles;
}
function Estrella(id, radi){
	this.id = id;
	this.radi = Math.floor(Math.random() * radi+1);
	this.top = Math.floor(Math.random() * 600) + 20;
	this.left = Math.floor(Math.random() * 1250) + 20;
	this.opacity = (Math.floor(Math.random() * 5) + 5)/10;
}

function printEstrelles(arr_estrelles){
	for (var i = 0; i < arr_estrelles.length; i++) {
		estrellaHTML(arr_estrelles[i]);
	}
}
/* END ESTRELLA */
function estrellaHTML(estrella){
	let node = document.createElement("div");
	node.classList.add("estrella");
	node.style.top = estrella.top+"px";
	node.style.left = estrella.left+"px";
	node.style.width = estrella.radi*2+"px";
	node.style.height = estrella.radi*2+"px";
	node.style.opacity = estrella.opacity;
	document.getElementById("espai").appendChild(node);
}

function afegirEstrelles(element){
	let quantitat;
	if (element.value>localStorage.getItem('number')) {
		quantitat = element.value - localStorage.getItem('number');
		groupEstrelles(quantitat, parseInt(localStorage.getItem('size')));
		printEstrelles(arr_estrelles);
	}else {
		quantitat = localStorage.getItem('number') - element.value;
		removeStar(quantitat)
	}

}

function removeStar(quantitat){
	let space = document.getElementById('espai');
	for (var i = 0; i < quantitat; i++) {
		space.removeChild(document.querySelector(".estrella:last-child"));
	}
}