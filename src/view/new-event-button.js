import AbstractView from './abstract';

const createAddNewEventButtonTemplate = () => '<button id="ADD_NEW_EVENT" class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class AddNewEvent extends AbstractView {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createAddNewEventButtonTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.id);
  }

  setMenuItemToAddEvent() {
    const item = this.getElement();

    if (item !== null) {
      item.checked = true;
    }
  }

  setButtonClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }
}
