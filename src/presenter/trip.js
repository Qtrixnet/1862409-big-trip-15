import SortView from '../view/sort';
import TripEventsListView from '../view/trip-events-list';
import NoEventView from '../view/no-event';
import LoadingView from '../view/loading';
import PointPresenter from './point';
import PointNewPresenter from './point-new.js';
import { filter } from '../utils/filter';
import { remove, render, RenderPosition } from '../utils/render';
import {
  sortPointsByDay,
  sortPointsByTime,
  sortPointsByPrice
} from '../utils/tripPoint';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';

export default class Trip {
  constructor(tripEventsElementContainer, pointsModel, filterModel, api) {
    //* Главный контейнер с маршрутом путешествия
    this._tripEventsElementContainer = tripEventsElementContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;

    this._noEventComponent = new NoEventView();
    this._loadingComponent = new LoadingView();
    this._tripEventsListComponent = new TripEventsListView();

    this._pointPresenter = new Map();

    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._noTaskComponent = null;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointNewPresenter = new PointNewPresenter(
      this._tripEventsListComponent,
      this._handleViewAction,
    );
  }

  init() {
    //*Рендер контейнера для точек маршрута
    render(
      this._tripEventsElementContainer,
      this._tripEventsListComponent,
      RenderPosition.BEFOREEND,
    );
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderTrip();
  }

  destroy() {
    this._clearTrip({ resetSortType: true });

    remove(this._tripEventsListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredPoints.sort(sortPointsByTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortPointsByPrice);
      default:
        return filtredPoints.sort(sortPointsByDay);
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
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
        this._clearTrip({ resetSortType: true });
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip({ resetRenderedPointCount: true });
    this._renderTrip();
  }

  _renderSort() {
    //* Метод для рендеринга сортировки
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(
      this._tripEventsElementContainer,
      this._sortComponent,
      RenderPosition.AFTERBEGIN,
    );
  }

  _renderWayPoint(wayPoint) {
    const pointPresenter = new PointPresenter(
      this._tripEventsListComponent,
      this._handleViewAction,
      this._handleModeChange,
    );
    pointPresenter.init(wayPoint);
    this._pointPresenter.set(wayPoint.id, pointPresenter);
  }

  _renderWayPoints(points) {
    points.forEach((point) => this._renderWayPoint(point));
  }

  _renderWayPointsList() {
    const pointsCount = this._getPoints().length;
    const points = this._getPoints().slice(0, pointsCount);

    this._renderWayPoints(points);
  }

  _renderNoEvent() {
    //* Метод для рендеринга загрушки
    this._noEventComponent = new NoEventView(this._filterType);
    render(
      this._tripEventsElementContainer,
      this._noEventComponent,
      RenderPosition.BEFOREEND,
    );
  }

  _renderLoading() {
    //* Метод для рендеринга статуса
    render(
      this._tripEventsElementContainer,
      this._loadingComponent,
      RenderPosition.AFTERBEGIN,
    );
  }

  _clearTrip({ resetSortType = false } = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._sortComponent);
    remove(this._loadingComponent);

    if (this._noEventComponent) {
      remove(this._noEventComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoEvent();
      return;
    }

    this._clearTrip();
    this._renderSort();
    this._renderWayPoints(points);
  }
}
