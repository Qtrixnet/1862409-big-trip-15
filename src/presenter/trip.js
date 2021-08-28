import SortView from '../view/sort';
import TripEventsListView from '../view/trip-events-list';
import NoEventView from '../view/no-event';
import PointPresenter from './point';
import { render, RenderPosition } from '../utils/render';
import { updateItem } from '../utils/common.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../utils/tripPoint';
import { SortType } from '../const.js';

export default class Trip {
  constructor(tripEventsElementContainer) {
    //* Главный контейнер с маршрутом путешествия
    this._tripEventsElementContainer = tripEventsElementContainer;

    this._sortComponent =  new SortView();
    this._noEventComponent = new NoEventView();
    this._tripEventsListComponent = new TripEventsListView();
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(wayPoints) {
    this._wayPoints = wayPoints.slice().sort(sortPointsByDay);
    this._sourcedWayPoints = wayPoints.slice();
    //*Рендер контейнера для точек маршрута
    render(this._tripEventsElementContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedWayPoint) {
    this._wayPoints = updateItem(this._wayPoints, updatedWayPoint);
    this._sourcedWayPoints = updateItem(this._sourcedWayPoints, updatedWayPoint);
    this._pointPresenter.get(updatedWayPoint.id).init(updatedWayPoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._wayPoints.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        this._wayPoints.sort(sortPointsByPrice);
        break;
      default:
        this._wayPoints.sort(sortPointsByDay);
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortPoints(sortType);
    this._clearTrip();
    this._renderTrip();
  }

  _renderSort() {
    //* Метод для рендеринга сортировки
    render(this._tripEventsElementContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderWayPoint(wayPoint) {
    const pointPresenter = new PointPresenter(this._tripEventsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(wayPoint);
    this._pointPresenter.set(wayPoint.id, pointPresenter);
  }

  _renderWayPoints(from, to) {
    this._wayPoints
      .slice(from, to)
      .forEach((wayPoint) => this._renderWayPoint(wayPoint));
  }

  _renderWayPointsList(){
    this._renderWayPoints(0, this._wayPoints.length);
  }

  _renderNoEvent() {
    //* Метод для рендеринга загрушки
    render(this._tripEventsElementContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderTrip() {
    //* Метод для начала работы модуля
    if(this._wayPoints.length === 0) {
      render(this._tripEventsElementContainer, this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }
    this._renderSort();
    this._renderWayPointsList();
  }

}
