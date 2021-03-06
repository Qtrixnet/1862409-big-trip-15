export const escapeKey = 'Escape';
export const escKey = 'Esc';

export const SortType = {
  DEFAULT: 'DEFAULT',
  TIME: 'TIME',
  PRICE: 'PRICE',
};

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT', //* PATCH
  ADD_POINT: 'ADD_POINT', //* MAJOR (обновление информации в хедере)
  DELETE_POINT: 'DELETE_POINT', //* MAJOR (обновление информации в хедере)
};

export const UpdateType = {
  PATCH: 'PATCH',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  ADD_NEW_EVENT: 'ADD_NEW_EVENT',
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};
