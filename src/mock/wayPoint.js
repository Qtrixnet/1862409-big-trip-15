import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common';
import { eventTypes, eventCitites, eventDescription } from '../const';
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

  const randomIndex = getRandomInteger(0, eventCitites.length - 1);

  return eventCitites[randomIndex];
};

//* Генерация описания для формы создания точки путешествия
const generateDescription = () => {
  const randomIndex = getRandomInteger(0, eventDescription.length - 1);

  return eventDescription[randomIndex];
};


//* Генерация массива с фото для формы создания / редактирования точки путешествия
const generatePhotos = () => {
  const photos = [];

  for (let i = 0; i <= getRandomInteger(1, 10); i++) {
    photos.push({
      src: `http://picsum.photos/248/152?r=${i}`,
      description: generateDescription(),
    });
  }
  return photos;
};

//* Генерация дополнительных опций
const generateOffers = (wayPoint) => {
  let offers = [];
  switch (wayPoint) {
    case 'taxi':
      offers = [
        {
          title: 'Baggage',
          price: 10,
        },
        {
          title: 'Comfort',
          price: 15,
        },
      ];
      break;
    case 'bus':
      offers = [
        {
          title: 'Air conditioner',
          price: 10,
        },
        {
          title: 'Choose seats',
          price: 5,
        },
      ];
      break;
    case 'train':
      offers = [
        {
          title: 'Air conditioner',
          price: 10,
        },
        {
          title: 'Choose seats',
          price: 5,
        },
      ];
      break;
    case 'ship':
      offers = [];
      break;
    case 'Drive':
      offers = [
        {
          title: 'Air conditioner',
          price: 10,
        },
        {
          title: 'Car selection',
          price: 15,
        },
      ];
      break;
    case 'flight':
      offers = [
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
      ];
      break;
    case 'check-in':
      offers = [
        {
          title: 'Room cleaning',
          price: 15,
        },
        {
          title: 'Ironing',
          price: 10,
        },
        {
          title: 'Washing',
          price: 10,
        },
        {
          title: 'Breakfast',
          price: 10,
        },
        {
          title: 'Pets accommodation',
          price: 20,
        },
      ];
      break;
    case 'sightseeing':
      offers = [
        {
          title: 'Excursion',
          price: 10,
        },
        {
          title: 'Choose attraction',
          price: 10,
        },
      ];
      break;
    case 'restaurant':
      offers = [
        {
          title: 'Сhoose kitchen',
          price: 5,
        },
        {
          title: 'Increased service',
          price: 10,
        },
      ];
      break;
    default:
      [];
  }
  return offers;
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

  const duration = timeTo.diff(timeFrom, 'm');

  const durationFormat = (durationValue) => {

    const days = Math.floor(durationValue / 60 / 24);
    const hours = Math.floor(durationValue / 60) - (days * 24);
    const minutes = durationValue % 60;

    if (days !== 0) {
      return `${days}D ${hours}H ${minutes}M`;
    } else if (days === 0 && hours !== 0) {
      return `${hours}H ${minutes}M`;
    } else {
      return `${minutes}M`;
    }
  };

  return {
    id: nanoid(),
    tripDate,
    type,
    city: generateCity(),
    minifiedTimeFrom,
    fullTimeFrom,
    minifiedTimeTo,
    fullTimeTo,
    duration: durationFormat(duration),
    price,
    offers: generateOffers(type),
    isFavorite,
    wayPointsList: eventTypes,
    citiesList: eventCitites,
    pictures: generatePhotos(),
    desription: generateDescription(),
  };
};
