import SmartView from './smart';
import flatpickr from 'flatpickr';
import dayjs from 'dayjs';
import he from 'he';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import '../../node_modules/flatpickr/dist/themes/material_blue.css';

const BLANK_POINT = {
  citiesList: [],
  city: {
    description:
      'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=1',
        description: 'Geneva parliament building',
      },
    ],
  },
  duration: 0,
  eventCities: [],
  fullTimeFrom: dayjs(),
  fullTimeTo: dayjs(),
  id: '',
  isFavorite: false,
  minifiedTimeFrom: dayjs().format('hh:mm'),
  minifiedTimeTo: dayjs().format('hh:mm'),
  offers: [
    {
      title: 'Add luggage',
      price: 30,
    },
    {
      title: 'Switch to comfort class',
      price: 100,
    },
    {
      title: 'Add meal',
      price: 15,
    },
    {
      title: 'Choose seats',
      price: 5,
    },
  ],
  allOffers: [],
  price: 100,
  tripDate: dayjs(),
  type: 'flight',
  wayPointsList: [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
  ],
  isNew: true,
};

const createWayPointsListTemplate = (wayPoints, isDisabled) =>
  wayPoints
    .map(
      (wayPoint) => `
  <div class="event__type-item">
    <input id="event-type-${wayPoint.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" ${isDisabled ? 'disabled' : ''} value="${wayPoint.type}">
    <label class="event__type-label  event__type-label--${wayPoint.type}" for="event-type-${wayPoint.type}-1">${wayPoint.type}</label>
  </div>`)
    .join('');

const createOffersTemplate = (offers, matchedOffers, isOffers) => {
  const checkOffer = (matchedOffer) =>
    offers.find((offer) => offer.title === matchedOffer.title);

  if ((offers, matchedOffers)) {
    return `
    ${isOffers ? `
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${matchedOffers.offers.map((offer) => `
          <div class='event__offer-selector'>
            <input class='event__offer-checkbox visually-hidden' id='${offer.title}' ${checkOffer(offer, offers) ? 'checked' : ''} type='checkbox' name='${offer.title}'>
              <label class='event__offer-label' for='${offer.title}'>
                <span class='event__offer-title'>${offer.title}</span>
                  &plus;&euro;&nbsp;
                <span class='event__offer-price'>${offer.price}</span>
            </label>
          </div>`).join('')}
      </div>
    </section>` : ''}`;
  }
  return '';
};

//! Передаем изначальный город и выбранный город
const createDescriptionTemplate = (city, chosenCity) => `
  <section class="event__section event__section--destination">
    <h3 class="event__section-title event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${chosenCity ? chosenCity.description : city.description}</p>
  </section>
`;

const createDestinationListTemplate = (citiesList) =>
  citiesList.map(
    (city) => `
  <option value="${city.name}"></option>
`);

const createTypeIconTemplate = (type, chosenType) => `
  <img class="event__type-icon" width="17" height="17" src="img/icons/${chosenType ? chosenType : type}.png" alt="Event type icon">`;

const createEventFormTemplate = ({
  type,
  chosenType = '',
  citiesList = [],
  fullTimeFrom,
  fullTimeTo,
  price,
  offers,
  allOffers = [],
  isOffers,
  city,
  chosenCity = '',
  isDisabled,
  isSaving,
  isDeleting,
  isNew,
}) => {
  const matchedOffers = allOffers.find((offer) => offer.type === type);

  const wayPointsTemplate = createWayPointsListTemplate(allOffers, isDisabled);
  const offersTemplate = createOffersTemplate(offers, matchedOffers, isOffers);
  const citiesTemplate = createDestinationListTemplate(citiesList);
  const typeIcomTemolate = createTypeIconTemplate(type, chosenType);
  const descriptionTemplate = createDescriptionTemplate(city, chosenCity);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            ${typeIcomTemolate}
          </label>
          <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${wayPointsTemplate}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group event__field-group--destination">
          <label class="event__label event__type-output" for="event-destination-1">
            ${chosenType ? chosenType : type}
          </label>
          <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" ${isDisabled ? 'disabled' : ''} value="${he.encode(city.name)}" list="destination-list-1">
          <datalist id='destination-list-1'>${citiesTemplate}</datalist>
        </div>
        <div class="event__field-group event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input event__input--time" id="event-start-time-1" type="text" ${isDisabled ? 'disabled' : ''} name="event-start-time" value="${fullTimeFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input event__input--time" id="event-end-time-1" type="text" ${isDisabled ? 'disabled' : ''} name="event-end-time" value="${fullTimeTo}">
        </div>
        <div class="event__field-group event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input event__input--price" id="event-price-1" type="text" pattern="^[ 0-9]+$" name="event-price" ${isDisabled ? 'disabled' : ''} value="${he.encode(`${price}`)}">
        </div>
        <button class="event__save-btn btn btn--blue" type="submit">${isSaving ? 'Saving...' : 'Save'}</button>
        ${isNew ? '<button class="event__reset-btn" type="reset">Cancel</button>' : `<button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>`}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offersTemplate}
        ${descriptionTemplate}
      </section>
    </form>
  </li>`;
};

export default class EventEditForm extends SmartView {
  constructor(wayPoint = BLANK_POINT) {
    super();
    //* На вход получили информацию и далее работаем с состоянием
    this._data = EventEditForm.parsePointToData(wayPoint);
    this._datepicker = null;

    this._wayPoint = wayPoint;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseHandler = this._formCloseHandler.bind(this);
    this._cityInputHandler = this._cityInputHandler.bind(this);
    this._typeChooseHandler = this._typeChooseHandler.bind(this);
    this._dateChangeHandler = this._dateChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker = null;
    }
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEditForm.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', this._formDeleteClickHandler);
  }

  //* Point - превращаем информацию в состояние
  static parsePointToData(wayPoint) {
    return Object.assign({}, wayPoint, {
      isOffers: wayPoint.offers.join('.') !== [].join('.'),
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  }

  //* Data - превращаем состояние в информацию
  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (!data.isOffers) {
      data.isOffers = false;
    }

    if (!data.chosenType) {
      data.chosenType = data.type;
    } else {
      data.type = data.chosenType;
    }

    if (!data.chosenCity) {
      data.chosenCity = data.city;
    } else {
      data.city = data.chosenCity;
    }

    delete data.chosenCity;
    delete data.chosenType;
    delete data.isOffers;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    return data;
  }

  getTemplate() {
    return createEventFormTemplate(this._data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmitClick(EventEditForm.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmitClick = callback;
    this.getElement()
      .querySelector('form')
      .addEventListener('submit', this._formSubmitHandler);
  }

  _formCloseHandler(evt) {
    evt.preventDefault();
    this._callback.formCloseClick(this._data);
  }

  setFormCloseHandler(callback) {
    this._callback.formCloseClick = callback;
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this._formCloseHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmitClick);
    this.setFormCloseHandler(this._callback.formCloseClick);
  }

  _setInnerHandlers() {
    Array.from(
      this.getElement().querySelectorAll('.event__type-label'),
    ).forEach((label) => {
      label.addEventListener('click', this._typeChooseHandler);
    });
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('input', this._cityInputHandler);
  }

  _matchDescription(data) {
    //! Если название введенного города не совпадает со списком, то возвращаем сообщение с просьбой выбрать город из списка
    const mathcedDescription = this._data.citiesList.find((foundCity) => foundCity.name === data);
    return mathcedDescription
      ? mathcedDescription.description
      : 'Please select a city from the dropdown list';
  }

  _cityInputHandler(evt) {
    evt.preventDefault();
    //! При в воде в инпут, обновляем данные о выбранном городе
    this.updateData(
      {
        chosenCity: {
          description: this._matchDescription(evt.target.value),
          name: evt.target.value,
          pictures: this._data.city.pictures,
        },
      },
      true,
    );
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker = null;
    }
    this._datepicker = flatpickr(
      this.getElement().querySelectorAll('.event__input--time'),
      {
        dateFormat: 'd/m/y h:i',
        mode: 'range',
        defaultDate: this._fullTimeFrom,
        onChange: this._dateChangeHandler,
        enableTime: true,
      },
    );
  }

  _typeChooseHandler(evt) {
    evt.preventDefault();
    this.updateData({
      chosenType: evt.target.textContent,
      type: evt.target.textContent,
    });
  }

  _dateChangeHandler(evt) {
    this.updateData({
      fullTimeFrom: evt[0],
      fullTimeTo: evt[1],
      duration: evt[1] - evt[0],
    });
  }
}
