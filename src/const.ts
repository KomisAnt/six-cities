
export const MAX_STARS_COUNT = 5;
export const MAX_PERCENT_STARS_WIDTH = 100;

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const MonthNamesEN = ['January', 'February ', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const MonthNamesRU = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export const placesOptions = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;

export const INIT_CITY = 'Paris';

export enum SortFilter {
  Popular = 'Popular',
  Price_To_Hi = 'Price: low to high',
  Price_To_Low = 'Price: high to low',
  Top_Rated = 'Top rated first'
}

export enum AppRoute {
  Login = '/login',
  Root = '/',
  Favotires = '/favorites',
  Offer = '/offer'
}

export enum APIRoute {
  Offers = '/hotels',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favotires = '/favorite'
}

export enum AutorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const TIMEOUT_SHOW_ERROR = 2000;
