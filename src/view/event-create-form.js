// import { getOffersMarkup, getWayPointsListMarkup, getDestinationListMarkup} from '../utils/tripPoint';
// import AbstractView from './abstract';

// const createEventCreateFormTemplate = ({
//   offers,
//   type,
//   citiesList,
//   fullTimeFrom,
//   fullTimeTo,
//   wayPointsList,
//   price,
//   description,
//   pictures,
//   city,
// }) => {

//   //* Разметка блока с фото
//   let photosMarkup = '';
//   for (const photo of pictures) {
//     photosMarkup += `
//     <img class='event__photo' src=${photo.src} alt='${photo.description}'>`;
//   }

//   return `<li class='trip-events__item'>
//   <form class='event event--edit' action='#' method='post'>
//     <header class='event__header'>
//       <div class='event__type-wrapper'>
//         <label class='event__type event__type-btn' for='event-type-toggle-1'>
//           <span class='visually-hidden'>Choose event type</span>
//           <img class='event__type-icon' width='17' height='17' src='img/icons/${type}.png' alt='Event type icon'>
//         </label>
//         <input class='event__type-toggle visually-hidden' id='event-type-toggle-1' type='checkbox'>
//         <div class='event__type-list'>
//           <fieldset class='event__type-group'>
//             <legend class='visually-hidden'>Event type</legend>
//             ${getWayPointsListMarkup(wayPointsList)}
//           </fieldset>
//         </div>
//       </div>
//       <div class='event__field-group event__field-group--destination'>
//         <label class='event__label event__type-output' for='event-destination-1'>
//          ${type}
//         </label>
//         <input class='event__input event__input--destination' id='event-destination-1' type='text' name='event-destination' value='${city}' list='destination-list-1'>
//         ${getDestinationListMarkup(citiesList)}
//       </div>
//       <div class='event__field-group event__field-group--time'>
//         <label class='visually-hidden' for='event-start-time-1'>From</label>
//         <input class='event__input event__input--time' id='event-start-time-1' type='text' name='event-start-time' value='${fullTimeFrom}'>
//         &mdash;
//         <label class='visually-hidden' for='event-end-time-1'>To</label>
//         <input class='event__input event__input--time' id='event-end-time-1' type='text' name='event-end-time' value='${fullTimeTo}'>
//       </div>
//       <div class='event__field-group event__field-group--price'>
//         <label class='event__label' for='event-price-1'>
//           <span class='visually-hidden'>Price</span>
//           &euro;
//         </label>
//         <input class='event__input event__input--price' id='event-price-1' type='text' name='event-price' value='${price}'>
//       </div>
//       <button class='event__save-btn btn btn--blue' type='submit'>Save</button>
//       <button class='event__reset-btn' type='reset'>Cancel</button>
//     </header>
//     <section class='event__details'>
//     ${offers.length ? `
//       <section class='event__section event__section--offers'>
//         <h3 class='event__section-title event__section-title--offers'>Offers</h3>
//         <div class='event__available-offers'>
//           ${getOffersMarkup(offers)}
//         </div>
//       </section>` : ''}
//       <section class='event__section event__section--destination'>
//         <h3 class='event__section-title event__section-title--destination'>Destination</h3>
//         <p class='event__destination-description'>${description}</p>
//         <div class='event__photos-container'>
//           <div class='event__photos-tape'>
//             ${photosMarkup}
//           </div>
//         </div>
//       </section>
//     </section>
//   </form>
// </li>`;
// };

// export default class EventCreateForm extends AbstractView {
//   constructor(wayPoint) {
//     super();
//     //* На вход получили информацию и далее работаем с состоянием
//     this._data = EventCreateForm.parsePointToData(wayPoint);
//     this._datepicker = null;

//     this._wayPoint = wayPoint;
//     this._formSubmitHandler = this._formSubmitHandler.bind(this);
//     this._formCloseHandler = this._formCloseHandler.bind(this);
//     this._cityInputHandler = this._cityInputHandler.bind(this);
//     this._typeChooseHandler = this._typeChooseHandler.bind(this);
//     this._dateChangeHandler = this._dateChangeHandler.bind(this);
//     this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
//     this._setInnerHandlers();
//     this._setDatepicker();
//   }

//   removeElement() {
//     super.removeElement();

//     if(this._datepicker) {
//       this._datepicker = null;
//     }
//   }

//   _formDeleteClickHandler(evt) {
//     evt.preventDefault();
//     this._callback.deleteClick(EventCreateForm.parseDataToPoint(this._data));
//   }

//   setDeleteClickHandler(callback) {
//     this._callback.deleteClick = callback;
//     this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
//   }

//   //* Point - превращаем информацию в состояние
//   static parsePointToData(wayPoint) {
//     // console.log(wayPoint)
//     return Object.assign(
//       {},
//       wayPoint,
//       {
//         isOffers: wayPoint.offers.join('.') !== [].join('.'),
//       },
//     );
//   }

//   //* Data - превращаем состояние в информацию
//   static parseDataToPoint(data) {
//     data = Object.assign({}, data);

//     if (!data.isOffers) {
//       data.isOffers = false;
//     }

//     if(!data.chosenType) {
//       data.chosenType = data.type;
//     } else {
//       data.type = data.chosenType;
//     }

//     if(!data.chosenCity) {
//       data.chosenCity = data.city;
//     } else {
//       data.city = data.chosenCity;
//     }

//     delete data.chosenCity;
//     delete data.chosenType;
//     delete data.isOffers;
//     return data;
//   }

//   getTemplate() {
//     return createEventCreateFormTemplate(this._data);
//   }

//   _formSubmitHandler(evt) {
//     evt.preventDefault();
//     this._callback.formSubmitClick(EventCreateForm.parseDataToPoint(this._data));
//   }

//   setFormSubmitHandler(callback) {
//     this._callback.formSubmitClick = callback;
//     this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
//   }

//   _formCloseHandler(evt) {
//     evt.preventDefault();
//     this._callback.formCloseClick(this._data);
//   }

//   setFormCloseHandler(callback) {
//     this._callback.formCloseClick = callback;
//     this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formCloseHandler);
//   }

//   restoreHandlers() {
//     this._setInnerHandlers();
//     this._setDatepicker();
//     this.setFormSubmitHandler(this._callback.formSubmitClick);
//     this.setFormCloseHandler(this._callback.formCloseClick);
//   }

//   _setInnerHandlers() {
//     Array.from(this.getElement().querySelectorAll('.event__type-label')).forEach((label) => {
//       label.addEventListener('click', this._typeChooseHandler);
//     });
//     this.getElement()
//       .querySelector('.event__input--destination')
//       .addEventListener('input', this._cityInputHandler);
//   }

//   _matchDescription(data) {
//     //! Если название введенного города не совпадает со списком, то возвращаем сообщение с просьбой выбрать город из списка
//     const mathcedDescription = this._data.citiesList.find((foundCity) => foundCity.name === data);
//     return mathcedDescription ? mathcedDescription.description : 'Please select a city from the dropdown list';
//   }

//   _cityInputHandler(evt){
//     evt.preventDefault();
//     //! При в воде в инпут, обновляем данные о выбранном городе
//     this.updateData({
//       chosenCity: {
//         description: this._matchDescription(evt.target.value),
//         name: evt.target.value,
//         pictures: this._data.city.pictures,
//       },
//     }, true);
//   }

//   _setDatepicker() {
//     if(this._datepicker) {
//       this._datepicker = null;
//     }
//     this._datepicker = flatpickr(
//       this.getElement().querySelectorAll('.event__input--time'),
//       {
//         dateFormat: 'd/m/y h:i',
//         mode: 'range',
//         defaultDate: this._fullTimeFrom,
//         onChange: this._dateChangeHandler,
//       },
//     );
//   }

//   _typeChooseHandler(evt) {
//     evt.preventDefault();
//     this.updateData({
//       chosenType: evt.target.textContent,
//       type: evt.target.textContent,
//     });
//   }

//   _dateChangeHandler(evt) {
//     this.updateData({
//       fullTimeFrom: evt[0],
//       fullTimeTo: evt[1],
//       duration: evt[1] - evt[0],
//     });
//   }
// }
