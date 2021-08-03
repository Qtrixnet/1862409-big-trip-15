import dayjs from "dayjs";

//* Генерация случайного числа
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

//* Генерация даты путешествия
const generateDate = () => {
  const maxDaysGap = 0;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, 'hour').toDate();
}

//* Генерация точки путешествия
const generateRandomWayPoint = () => {
  const wayPoints = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant'
  ];

  const randomIndex = getRandomInteger(0, wayPoints.length - 1);

  return wayPoints[randomIndex];
}

//* Генерация города
const generateCity = () => {
  const cities = [
    'London',
    'New York',
    'Paris',
    'Moscow',
    'Tokyo',
    'Dubai',
    'Singapore',
    'Barcelona',
    'Los Angeles',
    'Madrid',
    'Rome',
    'Chicago',
    'Toronto',
    'San Francisco',
    'Abu Dhabi',
    'St. Petersburg',
    'Amsterdam',
    'Berlin',
    'Prague',
    'Washington',
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
}

//* Генерация описания для формы создания точки путешествия
const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus nisi, dictum et consequat eget, convallis a mi. Ut vitae mauris nec ligula fermentum venenatis id at nunc.',

    'Etiam porttitor sollicitudin magna non fermentum. Aliquam pulvinar arcu et orci scelerisque viverra. Pellentesque efficitur purus eu felis pretium, vel gravida erat interdum. Fusce at tincidunt nisi. Phasellus aliquet lorem dui, ut congue enim bibendum eu. Vestibulum porttitor dignissim ipsum, nec vehicula turpis ornare finibus.',

    'Aenean blandit tellus at sem pharetra, nec varius nisi commodo. Pellentesque placerat turpis at finibus blandit. Aliquam tempus nulla neque, ac molestie ex dictum interdum. Proin commodo sapien a ante ornare, quis molestie elit porta. Phasellus vitae maximus nulla. Donec sodales tortor neque, eget pellentesque dui varius quis. Morbi volutpat sagittis congue. Etiam ullamcorper dignissim libero id pharetra. Phasellus facilisis ornare faucibus. Nam dictum lacus id fringilla ultricies. ',

    'Donec accumsan risus non felis maximus pretium. Morbi varius, orci a ornare blandit, sem arcu dignissim arcu, id efficitur orci odio nec libero. Pellentesque sed massa cursus, iaculis lectus at, tempor nibh. Pellentesque metus arcu, maximus at facilisis eu, aliquam in nisl. Nulla vehicula ex eu magna pharetra scelerisque. Pellentesque non sodales nisl, nec iaculis mauris. Ut facilisis felis enim, sit amet volutpat justo elementum a. Vivamus sollicitudin sem quis arcu commodo fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit, purus eget aliquam sodales, quam velit sodales tellus, a fermentum felis elit ut lorem. Sed ut maximus dui, ac vulputate elit. Vestibulum laoreet urna consectetur, ultrices ipsum eget, rutrum enim. Integer malesuada bibendum metus. Vivamus aliquet tempus porttitor. Donec pretium mattis ipsum, eu bibendum turpis maximus sed. Donec vitae vehicula sem, a posuere urna.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
}

//* Генерация массива с фото для формы создания точки путешествия
const generatePhotos = () => {
  const photos = []
  for (let i = 0; i <= getRandomInteger(0, 10); i++) {
    photos.push(`http://picsum.photos/248/152?r=${i}`)
  }
  return photos
}

//* Генерация дополнительных опций
const generateOffers = (wayPoint) => {
  let offers = []
  switch (wayPoint) {
    case 'Taxi':
      offers = [
        {
          offer: 'Baggage',
          price: 10,
        },
        {
          offer: 'Comfort',
          price: 15,
        },
      ];
      break;
    case 'Bus':
      offers = [
        {
          offer: 'Air conditioner',
          price: 10,
        },
        {
          offer: 'Choose seats',
          price: 5,
        },
      ];
      break
    case 'Train':
      offers = [
        {
          offer: 'Air conditioner',
          price: 10,
        },
        {
          offer: 'Choose seats',
          price: 5,
        },
      ];
      break;
    case 'Ship':
      offers = [
        {
          offer: 'Ship selection',
          price: 15,
        },
      ];
      break;
    case 'Drive':
      offers = [
        {
          offer: 'Air conditioner',
          price: 10,
        },
        {
          offer: 'Car selection',
          price: 15,
        },
      ];
      break;
    case 'Flight':
      offers = [
        {
          offer: 'Add luggage',
          price: 30,
        },
        {
          offer: 'Switch to comfort class',
          price: 100,
        },
        {
          offer: 'Add meal',
          price: 15,
        },
        {
          offer: 'Choose seats',
          price: 5,
        },
      ];
      break;
    case 'Check-in':
      offers = [
        {
          offer: 'Room cleaning',
          price: 15,
        },
        {
          offer: 'Ironing',
          price: 10,
        },
        {
          offer: 'Washing',
          price: 10,
        },
        {
          offer: 'Breakfast',
          price: 10,
        },
      ];
      break;
    case 'Sightseeing':
      offers = [
        {
          offer: 'Excursion',
          price: 10,
        },
        {
          offer: 'Choose attraction',
          price: 10,
        },
      ];
      break;
    case 'Restaurant':
      offers = [
        {
          offer: 'Сhoose kitchen',
          price: 5,
        },
        {
          offer: 'Increased service',
          price: 10,
        },
      ];
      break;
    default:
      [];
  }
  return offers;
}

//* Рыбные данные
export const generateWayPoint = () => {
  const tripDate = generateDate();
  const price = getRandomInteger(0, 1000);
  const wayPoint = generateRandomWayPoint();
  const startTime = generateDate();
  const endTime = generateDate();
  const isFavorite = Boolean(getRandomInteger(0, 1));
  const duration = ((endTime - startTime) / 1000 / 60).toFixed(0);

  return {
    tripDate,
    wayPoint,
    wayPointDescription: generateDescription(),
    wayPointPhoto: generatePhotos(),
    wayPointIcon: wayPoint,
    city: generateCity(),
    startTime,
    endTime,
    duration,
    price,
    offers: generateOffers(wayPoint),
    isFavorite,
  }
}

console.log(generateWayPoint())
