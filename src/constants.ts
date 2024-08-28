// #region API endpoints

/**
 * API Reference: https://openweathermap.org/current
 *
 * `units` is `metric` by default
 */
export const apiURLCurrent = (query: string): string =>
  `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric&q=${query}`;

/**
 * API Reference: https://openweathermap.org/forecast5
 *
 * `units` is `metric` by default
 */
export const apiURLForecast = (query: string): string =>
  `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric&q=${query}`;

/**
 * API Reference: https://openweathermap.org/api/geocoding-api
 *
 * `limit` is `1` by default
 */
export const apiURLGeocoding = (query: string): string =>
  `https://api.openweathermap.org/geo/1.0/direct?appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&limit=1&q=${query}`;

/**
 * API Reference: https://openweathermap.org/api/geocoding-api
 *
 * `limit` is `1` by default
 */
export const apiURLReverseGeocoding = (lat: number, lon: number): string =>
  `https://api.openweathermap.org/geo/1.0/reverse?appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&limit=1&lat=${lat}&lon=${lon}`;

/**
 * API Reference: https://openweathermap.org/weather-conditions
 */
export const iconURL = (id: string): string =>
  `https://openweathermap.org/img/wn/${id}@2x.png`;

// #endregion

export const LOCAL_STORAGE_KEY: string = 'OPEN_WEATHER_LOCATIONS';

export const DEFAULT_LOCATION: string = 'Singapore, SG';
