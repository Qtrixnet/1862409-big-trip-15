import { createElement } from '../utils';

const createTripCostTemplate = ({ totalCost }) => `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
  </p>`;

export default class TripCost {
  constructor(totalCost) {
    this._element = null;
    this._totalCost = totalCost;
  }

  getTemplate() {
    return createTripCostTemplate(this._totalCost);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
