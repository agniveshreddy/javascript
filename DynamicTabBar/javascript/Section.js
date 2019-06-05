const _sectionElement = new WeakMap();

class Section {
    constructor(sectionId) {
		// this.sectionElement = document.getElementById(sectionId);
		
		_sectionElement.set(this, document.getElementById(sectionId));
    }

    show() {
		// @todo Add implementation
		
		const sectionElement = _sectionElement.get(this);
        sectionElement.classList.add('show');
    }

    hide() {
		// @todo Add implementation
		
		const sectionElement = _sectionElement.get(this);
        sectionElement.classList.remove('show');
    }
}