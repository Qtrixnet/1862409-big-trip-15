import AbstractObserver from '../utils/abstract-observer';
import dayjs from 'dayjs';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points;
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [update, ...this._points];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {

    const adaptedPoint = Object.assign(
      {},
      point,
      {
        price: point.base_price,
        fullTimeFrom: dayjs(new Date(point.date_from)),
        fullTimeTo: dayjs(new Date(point.date_to)),
        duration: dayjs(new Date(point.date_to)) - dayjs(new Date(point.date_from)),
        minifiedTimeFrom: dayjs(new Date(point.date_from)).format('HH:mm'),
        minifiedTimeTo: dayjs(new Date(point.date_to)).format('HH:mm'),
        isFavorite: point['is_favorite'],
        city: point.destination,
      },
    );

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['destination'];

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign({}, point, {
      'base_price': point.price,
      'date_from': point.fullTimeFrom,
      'date_to': point.fullTimeTo,
      destination: point.city,
      id: point.id,
      'is_favorite': point.isFavorite,
      offers: point.offers,
      type: point.type,
    });

    delete adaptedPoint.allOffers;
    delete adaptedPoint.citiesList;
    delete adaptedPoint.city;
    delete adaptedPoint.duration;
    delete adaptedPoint.eventCities;
    delete adaptedPoint.fullTimeFrom;
    delete adaptedPoint.fullTimeTo;
    delete adaptedPoint.minifiedTimeFrom;
    delete adaptedPoint.minifiedTimeTo;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.price;
    delete adaptedPoint.isNew;

    return adaptedPoint;
  }
}
