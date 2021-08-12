import dayjs from 'dayjs';

export const generateHeaderInfo = (wayPoints) => {

  //* Создаем массив в датами путешествий
  const datesList = wayPoints.map((wayPoint) => dayjs(wayPoint.tripDate));

  //* Сортируем массив дат по возрастанию
  datesList.sort((a, b) => a - b);

  //* Самая первая точка маршрута
  const dateFrom = datesList[0].format('DD MMM');

  //* Самая последняя точка маршрута
  const dateTo = datesList[datesList.length - 1].format('DD MMM');

  //* Массив с городами
  const citiesList = wayPoints.map((wayPoint) => wayPoint.city);

  //* Общая сумма поездки
  let totalCost = 0;
  for (const wayPoint of wayPoints) {
    totalCost += wayPoint.price;
  }

  return {
    dateTo,
    dateFrom,
    citiesList,
    totalCost,
  };
};

