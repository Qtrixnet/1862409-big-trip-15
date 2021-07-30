/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_site_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/site-menu */ "./src/view/site-menu.js");
/* harmony import */ var _view_trip_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/trip-info */ "./src/view/trip-info.js");
/* harmony import */ var _view_filters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/filters */ "./src/view/filters.js");
/* harmony import */ var _view_sort__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/sort */ "./src/view/sort.js");
/* harmony import */ var _view_trip_events_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/trip-events-list */ "./src/view/trip-events-list.js");
/* harmony import */ var _view_trip_events_item__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/trip-events-item */ "./src/view/trip-events-item.js");







//* Функция рендера блоков
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

//* Хедер
//* Меню навигации
const headerElement = document.querySelector('.page-header'),
  navigationElement = headerElement.querySelector('.trip-controls__navigation');

render(navigationElement, Object(_view_site_menu__WEBPACK_IMPORTED_MODULE_0__["createNavigationTemplate"])(), 'beforeEnd')

const tripMainElement = headerElement.querySelector('.trip-main')
//* Информация о путешествии (Маршрут и стоимость)
render(tripMainElement, Object(_view_trip_info__WEBPACK_IMPORTED_MODULE_1__["createTripInfoTemplate"])(), 'afterbegin')

//* Фильтры
const filtersElement = tripMainElement.querySelector('.trip-controls__filters');
render(filtersElement, Object(_view_filters__WEBPACK_IMPORTED_MODULE_2__["createFiltersTemplate"])(), 'beforeEnd')

//* Сортировка
const mainPageElement = document.querySelector('.page-body__page-main'),
  tripEventsElement = mainPageElement.querySelector('.trip-events');

render(tripEventsElement, Object(_view_sort__WEBPACK_IMPORTED_MODULE_3__["createSortTemplate"])(), 'beforeEnd')

//* Контент (путешествия)
render(tripEventsElement, Object(_view_trip_events_list__WEBPACK_IMPORTED_MODULE_4__["createEventsListTemplate"])(), 'beforeEnd')

const tripEventsList = tripEventsElement.querySelector('.trip-events__list')

//* 3 тестовых компонентов поездок, для наглядности
for (let i = 0; i < 3; i++) {
  render(tripEventsList, Object(_view_trip_events_item__WEBPACK_IMPORTED_MODULE_5__["createEventsItemTemplate"])(), 'beforeEnd')
}


/***/ }),

/***/ "./src/view/filters.js":
/*!*****************************!*\
  !*** ./src/view/filters.js ***!
  \*****************************/
/*! exports provided: createFiltersTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFiltersTemplate", function() { return createFiltersTemplate; });
const createFiltersTemplate = () => {
  return `<form class="trip-filters" action="#" method="get">
            <div class="trip-filters__filter">
              <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
              <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
            </div>

            <div class="trip-filters__filter">
              <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio"          name="trip-filter" value="future">
              <label class="trip-filters__filter-label" for="filter-future">Future</label>
            </div>

            <div class="trip-filters__filter">
              <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio"          name="trip-filter" value="past">
              <label class="trip-filters__filter-label" for="filter-past">Past</label>
            </div>

            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`
}


/***/ }),

/***/ "./src/view/site-menu.js":
/*!*******************************!*\
  !*** ./src/view/site-menu.js ***!
  \*******************************/
/*! exports provided: createNavigationTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNavigationTemplate", function() { return createNavigationTemplate; });
const createNavigationTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
            <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
            <a class="trip-tabs__btn" href="#">Stats</a>
          </nav>`
}


/***/ }),

/***/ "./src/view/sort.js":
/*!**************************!*\
  !*** ./src/view/sort.js ***!
  \**************************/
/*! exports provided: createSortTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSortTemplate", function() { return createSortTemplate; });
const createSortTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time">
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>`
}


/***/ }),

/***/ "./src/view/trip-events-item.js":
/*!**************************************!*\
  !*** ./src/view/trip-events-item.js ***!
  \**************************************/
/*! exports provided: createEventsItemTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventsItemTemplate", function() { return createEventsItemTemplate; });
const createEventsItemTemplate = () => {
  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="2019-03-18">MAR 18</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
              </div>
              <h3 class="event__title">Taxi Amsterdam</h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
                  &mdash;
                  <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
                </p>
                <p class="event__duration">30M</p>
              </div>
              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">20</span>
              </p>
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title">Order Uber</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">20</span>
                </li>
              </ul>
              <button class="event__favorite-btn event__favorite-btn--active" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`
}


/***/ }),

/***/ "./src/view/trip-events-list.js":
/*!**************************************!*\
  !*** ./src/view/trip-events-list.js ***!
  \**************************************/
/*! exports provided: createEventsListTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventsListTemplate", function() { return createEventsListTemplate; });
const createEventsListTemplate = () => {
  return `<ul class="trip-events__list">
          </ul>`
}


/***/ }),

/***/ "./src/view/trip-info.js":
/*!*******************************!*\
  !*** ./src/view/trip-info.js ***!
  \*******************************/
/*! exports provided: createTripInfoTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripInfoTemplate", function() { return createTripInfoTemplate; });
const createTripInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
          </section>`
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map