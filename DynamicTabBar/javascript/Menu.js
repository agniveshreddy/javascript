const _sections = new WeakMap();
const _menuItems = new WeakMap();
const _panels = new WeakMap();
const _menuElement = new WeakMap();

class Menu {
    constructor(elementId) {
        _menuElement.set(this, document.querySelector('#' + elementId));
        _panels.set(this, [...document.querySelectorAll('.panel')]);
    }


    initializeMenu() {
        const menuElement = _menuElement.get(this);
        if (menuElement) {
            // @todo Add implementation
            // 1. get child nodes of menu element (buttons) - @tip querySelectorAll
            // 2. iterate over each button
            // 3. foreach button create Section object and MenuItem object
            // 4. tip: MenuItem onClickCallback, onDeactivateCallback

            const menuButtons = [...document.querySelectorAll('.accordion')];
            const menuItems = menuButtons.map((menuButton, index) => {
                const menuItem = new MenuItem(menuButton.id, (id) => {
                    this.deactivatePreviouslySelected();
                    this.setActive(id);
                }, () => {
                    this.hidePreviouslySelectedPanel();
                });
                return menuItem;
                //const section = new Section();
            });
            _menuItems.set(this, menuItems);

            const panels = _panels.get(this);
            const sections = panels.map((panel, index) => {
                const section = new Section(panel.id);
                return section;
            });
            _sections.set(this, sections);
        }
    }

    deactivatePreviouslySelected() {
        // @todo Add implementation
        // should call menuItem.deactivate() for active menu item

        const menuItems = _menuItems.get(this);
        const lastSelected = localStorage.getItem('lastSelected');
        const previouslySelectedItem = menuItems[lastSelected]
        if (previouslySelectedItem) {
            previouslySelectedItem.deactivate();
        }
    }

    setActive(menuItemId) {
        // @todo Add implementation
        // should call menuItem.activate() for given menu item

        const sequenceOfMenuItem = menuItemId.split('menuItem')[1];
        const indexOfSelected = sequenceOfMenuItem - 1;
        const menuItems = _menuItems.get(this);
        const sections = _sections.get(this);

        menuItems[indexOfSelected].activate();
        sections[indexOfSelected].show();
        localStorage.setItem('lastSelected', sequenceOfMenuItem - 1);
    }

    selectDefault(initialIndex) {
        // @todo Add implementation
        // should select default menu item (first one or last selected from Local storage)

        const sections = _sections.get(this);
        const menuItems = _menuItems.get(this);
        const intialIndex = 0;

        menuItems[intialIndex].activate();
        sections[intialIndex].show();
        localStorage.setItem('lastSelected', intialIndex);
    }

    hidePreviouslySelectedPanel() {
        const sections = _sections.get(this);
        const previouslySelectedSection = sections[localStorage.getItem('lastSelected')];
        if (previouslySelectedSection)
            previouslySelectedSection.hide();

    }
}
