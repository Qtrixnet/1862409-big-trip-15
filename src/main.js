import SiteMenuView from './view/site-menu';
import TripCostView from './view/trip-cost';
import TripInfoView from './view/trip-info';

import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';

import PointsModel from './model/points';
import FilterModel from './model/filter.js';

import { generateWayPoint } from './mock/wayPoint';
import { generateHeaderInfo } from './mock/headerInfo';
import { render, RenderPosition } from './utils/render';

//* 20 тестовых компонентов поездок
const ELEMS__COUNT = 20;
const points = new Array(ELEMS__COUNT).fill().map(generateWayPoint);

// const filters = [
//   {
//     type: 'everything',
//     name: 'EVERYTHING',
//   },
//   {
//     type: 'future',
//     name: 'FUTURE',
//   },
//   {
//     type: 'past',
//     name: 'PAST',
//   },
// ];

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

//*Хедер
//* Меню навигации
const headerElement = document.querySelector('.page-header'),
  navigationElement = headerElement.querySelector('.trip-controls__navigation');

render(navigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const tripMainElement = headerElement.querySelector('.trip-main');

//* Фильтры
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
// render(filtersElement, new FiltersView(filters, 'everything').getElement(), RenderPosition.BEFOREEND);

//* Информация о путешествии (Маршрут и города)
render(tripMainElement, new TripInfoView(generateHeaderInfo(points)).getElement(), RenderPosition.AFTERBEGIN);
//* Информация о путешествии (Стоимость)
const tripInfoElement = tripMainElement.querySelector('.trip-main__trip-info');
render(tripInfoElement, new TripCostView(generateHeaderInfo(points)).getElement(), RenderPosition.BEFOREEND);

//*Контейнер для точек маршрута
const mainPageElement = document.querySelector('.page-body__page-main'),
  tripEventsElement = mainPageElement.querySelector('.trip-events');
// const tripEventsList = tripEventsElement.querySelector('.trip-events__list');

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();
