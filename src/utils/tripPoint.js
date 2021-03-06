import dayjs from 'dayjs';

export const getOffersMarkup = (offers) => {
  //* Разметка списка офферов
  let offersMarkup = '';
  for (const offer of offers) {
    offersMarkup += `
      <div class='event__offer-selector'>
        <input class='event__offer-checkbox  visually-hidden' id='${offer.title}' type='checkbox' name='${offer.title}'>
        <label class='event__offer-label' for='${offer.title}'>
          <span class='event__offer-title'>${offer.title}</span>
            &plus;&euro;&nbsp;
          <span class='event__offer-price'>${offer.price}</span>
        </label>
      </div>`;
  }
  return offersMarkup;
};

export const getWayPointsListMarkup = (wayPointsList) => {
  //* Разметка списка типов маршрута
  let wayPointsRadioButtonList = '';
  for (const wayPointItem of wayPointsList) {
    wayPointsRadioButtonList += `
      <div class="event__type-item">
        <input id="event-type-${wayPointItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${wayPointItem}">
        <label class="event__type-label  event__type-label--${wayPointItem}" for="event-type-${wayPointItem}-1">${wayPointItem}</label>
      </div>`;
  }
  return wayPointsRadioButtonList;
};

export const getDestinationListMarkup = (citiesList) => {
  //* Разметка списка городов
  let destinationMarkup = '';
  for (const cityOption of citiesList) {
    destinationMarkup += `
      <option value="${cityOption}"></option>`;
  }

  return `<datalist id='destination-list-1'>${destinationMarkup}</datalist>`;
};

export const sortPointsByDay = (pointA, pointB) => dayjs(pointB.fullTimeFrom).diff(dayjs(pointA.fullTimeFrom));

export const sortPointsByTime = (pointA, pointB) => dayjs(pointB.duration).diff(dayjs(pointA.duration));

export const sortPointsByPrice = (pointA, pointB) => dayjs(pointB.price).diff(dayjs(pointA.price));

export const isDateFuture = (date) => dayjs().isBefore(date);

export const isDatePast = (date) => dayjs().isAfter(date);

