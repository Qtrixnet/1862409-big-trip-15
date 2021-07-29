import { createNavigationTemplate } from './view/site-menu'

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

const headerElement = document.querySelector('.page-header'),
navigationElement = headerElement.querySelector('.trip-controls__navigation');

render(navigationElement, createNavigationTemplate(), 'beforeEnd')
