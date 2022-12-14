window.onload = () => {
	//familia
	onloadFamilia();

	//codi
	document.getElementsByName("codi")[0].addEventListener('change', () =>{
		checkCodiFormat();
	});

	//dimentions
	let arr_dimentions = document.getElementsByName('dimentions');
	arr_dimentions.forEach(dim => dim.addEventListener('change', () => checkDimentions(arr_dimentions)));

	//ubicacio
	checkUbicacio('passadis', '^P-[0-9]{2}-E|P-[0-9]{2}-D$');
	checkUbicacio('estanteria','^EST[+]{1}[0-9]{2}.[0-9]{2}$');
	checkUbicacio('forat','^[0-9]{2}[a-z]{3}[0-9]{2}[\\\\]{1}[0-9]{2}$');

	submit();
}


/*
* GENERAL FUNCTIONS
*
*/
function submit(){
	let btn_submit = document.querySelector("input[name='submit']");
	btn_submit.addEventListener('click', () => {
		if (checkCodiFormat()) labelComprovacio("cmp_codi", document.getElementsByName("codi")[0].value);
		labelComprovacio("cmp_name", document.getElementsByName("nom")[0].value);
		if (checkDimentions(document.getElementsByName('dimentions'))) labelComprovacio("cmp_dimensions", document.getElementById("dim_result").textContent);
		labelComprovacio("cmp_passadis", document.getElementsByName("passadis")[0].value);
		labelComprovacio("cmp_estanteria", document.getElementsByName("estanteria")[0].value);
		labelComprovacio("cmp_forat", document.getElementsByName("forat")[0].value);
	})
}
/*
* checks a regular expresion
* @return -> Boolean
*/
function regex(regex_str, element_to_check){
	let regex = new RegExp(regex_str,"i");
	return regex.test(element_to_check)
}
/*
* @arr -> bool (regex correct = true)
* @arr -> element (DOM <i> element to modify)
*/
function validation(regex_str, value, element){
	let bool = regex(regex_str, value);
	//labelComprovacio(bool, name, value);
	element.setAttribute("class", "")
	if (bool) element.setAttribute("class", "fa-solid fa-circle-check");
	else element.setAttribute("class", "fa-solid fa-circle-xmark");
	return bool
}
function labelComprovacio(name, value){
	let label = document.createElement("label");
	label.appendChild(document.createTextNode(name.substring(4)+": "+value));
	label.setAttribute('name', name);
	document.querySelector(".comprovacio").appendChild(label);
	document.querySelector(".comprovacio").appendChild(document.createElement("br"));
}
/*
* END GENERAL FUNCTIONS
*/

function onloadFamilia(){
	//array available items
	const array_articles = ['llibre','agenda','llapis'];

	//for each item adds an option label child
	let options_familia="";
	array_articles.forEach(article => options_familia = options_familia+"<option>"+article+"</option>");
	
	document.getElementsByTagName("select")[0].innerHTML = options_familia;	
	labelComprovacio("cmp_familia", document.getElementsByTagName("select")[0].value);
};

/*
*	CODI FUNCTIONS
*/
// @return char
function getCharValidation(){
	let array_key_char = ['a','x','m','t','b','c','s','o','p','z'];
	let id_key_char = 0;
	// sum all numbers and returns the char equal to their mod 10 --> array_key_char[(1+2+3)%10]
	for(i = 4; i<11; i++){
		id_key_char = id_key_char + parseInt(document.getElementsByName("codi")[0].value.substring(i,i+1));
	}
	return array_key_char[id_key_char%10];
};

function checkCodiFormat(){
	let primeresLletres = document.getElementsByTagName("select")[0].value.substring(0,3);
	key_char = getCharValidation();
	// if regex expression is correct -> tick; else -> cross
	let codi_value = document.getElementsByName("codi")[0].value;
	return validation('^'+primeresLletres+'-[0-9]{7}-'+key_char+'$',codi_value, document.querySelector(".codi > i"))
};
/*
*	END CODI FUNCTIONS
*/

function checkDimentions(arr_dimentions){
	document.getElementById('dim_result').innerHTML = "";
	correcte = true;
	for (var i = 0; i < arr_dimentions.length; i++) {
		if (isNaN(arr_dimentions[i].value) || arr_dimentions[i].value == "" || arr_dimentions[i].value<0){
			correcte = false;
		}
	}
	if (correcte) {
		let str_dimentions_result = arr_dimentions[0].value+"x"+arr_dimentions[1].value+"x"+arr_dimentions[2].value;
		document.getElementById('dim_result').innerHTML = str_dimentions_result;
		//labelComprovacio("cmp_dimentions", str_dimentions_result);
	}
	return correcte;
};
// check passadis, estanteria i forat
function checkUbicacio(input_name, regex){
	let input_forat = document.getElementsByName(input_name)[0];
	input_forat.addEventListener('change', () => {
		return validation(regex, input_forat.value, document.querySelector("#i_"+input_name), "cmp_"+input_name);
	});
}
