import TripEventsItemView from '../view/trip-events-item';
import EventEditFormView from '../view/event-edit-form';
import { render, RenderPosition, replace, remove } from '../utils/render';

export default class Point {
  constructor(wayPointsListContainer) {
    this._wayPointsListContainer = wayPointsListContainer;

    this._eventItemComponent = null;
    this._eventEditFormComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(wayPoint) {
    this._wayPoint = wayPoint;

    const prevEventItemComponent = this._eventItemComponent;
    const prevEventEditFormComponent = this._eventEditFormComponent;

    this._eventItemComponent = new TripEventsItemView(wayPoint);
    this._eventEditFormComponent = new EventEditFormView(wayPoint);

    this._eventItemComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditFormComponent.setFormCloseHandler(this._handleFormSubmit);



    if(prevEventItemComponent === null || this._eventEditFormComponent === null) {
      render(this._wayPointsListContainer, this._eventItemComponent, RenderPosition.BEFOREEND);
      return
    }

    if(this._wayPointsListContainer.getElement().contains(prevEventItemComponent.getElement())) {
      replace(this._eventItemComponent, prevEventItemComponent);
    }

    if(this._wayPointsListContainer.getElement().contains(prevEventEditFormComponent.getElement())) {
      replace(this._eventEditFormComponent, prevEventEditFormComponent);
    }

    remove(prevEventItemComponent)
    remove(prevEventEditFormComponent)
  }

  destroy(){
    remove(this._eventItemComponent)
    remove(this._eventEditFormComponent)
  }

  _replaceItemToForm() {
    replace(this._eventEditFormComponent, this._eventItemComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToItem() {
    replace(this._eventItemComponent, this._eventEditFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToItem();
    }
  }

  _handleEditClick() {
    this._replaceItemToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToItem();
  }
}
