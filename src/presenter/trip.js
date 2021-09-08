import SortView from '../view/sort';
import TripEventsListView from '../view/trip-events-list';
import NoEventView from '../view/no-event';
import PointPresenter from './point';
import { remove, render, RenderPosition } from '../utils/render';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../utils/tripPoint';
import { SortType, UpdateType, UserAction } from '../const.js';

export default class Trip {
  constructor(tripEventsElementContainer, pointsModel) {
    //* Главный контейнер с маршрутом путешествия
    this._tripEventsElementContainer = tripEventsElementContainer;
    this._pointsModel = pointsModel;

    // this._sortComponent =  new SortView();
    this._noEventComponent = new NoEventView();
    this._tripEventsListComponent = new TripEventsListView();
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = null;

    // this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    //*Рендер контейнера для точек маршрута
    render(this._tripEventsElementContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _getPoints() {
    switch(this._currentSortType) {
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortPointsByTime);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortPointsByPrice);
    }
    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  // _handlePointChange(updatedWayPoint) {
  //   this._pointPresenter.get(updatedWayPoint.id).init(updatedWayPoint);
  // }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetRenderedPointCount: true, resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip({resetRenderedPointCount: true});
    this._renderTrip();
  }

  _renderSort() {
    //* Метод для рендеринга сортировки
    // render(this._tripEventsElementContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    if(this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripEventsElementContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderWayPoint(wayPoint) {
    const pointPresenter = new PointPresenter(this._tripEventsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(wayPoint);
    this._pointPresenter.set(wayPoint.id, pointPresenter);
  }

  _renderWayPoints(points) {
    points.forEach((point) => this._renderWayPoint(point));
  }

  _renderWayPointsList(){
    const pointsCount = this._getPoints().length;
    const points = this._getPoints().slice(0, pointsCount);

    this._renderWayPoints(points);
  }

  _renderNoEvent() {
    //* Метод для рендеринга загрушки
    render(this._tripEventsElementContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetRenderedPointCount = false, resetSortType = false} = {}) {
    const pointCount = this._getPoints().length;

    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._sortComponent);
    // remove(this._noPointComponent);

    if(resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    //* Метод для начала работы модуля
    const points = this._getPoints();
    const pointCount = points.length;

    if(pointCount === 0) {
      this._renderNoEvent();
      return;
    }

    this._renderSort();

    // this._renderWayPointsList();

    this._renderWayPoints(points.slice(0, pointCount));

  }

}
