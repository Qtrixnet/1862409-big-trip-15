import AbstractView from './abstract';

const createTripCostTemplate = (totalCost) => `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;

export default class TripCost extends AbstractView {
  constructor(wayPoints) {
    super();
    this._wayPoints = wayPoints;
  }

  _getTotalCost(points) {
    let total = 0;
    points.map((point) => (total += point.price));
    return total;
  }

  getTemplate() {
    return createTripCostTemplate(this._getTotalCost(this._wayPoints));
  }
}
