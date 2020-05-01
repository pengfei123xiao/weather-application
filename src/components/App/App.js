import React from 'react';
import './app.css';
import weatherApi from '../../api/weather-api';
import CurrentWeather from '../Current-weather/CurrentWeather';
import SearchBar from '../Search-bar/SearchBar';
import DetailedWeather from '../Detailed-weather/DetailedWeather';

const API_key = '0775917fc2a3889cd95b31da9ea452c4';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      forecastWeather: {},
      query: 'Sydney'
    };
  }

  componentDidMount () {
    // automatic query Sydney(default city)
    this.fetchWeatherData(this.state.query);
  }

  handleSearch = (query) => {
    this.fetchWeatherData(query);
  }

  fetchWeatherData = (query) => {
    // ---obtain weather data---
    weatherApi.get('weather', {
      params: {
        q: query, // default city is Sydney
        appid: `${API_key}`,
        units: 'metric' // so that the temp is in Celsius
      } // `http://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=${API_key}`
    }).then((response) => {
      // handle success
      console.log('weather response:', response);
      this.setState({
        isLoading: false,
        currData: {
          city: response.data.name,
          // toFixed(): return a string using fixed-point notation
          temp: response.data.main.temp.toFixed(0),
          description: response.data.weather[0].description,
          localTime: this.timeConverter(response.data.dt, response.data.timezone),
          timezone: response.data.timezone,
          weatherIcon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
          sunrise: this.amPmConverter(response.data.sys.sunrise, response.data.timezone),
          sunset: this.amPmConverter(response.data.sys.sunset, response.data.timezone),
          clouds: response.data.clouds.all,
          humidity: response.data.main.humidity,
          wind: response.data.wind.speed
        },
        currWeatherCondition: response.data.weather[0].main,
        query: query,
      });
      console.log('curr state:', this.state);
    }).catch(() => {
      // handle error
      alert('unknown city / error');
    });

    // ---obtain weather forecast data---
    // weatherApi.get('forecast', {
    //   params: {
    //     q: "Sydney", // default city is Sydney
    //     appid: `${API_key}`,
    //   } // `http://api.openweathermap.org/data/2.5/forecast?q=Sydney&appid=${API_key}`
    // }).then((response) => {
    //   // handle success
    //   console.log('forecast response:', response);
    //   const fiveDaysData = response.data.list;

    // })
  }

  amPmConverter = (UNIX_timestamp, timezone) => {
    // const { timezone } = this.state.currData;
    console.log(`timezone: ${timezone}, type: ${typeof timezone}`);
    const res = new Date((UNIX_timestamp + timezone) * 1000);
    const hour = res.getUTCHours();
    const min = res.getUTCMinutes();
    const currTime = hour > 12 ? `${hour - 12}:${min}PM` : `${hour}:${min}AM`;
    return currTime;
  }

  timeConverter = (UNIX_timestamp, timezone) => {
    // Create a new JavaScript Date object based on the timestamp,
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    // const { timezone } = this.state.currData;
    const res = new Date((UNIX_timestamp + timezone) * 1000);
    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const daysArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const day = daysArr[res.getUTCDay() - 1];
    const year = res.getFullYear();
    // getMonth() returns an integer number between 0 and 11, 0 corresponds to January. 
    const month = monthsArr[res.getUTCMonth()];
    const date = res.getUTCDate();
    const currTime = this.amPmConverter(UNIX_timestamp, timezone)
    const time = `${day} - ${date} ${month} ${year} - ${currTime}`;
    return time;
  }

  render () {
    const { city, temp, description, localTime, weatherIcon, sunrise, sunset,
      clouds, humidity, wind } = this.state.currData
    return (
      <div className='app-container'>
        <section className='left-container'>
          <SearchBar searching={this.handleSearch} />
          {this.state.isLoading && <h1>Loading...</h1>}
          {!this.state.isLoading && <CurrentWeather
            city={city} temp={temp} description={description} time={localTime}
            weatherIcon={weatherIcon}
          />}
        </section>
        <section className="right-container">
          <DetailedWeather sunrise={sunrise} sunset={sunset} clouds={clouds}
            humidity={humidity} wind={wind} />
        </section>
      </div >

    )
  }
}
export default App;
