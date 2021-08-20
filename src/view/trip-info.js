import { createElement } from '../utils';

const createTripInfoTemplate = ({ dateFrom, dateTo, citiesList }) => {

  if(dateFrom, dateTo, citiesList) {
    const handleCities = (cities) => {
      if(cities) {
        //* Убираем из маршрута повторяющиеся подряд города и объединяем в строку с разделителем
        const withoutRepeat = cities.filter((item, pos, arr) => !pos || item !== arr[pos - 1]);

        //* Форматируем список городов, если их больше 2х
        if (withoutRepeat.length > 2) {
          return `${withoutRepeat[0]} - ... - ${withoutRepeat[withoutRepeat.length - 1]
          }`;
        } else {
          return withoutRepeat.join(' - ');
        }
      }
    };

    return `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${handleCities(citiesList)}</h1>
        <p class="trip-info__dates">${dateFrom} - ${dateTo}</p>
      </div>
    </section>`;
  }
};

export default class TripInfo {
  constructor(headerInfo) {
    this._element = null;
    this._headerInfo = headerInfo;
  }

  getTemplate() {
    return createTripInfoTemplate(this._headerInfo);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
