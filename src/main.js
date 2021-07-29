import { createNavigationTemplate } from './view/site-menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createFiltersTemplate } from './view/filters';
import { createSortTemplate } from './view/sort';

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
//* Информация о путешествии (Маршрут и стоимость)
render(tripMainElement, createTripInfoTemplate(), 'afterbegin')

//* Фильтры
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
render(filtersElement, createFiltersTemplate(), 'beforeEnd')

//* Сортировка
const mainPageElement = document.querySelector('.page-body__page-main'),
  tripEventsElement = mainPageElement.querySelector('.trip-events');
  render(tripEventsElement, createSortTemplate(), 'beforeEnd')
