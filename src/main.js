import { createNavigationTemplate } from './view/site-menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createFiltersTemplate } from './view/filters';
import { createSortTemplate } from './view/sort';
import { createEventsListTemplate } from './view/trip-events-list';
import { createEventsItemTemplate } from './view/trip-events-item';
import { createLoadingsTemplate } from './view/loading';
import { createTripCostTemplate } from './view/trip-cost';

//* Функция рендера блоков
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

//* Хедер
//* Меню навигации
const headerElement = document.querySelector('.page-header'),
  navigationElement = headerElement.querySelector('.trip-controls__navigation');

render(navigationElement, createNavigationTemplate(), 'beforeEnd')

const tripMainElement = headerElement.querySelector('.trip-main')
//* Информация о путешествии (Маршрут и города)
render(tripMainElement, createTripInfoTemplate(), 'afterbegin')
//* Информация о путешествии (Стоимость)
const tripInfoElement = tripMainElement.querySelector('.trip-main__trip-info')
render(tripInfoElement, createTripCostTemplate(), 'beforeEnd')

//* Фильтры
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
render(filtersElement, createFiltersTemplate(), 'beforeEnd')

//* Сортировка
const mainPageElement = document.querySelector('.page-body__page-main'),
  tripEventsElement = mainPageElement.querySelector('.trip-events');

render(tripEventsElement, createSortTemplate(), 'beforeEnd')

//* Контент (путешествия)
render(tripEventsElement, createEventsListTemplate(), 'beforeEnd')

const tripEventsList = tripEventsElement.querySelector('.trip-events__list')

//* 3 тестовых компонентов поездок, для наглядности
for (let i = 0; i < 3; i++) {
  render(tripEventsList, createEventsItemTemplate(), 'beforeEnd')
}
