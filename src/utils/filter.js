import { FilterType } from '../const';
import { isDatePast, isDateFuture } from './tripPoint';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateFuture(point.tripDate)),
  [FilterType.PAST]: (points) => points.filter((point) => isDatePast(point.tripDate)),
};
