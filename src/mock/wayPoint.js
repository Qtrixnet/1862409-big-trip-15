import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common';
import { eventTypes, eventCities, offers } from '../const';
import { nanoid } from 'nanoid';

//* Генерация даты путешествия
const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'day').toDate();
};

//* Генерация точки путешествия
const generateRandomWayPoint = () => {
  const randomIndex = getRandomInteger(0, eventTypes.length - 1);

  return eventTypes[randomIndex];
};

//* Генерация города
const generateCity = () => {
  const randomIndex = getRandomInteger(0, eventCities.length - 1);
  return eventCities[randomIndex];
};

//* Рыбные данные для точки маршрута и формы редактирования
export const generateWayPoint = () => {
  const tripDate = dayjs(generateDate()).format('MMM D');
  const type = generateRandomWayPoint();
  const price = getRandomInteger(100, 2000);
  const timeFrom = dayjs().minute(getRandomInteger(0, 100));
  const minifiedTimeFrom = timeFrom.format('HH:mm');
  const fullTimeFrom = timeFrom.format('DD/MM/YY HH:mm');
  const timeTo = dayjs().minute(getRandomInteger(100, 2000));
  const minifiedTimeTo = timeTo.format('HH:mm');
  const fullTimeTo = timeTo.format('DD/MM/YY HH:mm');
  const isFavorite = Boolean(getRandomInteger(0, 1));

  const duration = timeTo.diff(timeFrom, 'ms');

  return {
    id: nanoid(),
    tripDate,
    type,
    eventCities,
    city: generateCity(),
    minifiedTimeFrom,
    fullTimeFrom,
    minifiedTimeTo,
    fullTimeTo,
    duration,
    price,
    offers,
    isFavorite,
    wayPointsList: eventTypes,
    citiesList: eventCities,
  };
};
