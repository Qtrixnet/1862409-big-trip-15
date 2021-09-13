import SiteMenuView from './view/site-menu';
import TripCostView from './view/trip-cost';
import TripInfoView from './view/trip-info';
import AddNewEventView from './view/new-event-button';

import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';

import PointsModel from './model/points';
import FilterModel from './model/filter.js';

import { generateWayPoint } from './mock/wayPoint';
import { generateHeaderInfo } from './mock/headerInfo';
import { render, RenderPosition } from './utils/render';
import { MenuItem, UpdateType, FilterType} from './const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic 2gshk7u43sgfhyur';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

//* 20 тестовых компонентов поездок
const ELEMS__COUNT = 20;
const points = new Array(ELEMS__COUNT).fill().map(generateWayPoint);

const api = new Api(END_POINT, AUTHORIZATION);

api.getTasks().then((tasks) => {
  console.log(tasks);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView();
const newEventButtonComponent = new AddNewEventView();

//*Хедер
//* Меню навигации
const headerElement = document.querySelector('.page-header'),
  navigationElement = headerElement.querySelector('.trip-controls__navigation');

render(navigationElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tripMainElement = headerElement.querySelector('.trip-main');

//* Фильтры
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');

//* Информация о путешествии (Маршрут и города)
render(tripMainElement, new TripInfoView(generateHeaderInfo(points)).getElement(), RenderPosition.AFTERBEGIN);
//* Информация о путешествии (Стоимость)
const tripInfoElement = tripMainElement.querySelector('.trip-main__trip-info');
render(tripInfoElement, new TripCostView(generateHeaderInfo(points)).getElement(), RenderPosition.BEFOREEND);
render(tripMainElement, newEventButtonComponent, RenderPosition.BEFOREEND);

//*Контейнер для точек маршрута
const mainPageElement = document.querySelector('.page-body__page-main'),
  tripEventsElement = mainPageElement.querySelector('.trip-events');


const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, pointsModel);

const handlePointNewFormClose = () => {
  newEventButtonComponent.getElement().disabled = false;
  newEventButtonComponent.setMenuItemToAddEvent();
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_EVENT:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      console.log('кнопка Add New Event')
      tripPresenter.createPoint(handlePointNewFormClose);
      newEventButtonComponent.getElement().disabled = true;
      // Скрыть статистику
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      break;
    case MenuItem.TABLE:
      console.log('кнопка Table')
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      console.log('кнопка Stats')
      // Скрыть доску
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
newEventButtonComponent.setButtonClickHandler(handleSiteMenuClick);


filterPresenter.init();
tripPresenter.init();
