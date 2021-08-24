import AbstractView from './abstract';

const createTripCostTemplate = ({ totalCost }) => `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;

export default class TripCost extends AbstractView {
  constructor(headerInfo) {
    super();
    this._headerInfo = headerInfo;
  }

  getTemplate() {
    return createTripCostTemplate(this._headerInfo);
  }
}
