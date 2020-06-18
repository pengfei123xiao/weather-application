import { weatherActionTypes } from '../actions/weatherActionTypes';
import { timeConverter, amPmConverter } from '../actions/weatherUtils';

const INITIAL_STATE = {
  searchBarVal: '',
  isLoading: true,
  currData: {
    city: "",
    temp: 0,
    description: "",
    localTime: "",
    timezone: 0, // Shift in seconds from UTC
    weatherIcon: "",
    sunrise: "",
    sunset: "",
    clouds: "",
    humidity: "",
    wind: "",
  },
  currWeatherCondition: "",
  forecastWeather: {
    fiveDayForecast: [],
  }
};

const weatherReducer = (state = INITIAL_STATE, action) => {
  // console.log('action', action);
  switch (action.type) {
    case weatherActionTypes.CREATE_SEARCH:
      return {
        ...state,
        searchBarVal: action.payload
      }

    case weatherActionTypes.CLEAR_SEARCH:
      return {
        ...state,
        searchBarVal: ''
      }

    case weatherActionTypes.FETCH_CURRENT_WEATHER:
      return {
        ...state,
        isLoading: false,
        currData: {
          ...state.currData,
          city: action.response.data.name,
          // toFixed(): return a string using fixed-point notation
          temp: action.response.data.main.temp.toFixed(0),
          description: action.response.data.weather[0].description,
          localTime: timeConverter(action.response.data.dt, action.response.data.timezone),
          timezone: action.response.data.timezone,
          weatherIcon: `http://openweathermap.org/img/wn/${action.response.data.weather[0].icon}.png`,
          sunrise: amPmConverter(action.response.data.sys.sunrise, action.response.data.timezone),
          sunset: amPmConverter(action.response.data.sys.sunset, action.response.data.timezone),
          clouds: action.response.data.clouds.all,
          humidity: action.response.data.main.humidity,
          wind: action.response.data.wind.speed
        },
        currWeatherCondition: action.response.data.weather[0].main,
      }

    case weatherActionTypes.FETCH_FORECAST_WEATHER:
      return {
        ...state,
        forecastWeather: {
          ...state.forecastWeather,
          fiveDayForecast: action.response.data.list,
        }
      }

    default:
      return state;
  }
};

export default weatherReducer;