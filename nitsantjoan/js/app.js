window.onload = () => {
	let estrelles = localStorage.getItem('number');
	let distancia = parseInt(localStorage.getItem('distance'));
	let radi = parseInt(localStorage.getItem('size'));
	eventRangeInputs_change();
	arr_estrelles = groupEstrelles(estrelles);
	setSize(arr_estrelles, distancia,radi);
	arr_check = getIncorrectStars(arr_estrelles);
	checkDistance(arr_check, arr_estrelles);
	printEstrelles(arr_estrelles);
}

// mante actualitzats els valors dels inputs
function eventRangeInputs_change(){
	let element = document.querySelector("form > input");
	element.value = localStorage.getItem(element.name);
	document.querySelector("."+element.name).textContent = localStorage.getItem(element.name);
	element.addEventListener('change', () =>{
		localStorage.setItem(element.name, element.value);
		document.querySelector("."+element.name).textContent = localStorage.getItem(element.name);
	});
}

/**
 * CLASS ESTRELLA 
 * 
 */
function groupEstrelles(quantitat){
	arr_estrelles = [];
	for (var i = 0; i < quantitat; i++) {
		arr_estrelles[i] = new Estrella(i); 
	}
	return arr_estrelles;
}
function Estrella(id){
	this.id = id;
	this.radi = 1;
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

function setSize(arr_estrelles, distancia, radi){
	for (var radi_px = 0; radi_px < radi-1; radi_px++) {
		for (var i = 0; i < arr_estrelles.length; i++) {
			let radi = arr_estrelles[i].radi;
			let top = arr_estrelles[i].top;
			let left = arr_estrelles[i].left;
			let pot_creixre = true;
			arr_estrelles.forEach(star => {
				if (arr_estrelles[i].id!=star.id) {
					if (top>star.top){
						if (top-star.top < distancia+radi+star.radi) { //no pot creixer per Y (estrella avall)
							if (left>star.left) {
								if (left-star.left < distancia+radi+star.radi+1) { //no pot creixer per X (estrella dreta)
									pot_creixre = false;
								}
							}else{//left < star.left
								if (star.left-left<distancia+radi+star.radi+1) { //no pot creixer per X (estrella esquerra)
									pot_creixre = false
								}
							}
						}
					}else{//top<star.top
						if (star.top-top < distancia+radi+star.radi) { //no pot creixer per Y (estrella amunt)
							if (left > star.left) {
								if (left-star.left < distancia+radi+star.radi+1) { //no pot creixer per X (estrella dreta)
									pot_creixre = false;
								}
							}else{//left < star.left
								if (star.left-left<distancia+radi+star.radi+1) { //no pot creixer per X (estrella esquerra)
									pot_creixre = false
								}
							}
						}
					}
				}
			});
			if (pot_creixre) arr_estrelles[i].radi++;
		}
	}

}

function checkDistance(arr_stars2Check, arr_all_stars){
	let arr_checkAgain = [] // saves stars that need to be checked again
	let position = 0
	arr_stars2Check.forEach(star =>{
		if (star_has_other_near(star, arr_all_stars)) {
			arr_checkAgain[position] = star;
			position++;
		}
	});
	/*console.log(arr_checkAgain);*/
	if (arr_checkAgain.length>0) checkDistance(arr_checkAgain, arr_all_stars);
}
function star_has_other_near(star, arr_all_stars){
	let distancia = localStorage.getItem('distance');
	let radi = star.radi;
	let top = star.top;
	let left = star.left;
	let bool = false;
	arr_all_stars.forEach(all => {
		space = [30,30,30,30];// [top, left, right, down] saves the nearest star in each direction
		if (star.id != all.id) {
			if (top>all.top) { // te una estrella sobre
				if (top-all.top<distancia-2) {
					separacio = top-all.top-distancia;
					if (space[0]>separacio+all.radi+1){
						space[0]=separacio+all.radi+1;
					} 
				}
			}else{ // te una estrella sota
				if (all.top-top<12) {
					separacio = all.top-top-distancia;
					if (space[3]>separacio+all.radi+1){
						space[3]=separacio+all.radi+1;
					} 
				}				
			}
			if (left>all.left) { // te una estrella a l'esquerra
				if (left-all.left<12) {
					separacio = left-all.left-distancia;
					if (space[1]>separacio+all.radi+1){
						space[1]=separacio+all.radi+1;
					} 
				}
			}else{ // te una estrella a la dreta
				if (left.all-left<12) {
					separacio = all.left-left-distancia;
					if (space[2]>separacio+all.radi+1){
						space[2]=separacio+all.radi+1;
					} 
				}				
			}
		}
		costats = 0;
		creixre = 0;
		for (var i = 0; i < space.length; i++) {
			if(space[i]<0){
				costats = costats +1;
			}else{creixre=i}
		}
		if (costats==4) {
			this.top = Math.floor(Math.random() * 600) + 20;
			this.left = Math.floor(Math.random() * 1250) + 20;
			bool = true;
		}else if (costats == 0) bool = false;
		else if (costats<4) {
			if (creixre == 0) star.top = star.top + space[0];
			if (creixre == 1) star.top = star.top + space[1];
			if (creixre == 2) star.left = star.left - space[2];
			if (creixre == 3) star.left = star.left - space[3];
			bool = true;
		}
	});
	return bool;
}

function getIncorrectStars(arr_estrelles){
	let arr_incorrectStars = [];
	let position = 0;
	for (var i = 0; i < arr_estrelles.length; i++) {
		if(arr_estrelles[i].radi == 1) {
			arr_incorrectStars[position]=arr_estrelles[i];
			position++
		}
	}
	return arr_incorrectStars;
}