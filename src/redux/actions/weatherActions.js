import { weatherActionTypes } from './weatherActionTypes';

export const createSearch = (searchBarVal) => ({
  type: weatherActionTypes.CREATE_SEARCH,
  payload: searchBarVal
});

export const clearSearch = () => ({
  type: weatherActionTypes.CLEAR_SEARCH
})

export const fetchCurrentWeather = (response) => ({
  type: weatherActionTypes.FETCH_CURRENT_WEATHER,
  response
})

export const fetchForecastWeather = (response) => ({
  type: weatherActionTypes.FETCH_FORECAST_WEATHER,
  response
})