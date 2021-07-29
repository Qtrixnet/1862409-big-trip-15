import { createNavigationTemplate } from './view/site-menu'
import { createTripInfoTemplate } from './view/trip-info'

//* Функция рендера блоков
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

//* Меню навигации
const headerElement = document.querySelector('.page-header'),
  navigationElement = headerElement.querySelector('.trip-controls__navigation');

render(navigationElement, createNavigationTemplate(), 'beforeEnd')

//* Информация о путешествии (Маршрут и стоимость)
const tripMainElement = document.querySelector('.trip-main');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin')
