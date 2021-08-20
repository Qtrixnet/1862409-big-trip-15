import SiteMenuView from './view/site-menu';
import SortView from './view/sort';
import TripCostView from './view/trip-cost';
import FiltersView from './view/filters';
import TripEventsListView from './view/trip-events-list';
import TripInfoView from './view/trip-info';
import TripEventsItem from './view/trip-events-item';
import EventEditFormView from './view/event-edit-form';
import NoEventView from './view/no-event';
// import EventCreateFormView from './view/event-create-form';

import { generateWayPoint } from './mock/wayPoint';
import { generateHeaderInfo } from './mock/headerInfo';
import { render, RenderPosition } from './utils';

//* 20 тестовых компонентов поездок
const ELEMS__COUNT = 20;
const wayPoints = new Array(ELEMS__COUNT).fill().map(generateWayPoint);

//* Хедер
//* Меню навигации
const headerElement = document.querySelector('.page-header'),
  navigationElement = headerElement.querySelector('.trip-controls__navigation');

render(navigationElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const tripMainElement = headerElement.querySelector('.trip-main');

//* Фильтры
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
render(filtersElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);

//* Сортировка
const mainPageElement = document.querySelector('.page-body__page-main'),
  tripEventsElement = mainPageElement.querySelector('.trip-events');

//* Контент (путешествия)
render(tripEventsElement, new TripEventsListView().getElement(), RenderPosition.BEFOREEND);

//* Форма создания точки маршрута
// render(tripEventsList, new EventCreateFormView(wayPoints[0]).getElement(), RenderPosition.BEFOREEND);

if(ELEMS__COUNT === 0) {
  render(tripEventsElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
} else {
  //* Информация о путешествии (Маршрут и города)
  render(tripMainElement, new TripInfoView(generateHeaderInfo(wayPoints)).getElement(), RenderPosition.AFTERBEGIN);
  //* Информация о путешествии (Стоимость)
  const tripInfoElement = tripMainElement.querySelector('.trip-main__trip-info');
  render(tripInfoElement, new TripCostView(generateHeaderInfo(wayPoints)).getElement(), RenderPosition.BEFOREEND);
  const tripEventsList = tripEventsElement.querySelector('.trip-events__list');
  render(tripEventsElement, new SortView().getElement(), RenderPosition.AFTERBEGIN);
  const renderEventItem = (tripEventsListContainer, wayPoint) => {

    //* Создаем экземпляры классов точки маршрута и формы редактирвоания
    const eventItemComponent = new TripEventsItem(wayPoint);
    const eventEditFormComponent = new EventEditFormView(wayPoint);

    //* Создаем функции замены DOM элементов
    const replaceItemToFrom = () => {
      tripEventsListContainer.replaceChild(eventEditFormComponent.getElement(), eventItemComponent.getElement());
    };
    const replaceFormToItem = () => {
      tripEventsListContainer.replaceChild(eventItemComponent.getElement(), eventEditFormComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    //* Навешиваем обработчики на кнопки
    eventItemComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceItemToFrom();
      document.addEventListener('keydown', onEscKeyDown);
    });
    eventEditFormComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    eventEditFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(tripEventsListContainer, eventItemComponent.getElement(), RenderPosition.BEFOREEND);
  };

  for (let i = 0; i < ELEMS__COUNT; i++) {
    //* Отрисовываем точку маршрута
    renderEventItem(tripEventsList, wayPoints[i]);
  }
}
