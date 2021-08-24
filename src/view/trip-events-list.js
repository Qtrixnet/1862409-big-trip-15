import AbstractView from './abstract';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripEventsList extends AbstractView {
  getTemplate() {
    return createEventsListTemplate();
  }
}
