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
        time: "",
        sunrise: "",
        sunset: "",
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
          time: this.timeConverter(response.data.dt),
          sunrise: this.amPmConverter(response.data.sys.sunrise),
          sunset: this.amPmConverter(response.data.sys.sunset),
        },
        currWeatherCondition: response.data.weather[0].main
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

  amPmConverter = (UNIX_timestamp) => {
    const res = new Date(UNIX_timestamp * 1000);
    const min = res.getMinutes();
    const hour = res.getHours();
    const currTime = hour > 12 ? `${hour - 12}:${min}PM` : `${hour}:${min}AM`;
    return currTime;
  }

  timeConverter = (UNIX_timestamp) => {
    // Create a new JavaScript Date object based on the timestamp,
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const res = new Date(UNIX_timestamp * 1000);
    console.log(`res: ${res}`);
    console.log(res.getMonth());
    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const daysArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const day = daysArr[res.getDay() - 1];
    const year = res.getFullYear();
    // getMonth() returns an integer number between 0 and 11, 0 corresponds to January. 
    const month = monthsArr[res.getMonth()];
    const date = res.getDate();
    const currTime = this.amPmConverter(UNIX_timestamp)
    const time = `${day} - ${date} ${month} ${year} - ${currTime}`;
    return time;
  }

  render () {
    const { city, temp, description, time, sunrise, sunset } = this.state.currData
    return (
      <div className='app-container'>
        <section className='left-container'>
          <SearchBar searching={this.handleSearch} />
          {this.state.isLoading && <h1>Loading...</h1>}
          {!this.state.isLoading && <CurrentWeather
            city={city} temp={temp} description={description} time={time}
          />}
        </section>
        <section className="right-container">
          <DetailedWeather sunrise={sunrise} sunset={sunset} />
        </section>
      </div >

    )
  }
}
export default App;
