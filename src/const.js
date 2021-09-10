//* Типы точек маршрута
export const eventTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

//* Список городов для путешествия

export const eventCities = [
  {
    description: 'New York, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'New York',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=1',
        description: 'New York parliament building',
      },
    ],
  },
  {
    description: 'Moscow, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Moscow',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=2',
        description: 'Moscow parliament building',
      },
    ],
  },
  {
    description: 'Dubai, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Dubai',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=3',
        description: 'Dubai parliament building',
      },
    ],
  },
  {
    description: 'Los Angeles, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Los Angeles',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=4',
        description: 'Los Angeles parliament building',
      },
    ],
  },
  {
    description: 'Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/248/152?r=5',
        description: 'Amsterdam parliament building',
      },
    ],
  },
];

//* Описание маршрутов
export const eventDescription = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus nisi, dictum et consequat eget, convallis a mi. Ut vitae mauris nec ligula fermentum venenatis id at nunc.',

  'Etiam porttitor sollicitudin magna non fermentum. Aliquam pulvinar arcu et orci scelerisque viverra. Pellentesque efficitur purus eu felis pretium, vel gravida erat interdum. Fusce at tincidunt nisi. Phasellus aliquet lorem dui, ut congue enim bibendum eu. Vestibulum porttitor dignissim ipsum, nec vehicula turpis ornare finibus.',

  'Aenean blandit tellus at sem pharetra, nec varius nisi commodo. Pellentesque placerat turpis at finibus blandit. Aliquam tempus nulla neque, ac molestie ex dictum interdum. Proin commodo sapien a ante ornare, quis molestie elit porta. Phasellus vitae maximus nulla. Donec sodales tortor neque, eget pellentesque dui varius quis. Morbi volutpat sagittis congue. Etiam ullamcorper dignissim libero id pharetra. Phasellus facilisis ornare faucibus. Nam dictum lacus id fringilla ultricies. ',

  'Donec accumsan risus non felis maximus pretium. Morbi varius, orci a ornare blandit, sem arcu dignissim arcu, id efficitur orci odio nec libero. Pellentesque sed massa cursus, iaculis lectus at, tempor nibh. Pellentesque metus arcu, maximus at facilisis eu, aliquam in nisl. Nulla vehicula ex eu magna pharetra scelerisque. Pellentesque non sodales nisl, nec iaculis mauris. Ut facilisis felis enim, sit amet volutpat justo elementum a. Vivamus sollicitudin sem quis arcu commodo fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit, purus eget aliquam sodales, quam velit sodales tellus, a fermentum felis elit ut lorem. Sed ut maximus dui, ac vulputate elit. Vestibulum laoreet urna consectetur, ultrices ipsum eget, rutrum enim. Integer malesuada bibendum metus. Vivamus aliquet tempus porttitor. Donec pretium mattis ipsum, eu bibendum turpis maximus sed. Donec vitae vehicula sem, a posuere urna.',
];

export const SortType = {
  DEFAULT: 'DEFAULT',
  TIME: 'TIME',
  PRICE: 'PRICE',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT', //! PATCH
  ADD_POINT: 'ADD_POINT', //! MAJOR (обновление информации в хедере)
  DELETE_POINT: 'DELETE_POINT', //! MAJOR (обновление информации в хедере)
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR', //! Нужен ли?
  MAJOR: 'MAJOR',
};

export const offers = [
  {
    type: 'taxi',
    offers: [
      {
        title: 'Baggage',
        price: 10,
      },
      {
        title: 'Comfort',
        price: 15,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        title: 'Air conditioner',
        price: 10,
      },
      {
        title: 'Choose seats',
        price: 5,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        title: 'Air conditioner',
        price: 10,
      },
      {
        title: 'Choose seats',
        price: 5,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        title: 'Air conditioner',
        price: 10,
      },
      {
        title: 'Car selection',
        price: 15,
      },
    ],
  },
  {
    type: 'flight',
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
  },
  {
    type: 'check-in',
    offers: [
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
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        title: 'Excursion',
        price: 10,
      },
      {
        title: 'Choose attraction',
        price: 10,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        title: 'Сhoose kitchen',
        price: 5,
      },
      {
        title: 'Increased service',
        price: 10,
      },
    ],
  },
];

