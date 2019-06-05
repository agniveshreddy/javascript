const _id = Symbol('_id');
const _menuButton = new WeakMap();

const _onClickCallback = new WeakMap();
const _onDeactivateCallback = new WeakMap();

class MenuItem {
	constructor(menuItemId, onClickCallback, onDeactivateCallback) {
		
		// this.menuItem = document.getElementById(menuItemId);
        // this.id = menuItemId;
        // @todo Add implementation
		
		_menuButton.set(this, document.querySelector('#'+menuItemId));
		this[_id] = menuItemId;
		_onClickCallback.set(this, {call: onClickCallback} );
		_onDeactivateCallback.set(this, {call: onDeactivateCallback} );
		this.addEventListeners();
	}

	addEventListeners(){
		
		// @todo Add implementation
        // add event listener for click
        // on click activate() should have been called

		const menuButton = _menuButton.get(this);
		menuButton.addEventListener('click',(event) => {
			if(!this.isActive())
			{
				const clickCallback = _onClickCallback.get(this);
				clickCallback.call(this[_id]);
			}
			else{
				// Everytime when user clicks on a new tab, at that moment, that particulr tab will always be in inactive state. 
				// So this code will be executed when user clicks again on active tab.
				const deactivateCallback = _onDeactivateCallback.get(this);
				deactivateCallback.call();
			}
				
		}, false);//By default useCapture is false. Fot the practice purpose, explicitly passing it.
	}

	isActive() {
		// @todo Add implementation
        // should return boolean
		
		const menuButton = _menuButton.get(this);
        return menuButton.classList.contains("active");
    }

    activate() {
        // @todo Add implementation
        // onClickCallback should have been called
        // should activate tab
		
		const menuButton = _menuButton.get(this);
		menuButton.classList.add('active');
    }

    deactivate() {
        // @todo Add implementation
        // onDeactivateCallback should have been called
        // should deactivate tab
		
		const menuButton = _menuButton.get(this);
		const deactivateCallback = _onDeactivateCallback.get(this);
		menuButton.classList.remove('active');
		deactivateCallback.call();
    }
	 
	 
}