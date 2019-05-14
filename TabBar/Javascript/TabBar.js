const targetWidth = 501;
const targetHeight = 680;
let currentLayout;
let layout;
const INITIAL_INDEX = 0;
const PORTABLE_SCREEN = "portable";
const WIDE_SCREEN = "wide";
const accordions = [...document.getElementsByClassName("accordion")];
const panels = [...document.getElementsByClassName("panel")];
const wrapper = document.getElementsByClassName("wrapper")[INITIAL_INDEX];
const footer = document.getElementsByTagName("footer")[INITIAL_INDEX];

function onResize(){
	screenW = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
	screenH = document.documentElement.clientHeight || document.body.clientHeight || window.innereight;
	if(screenW < targetWidth && screenH < targetHeight){
		layout = PORTABLE_SCREEN;
	}
	else{
		layout = WIDE_SCREEN;
	}
	switchLayouts();
}
function onLoad(){
	screenW = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
	screenH = document.documentElement.clientHeight || document.body.clientHeight || window.innereight;
	if(screenW < targetWidth && screenH < targetHeight){
		currentLayout = PORTABLE_SCREEN;
		setConfigForPortableScreen();
	}
	else{
		currentLayout = WIDE_SCREEN;
		setConfigForWideScreen();
	}
}

function switchLayouts(){
	if(layout === PORTABLE_SCREEN && currentLayout === WIDE_SCREEN){
		setConfigForPortableScreen();
	}
	else if(layout === WIDE_SCREEN && currentLayout === PORTABLE_SCREEN){
		setConfigForWideScreen();
	}
}

function setConfigForPortableScreen(){
	/**** set height for each panel suitable for portable screen mode ****/
	panels.forEach(panel => { 
		panel.style.height = (wrapper.clientHeight - (accordions.length * accordions[INITIAL_INDEX].clientHeight)) + "px";
	});
	/****  ****/
	/**** Show first Panel initially ****/
	const initialIndexFromLocalStorage = window.localStorage.getItem('panelIndex');
	const accToActivate = initialIndexFromLocalStorage ? accordions[initialIndexFromLocalStorage]: accordions[INITIAL_INDEX];
	accToActivate.classList.add("active");
	appendPanel(wrapper,panels,accordions, initialIndexFromLocalStorage? initialIndexFromLocalStorage: INITIAL_INDEX);
	/****  ****/
	
	accordions.forEach( (accTab, index) =>{
		/**** Adding event listener for each tab ****/
		accTab.addEventListener("click", function() {
			activateAccordion(accordions, this);
			appendPanel(wrapper,panels,accordions,index);
			window.localStorage.setItem('panelIndex', index);
		});
		/****  ****/
	});
	currentLayout = PORTABLE_SCREEN;
}

function setConfigForWideScreen(){
	/**** set height for each panel suitable for wide screen mode ****/
	panels.forEach(panel => {
		panel.style.height = (document.body.clientHeight - accordions[INITIAL_INDEX].clientHeight - footer.clientHeight -10) + "px";
	});
	/****  ****/

	/**** Show first Panel initially ****/
	const initialIndexFromLocalStorage = window.localStorage.getItem('panelIndex');
	const firstPanel = initialIndexFromLocalStorage ? panels[initialIndexFromLocalStorage]: panels[INITIAL_INDEX];
	firstPanel.classList.add("show");
	const accToActivate = initialIndexFromLocalStorage ? accordions[initialIndexFromLocalStorage]: accordions[INITIAL_INDEX];
	accToActivate.classList.add("active");
	/****  ****/

	accordions.forEach( (accTab, index) => {
	/**** Adding event listener for each tab ****/
		accTab.addEventListener("click", function() {
			activateAccordion(accordions, this);
			const activePanel = panels.find(panel => panel.classList.contains("show"));
			if(activePanel)
				activePanel.classList.remove("show");
			const panelToShow = panels[index];
			panelToShow.classList.add("show");
			window.localStorage.setItem('panelIndex', index);
	
		});
	/****  ****/
	});
	currentLayout = WIDE_SCREEN;
}

function activateAccordion(accordions, currentaccTab) {
	const activeaccTab = accordions.find(accTab => accTab.classList.contains("active"));
	if(activeaccTab)
		activeaccTab.classList.remove("active");
	currentaccTab.classList.add("active");
}

function appendPanel(wrapper,panels,accordions,index){
	const activePanel = panels.find(panel => panel.classList.contains("show"));
	if(activePanel){
		activePanel.classList.remove("show");
		activePanel.remove();
	}
    const panelToAppend = panels[index];
	panelToAppend.classList.add("show");
	wrapper.insertBefore(panelToAppend, accordions[Number(index)+1]);
}
