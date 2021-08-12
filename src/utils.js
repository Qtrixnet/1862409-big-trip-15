//* Генерация случайного числа
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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
  let  destinationMarkup = '';
  for (const cityOption of citiesList) {
    destinationMarkup += `
      <option value="${cityOption}"></option>`;
  }

  return  `<datalist id='destination-list-1'>${destinationMarkup}</datalist>`;
};
