import React from 'react';
import './app.scss';
import weatherApi from '../../api/weather-api';
import CurrentWeather from '../Current-weather/CurrentWeather';
import SearchBar from '../Search-bar/SearchBar';
import DetailedWeather from '../Detailed-weather/DetailedWeather';
// background images
import Clear from "../../imgs/backgrounds/Clear.jpeg";
import Clouds from "../../imgs/backgrounds/Clouds.jpeg";
import DefaultImg from "../../imgs/backgrounds/default.jpeg";
import Drizzle from "../../imgs/backgrounds/Drizzle.jpeg";
import FOG from "../../imgs/backgrounds/Fog.jpeg";
import Rain from "../../imgs/backgrounds/Rain.jpeg";
import Snow from "../../imgs/backgrounds/Snow.jpeg";
import Thunderstorm from "../../imgs/backgrounds/Thunderstorm.jpeg";


const API_key = '0775917fc2a3889cd95b31da9ea452c4';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.bgRef = React.createRef(); // ref of a component
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
      forecastWeather: {
        fiveDayForecast: [],
      },
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
      this.setBackground(response.data.weather[0].main);
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
      // console.log('curr state:', this.state);
    }).catch(() => {
      // handle error
      alert('unknown city / error');
    });

    // ---obtain weather forecast data---
    weatherApi.get('forecast', {
      params: {
        q: query, // default city is Sydney
        appid: `${API_key}`,
        units: 'metric' // so that the temp is in Celsius
      } // `http://api.openweathermap.org/data/2.5/forecast?q=Sydney&appid=${API_key}`
    }).then((response) => {
      // handle success
      console.log('forecast response:', response);
      // const fiveDaysData = response.data.list;
      // console.log(this.timeConverter(fiveDaysData[39].dt, response.data.city.timezone))
      this.setState({
        forecastWeather: {
          fiveDayForecast: response.data.list,
        },
      })

    })
  }

  setBackground = (condition) => {
    // set background according to weather condition
    console.log(condition);
    switch (condition) {
      case "Clear":
        this.bgRef.current.style.backgroundImage = `url(${Clear})`;
        this.bgRef.current.style.backgroundPosition = "center";
        break;
      case "Clouds":
        this.bgRef.current.style.backgroundImage = `url(${Clouds})`;
        this.bgRef.current.style.backgroundPosition = "center";
        break;
      case "Drizzle":
        this.bgRef.current.style.backgroundImage = `url(${Drizzle})`;
        this.bgRef.current.style.backgroundPosition = "center";
        break;
      case "Fog":
        this.bgRef.current.style.backgroundImage = `url(${FOG})`;
        this.bgRef.current.style.backgroundPosition = "center";
      case "Rain":
        this.bgRef.current.style.backgroundImage = `url(${Rain})`;
        this.bgRef.current.style.backgroundPosition = "center";
        break;
      case "Snow":
        this.bgRef.current.style.backgroundImage = `url(${Snow})`;
        this.bgRef.current.style.backgroundPosition = "center";
        break;
      case "Thunderstorm":
        this.bgRef.current.style.backgroundImage = `url(${Thunderstorm})`;
        this.bgRef.current.style.backgroundPosition = "center";
        break;
      default:
        this.bgRef.current.style.backgroundImage = `url(${DefaultImg})`;
        this.bgRef.current.style.backgroundPosition = "center";
    }
  }

  amPmConverter = (UNIX_timestamp, timezone) => {
    // console.log(`timezone: ${timezone}, type: ${typeof timezone}`);
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
    const daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // console.log('res.getUTCDay()', res.getUTCDay());
    const day = daysArr[res.getUTCDay()];
    const year = res.getFullYear();
    // getMonth() returns an integer number between 0 and 11, 0 corresponds to January. 
    const month = monthsArr[res.getUTCMonth()];
    const date = res.getUTCDate();
    const currTime = this.amPmConverter(UNIX_timestamp, timezone)
    const time = `${day} - ${date} ${month} ${year} - ${currTime}`;
    return time;
  }

  render () {
    const { city, temp, description, localTime, timezone, weatherIcon, sunrise, sunset,
      clouds, humidity, wind } = this.state.currData;
    const { fiveDayForecast } = this.state.forecastWeather;
    // console.log('fiveDayForecast', fiveDayForecast);
    return (
      <div className="App" ref={this.bgRef}>
        <div className='app-container'>
          <section className='left-container'>
            <SearchBar searching={this.handleSearch} />
            {this.state.isLoading && <h1>Loading...</h1>}
            {!this.state.isLoading && <CurrentWeather
              city={city} temp={temp} description={description} time={localTime}
              weatherIcon={weatherIcon} />
            }
          </section>
          <section className="right-container">
            <DetailedWeather sunrise={sunrise} sunset={sunset} clouds={clouds}
              humidity={humidity} wind={wind} fiveDayForecast={JSON.stringify(fiveDayForecast)} timezone={timezone} />
          </section>
        </div>
      </div>

    )
  }
}
export default App;
