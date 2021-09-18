import SiteMenuView from './view/site-menu';
import TripCostView from './view/trip-cost';
import TripInfoView from './view/trip-info';
import AddNewEventView from './view/new-event-button';
import StatsView from './view/stats';

import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';

import PointsModel from './model/points';
import FilterModel from './model/filter.js';

import { remove, render, RenderPosition } from './utils/render';
import { MenuItem, UpdateType, FilterType } from './const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic 2s323234u43s3gfhyur';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();
const newEventButtonComponent = new AddNewEventView();

//*Хедер
//* Меню навигации
const headerElement = document.querySelector('.page-header'),
  navigationElement = headerElement.querySelector('.trip-controls__navigation');

render(navigationElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tripMainElement = headerElement.querySelector('.trip-main');
render(tripMainElement, newEventButtonComponent, RenderPosition.BEFOREEND);

//* Фильтры
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');

//*Контейнер для точек маршрута
const mainPageElement = document.querySelector('.page-body__page-main'),
  tripEventsElement = mainPageElement.querySelector('.trip-events');

const pageBodyContainerElement = document.querySelector('.page-body__stats-container');

const handlePointNewFormClose = () => {
  newEventButtonComponent.getElement().disabled = false;
  newEventButtonComponent.setMenuItemToAddEvent();
};

const filterPresenter = new FilterPresenter(
  filtersElement,
  filterModel,
  pointsModel,
);
filterPresenter.init();
const tripPresenter = new TripPresenter(
  tripEventsElement,
  pointsModel,
  filterModel,
  api,
);
tripPresenter.init();
let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      tripPresenter.createPoint(handlePointNewFormClose);
      newEventButtonComponent.getElement().disabled = true;
      break;
    case MenuItem.TABLE:
      tripPresenter.init();
      remove(statisticsComponent);
      newEventButtonComponent.getElement().disabled = false;
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statisticsComponent ? remove(statisticsComponent) : '';
      statisticsComponent = new StatsView(pointsModel.getPoints());
      render(pageBodyContainerElement, statisticsComponent, RenderPosition.AFTERBEGIN);
      newEventButtonComponent.getElement().disabled = true;

      break;
  }
};

Promise.all([api.getPoints(), api.getDestinations(), api.getOffers()])
  .then((points) => {
    const newPoints = points[0].map((point) => {
      const adaptedPoint = Object.assign({}, point, {
        citiesList: points[1],
        allOffers: points[2],
      });
      return adaptedPoint;
    });

    pointsModel.setPoints(UpdateType.INIT, newPoints);

    render(
      tripMainElement,
      new TripInfoView(newPoints).getElement(),
      RenderPosition.AFTERBEGIN,
    );
    const tripInfoElement = tripMainElement.querySelector(
      '.trip-main__trip-info',
    );

    render(
      tripInfoElement,
      new TripCostView(newPoints).getElement(),
      RenderPosition.BEFOREEND,
    );

    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    newEventButtonComponent.setButtonClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    newEventButtonComponent.setButtonClickHandler(handleSiteMenuClick);
  });
