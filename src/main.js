import SiteMenuView from './view/site-menu';
import TripCostView from './view/trip-cost';
import FiltersView from './view/filters';
import TripInfoView from './view/trip-info';

import TripPresenter from './presenter/trip';

import PointsModel from './model/points';
import FilterModel from './model/filter.js';

import { generateWayPoint } from './mock/wayPoint';
import { generateHeaderInfo } from './mock/headerInfo';
import { render, RenderPosition } from './utils/render';


//* 20 тестовых компонентов поездок
const ELEMS__COUNT = 20;
const points = new Array(ELEMS__COUNT).fill().map(generateWayPoint);

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
render(filtersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

//* Информация о путешествии (Маршрут и города)
render(tripMainElement, new TripInfoView(generateHeaderInfo(points)).getElement(), RenderPosition.AFTERBEGIN);
//* Информация о путешествии (Стоимость)
const tripInfoElement = tripMainElement.querySelector('.trip-main__trip-info');
render(tripInfoElement, new TripCostView(generateHeaderInfo(points)).getElement(), RenderPosition.BEFOREEND);

//*Контейнер для точек маршрута
const mainPageElement = document.querySelector('.page-body__page-main'),
  tripEventsElement = mainPageElement.querySelector('.trip-events');
// const tripEventsList = tripEventsElement.querySelector('.trip-events__list');

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel);
tripPresenter.init();
