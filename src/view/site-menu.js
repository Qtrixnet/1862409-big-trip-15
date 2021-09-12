import AbstractView from './abstract';

const createNavigationTemplate = () =>
  `<nav class="trip-controls__trip-tabs trip-tabs">
    <a id="TABLE" class="trip-tabs__btn trip-tabs__btn--active" href="#">Table</a>
    <a id="STATS" class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;

export default class SiteMenu extends AbstractView {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`#${menuItem}]`);
    console.log(item);

    if (item !== null) {
      item.checked = true;
    }
  }
}

