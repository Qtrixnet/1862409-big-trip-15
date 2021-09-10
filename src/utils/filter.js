import { FilterType } from '../const';
import { isDatePast, isDateFuture } from './tripPoint'

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter(),
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateFuture(point.fullTimeTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isDatePast(point.fullTimeTo)),
};

