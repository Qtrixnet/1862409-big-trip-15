import AbstractView from './abstract';

const createTripInfoTemplate = (points) => {
  if (points) {
    const cities = points.map((point) => point.city.name);
    const startDay = points[0].fullTimeFrom.format('MMM DD');
    const finishDay = points[points.length - 1].fullTimeTo.format('MMM DD');

    const handleCities = (citiesList) => {
      if (citiesList) {
        //* Форматируем список городов, если их больше 2х
        return `${citiesList[0]} ${citiesList.length > 2 ? '- ... -' : '-'} ${citiesList[citiesList.length - 1]}`;
      }
    };

    return `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${handleCities(cities)}</h1>
        <p class="trip-info__dates">${startDay} - ${finishDay}</p>
      </div>
    </section>`;
  }
};

export default class TripInfo extends AbstractView {
  constructor(points, cities) {
    super();
    this._points = points;
    this._cities = cities;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points, this._cities);
  }
}
