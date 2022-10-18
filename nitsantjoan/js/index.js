window.onload = () => {
	eventRangeInputs_change();
}

// mante actualitzats els valors dels inputs
function eventRangeInputs_change(){
	let input = document.querySelectorAll("form > input");
	input.forEach(element => {
		createLocalStorage(element);
		setLabelValue(element);
		element.addEventListener('change', () => {
			localStorage.setItem(element.name, element.value);
			document.querySelector("."+element.name).textContent = localStorage.getItem(element.name);
		})
	});
}
function setLabelValue(element){
	element.value = localStorage.getItem(element.name);
	document.querySelector("."+element.name).textContent = localStorage.getItem(element.name);
}
function createLocalStorage(item){
	if (localStorage.getItem(item.name) === null) {
		localStorage.setItem(item.name, item.value)
	}
}