import AbstractView from './abstract';
import { FilterType } from '../const';

const noEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now',
  [FilterType.PAST]: 'There are no future events now',
};

const createNoEventTemplate = (filterType) => {
  const noEventTextValue = noEventsTextType[filterType];

  return (
    `<p class="trip-events__msg">${noEventTextValue}</p>`
  );
};

export default class NoEvent extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createNoEventTemplate(this._data);
  }
}
