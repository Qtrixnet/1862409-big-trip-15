import { createNavigationTemplate } from './view/site-menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createFiltersTemplate } from './view/filters';
import { createSortTemplate } from './view/sort';
import { createEventsListTemplate } from './view/trip-events-list';
import { createEventsItemTemplate } from './view/trip-events-item';
import { createTripCostTemplate } from './view/trip-cost';
import { createEventEditFormTemplate } from './view/event-edit-form';
// import { createEventCreateFormTemplate } from './view/event-create-form';
import { generateWayPoint } from './mock/wayPoint';
import { generateHeaderInfo } from './mock/headerInfo';


//* Функция рендера блоков
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

//* 20 тестовых компонентов поездок
const ELEMS__COUNT = 20;
const wayPoints = new Array(ELEMS__COUNT).fill().map(generateWayPoint);

//* Хедер
//* Меню навигации
const headerElement = document.querySelector('.page-header'),
  navigationElement = headerElement.querySelector('.trip-controls__navigation');

render(navigationElement, createNavigationTemplate(), 'beforeEnd');

const tripMainElement = headerElement.querySelector('.trip-main');

//* Информация о путешествии (Маршрут и города)
render(tripMainElement, createTripInfoTemplate(generateHeaderInfo(wayPoints)), 'afterbegin');

//* Информация о путешествии (Стоимость)
const tripInfoElement = tripMainElement.querySelector('.trip-main__trip-info');

render(tripInfoElement, createTripCostTemplate(generateHeaderInfo(wayPoints)), 'beforeEnd');

//* Фильтры
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');

render(filtersElement, createFiltersTemplate(), 'beforeEnd');

//* Сортировка
const mainPageElement = document.querySelector('.page-body__page-main'),
  tripEventsElement = mainPageElement.querySelector('.trip-events');

render(tripEventsElement, createSortTemplate(), 'beforeEnd');

//* Контент (путешествия)
render(tripEventsElement, createEventsListTemplate(), 'beforeEnd');

const tripEventsList = tripEventsElement.querySelector('.trip-events__list');


//* Форма создания точки маршрута
// render(tripEventsList, createEventCreateFormTemplate(wayPoints[0]), 'beforeEnd');

//* Отрисовываем первый элемент списка (форму редактирования)
render(tripEventsList, createEventEditFormTemplate(wayPoints[0]), 'beforeEnd');

for (let i = 1; i < ELEMS__COUNT; i++) {
  //* Отрисовываем остальные элементы
  render(tripEventsList, createEventsItemTemplate(wayPoints[i]), 'beforeEnd');
}

