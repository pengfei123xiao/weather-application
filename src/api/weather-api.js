import axios from 'axios';

// create an new axios instance about open-weather-map
export default axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/'
})