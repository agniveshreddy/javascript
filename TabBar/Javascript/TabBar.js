const targetWidth = 501;
const targetHeight = 680;
let currentLayout;
let layout;
const INITIAL_INDEX = 0;
const PORTABLE_SCREEN = "portable";
const WIDE_SCREEN = "wide";
const accordions = [...document.getElementsByClassName("accordion")];
const sections = [...document.getElementsByClassName("panel")];
const wrapper = document.getElementsByClassName("wrapper")[INITIAL_INDEX];
const footer = document.getElementsByTagName("footer")[INITIAL_INDEX];

document.body.addEventListener('onresize', onResize);
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

	/**** Show first section initially ****/
	const initialIndexFromLocalStorage = localStorage.getItem('sectionIndex');
	const accToActivate = initialIndexFromLocalStorage ? accordions[initialIndexFromLocalStorage]: accordions[INITIAL_INDEX];
	accToActivate.classList.add("active");
	appendSection(wrapper,sections,accordions, initialIndexFromLocalStorage? initialIndexFromLocalStorage: INITIAL_INDEX);
	/****  ****/
	
	accordions.forEach( (accTab, index) =>{
		/**** Adding event listener for each tab ****/
		accTab.addEventListener("click", function() {
			activateAccordion(accordions, this);
			appendSection(wrapper,sections,accordions,index);
			localStorage.setItem('sectionIndex', index);
		});
		/****  ****/
	});
	currentLayout = PORTABLE_SCREEN;
}

function setConfigForWideScreen(){

	/**** Show first section initially ****/
	const initialIndexFromLocalStorage = localStorage.getItem('sectionIndex');
	const firstSection = initialIndexFromLocalStorage ? sections[initialIndexFromLocalStorage]: sections[INITIAL_INDEX];
	firstSection.classList.add("show");
	const accToActivate = initialIndexFromLocalStorage ? accordions[initialIndexFromLocalStorage]: accordions[INITIAL_INDEX];
	accToActivate.classList.add("active");
	/****  ****/

	accordions.forEach( (accTab, index) => {
	/**** Adding event listener for each tab ****/
		accTab.addEventListener("click", function() {
			activateAccordion(accordions, this);
			const activeSection = sections.find(section => section.classList.contains("show"));
			if(activeSection)
				activeSection.classList.remove("show");
			const sectionToShow = sections[index];
			sectionToShow.classList.add("show");
			localStorage.setItem('sectionIndex', index);
	
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

function appendSection(wrapper,sections,accordions,index){
	const activeSection = sections.find(section => section.classList.contains("show"));
	if(activeSection){
		activeSection.classList.remove("show");
		activeSection.remove();
	}
    const sectionToAppend = sections[index];
	sectionToAppend.classList.add("show");
	wrapper.insertBefore(sectionToAppend, accordions[Number(index)+1]);
}
