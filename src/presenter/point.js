import TripEventsItemView from '../view/trip-events-item';
import EventEditFormView from '../view/event-form';
import { render, RenderPosition, replace, remove } from '../utils/render';
import { UserAction, UpdateType, State } from '../const';
import { Mode } from '../const';

export default class Point {
  constructor(pointsListContainer, changeData, changeMode) {
    this._wayPointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventItemComponent = null;
    this._eventEditFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(wayPoint) {
    this._wayPoint = wayPoint;

    const prevEventItemComponent = this._eventItemComponent;
    const prevEventEditFormComponent = this._eventEditFormComponent;

    this._eventItemComponent = new TripEventsItemView(wayPoint);
    this._eventEditFormComponent = new EventEditFormView(wayPoint, [1, 2, 3]);

    this._eventItemComponent.setEditClickHandler(this._handleEditClick);
    this._eventItemComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditFormComponent.setFormCloseHandler(this._handleFormSubmit);
    this._eventEditFormComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevEventItemComponent === null || this._eventEditFormComponent === null) {
      render(this._wayPointsListContainer, this._eventItemComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventItemComponent, prevEventItemComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventItemComponent, prevEventEditFormComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevEventItemComponent);
    remove(prevEventEditFormComponent);
  }

  destroy() {
    remove(this._eventItemComponent);
    remove(this._eventEditFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToItem();
    }
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._eventEditFormComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditFormComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._eventEditFormComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._eventItemComponent.shake(resetFormState);
        this._eventEditFormComponent.shake(resetFormState);
        break;
    }
  }

  _replaceItemToForm() {
    replace(this._eventEditFormComponent, this._eventItemComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToItem() {
    replace(this._eventItemComponent, this._eventEditFormComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToItem();
      this._mode = Mode.DEFAULT;
    }
  }

  _handleEditClick() {
    this._replaceItemToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._wayPoint,
        {
          isFavorite: !this._wayPoint.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(update) {
    this._changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MAJOR,
      update,
    );
    this._replaceFormToItem();
  }

  _handleDeleteClick(point) {
    this._changeData(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      point,
    );
  }
}
