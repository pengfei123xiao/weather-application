import React from 'react';
import './app.scss';
import weatherApi from '../../api/weather-api';
import CurrentWeather from '../Current-weather/CurrentWeather';
import SearchBar from '../Search-bar/SearchBar';
import DetailedWeather from '../Detailed-weather/DetailedWeather';
import { connect } from 'react-redux';
import { fetchCurrentWeather, fetchForecastWeather } from '../../redux/actions/weatherActions';
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
      initialQuery: 'Sydney' // default query is set as sydney
    };
  }

  componentDidMount () {
    // automatic query Sydney(default city)
    this.fetchWeatherData(this.state.initialQuery);
  }

  handleSearch = (query) => {
    // handle query at the search bar
    this.fetchWeatherData(query);
  }

  fetchWeatherData = (query) => {
    // ---obtain current weather data---
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
      this.props.fetchCurrentWeather(response); // store state in redux
    }).catch((error) => {
      // handle error
      alert('unknown city / error');
      console.log('fetch current weather error:', error)
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
      // console.log('forecast response:', response);
      // const fiveDaysData = response.data.list;
      this.props.fetchForecastWeather(response); // store state in redux
    }).catch((error) => {
      console.log('fetch forecast weather error:', error);
    })
  }

  setBackground = (condition) => {
    // set background according to weather condition
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
        break;
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

  render () {
    const { city, temp, description, localTime, timezone, weatherIcon, sunrise, sunset,
      clouds, humidity, wind } = this.props.currData;
    const { fiveDayForecast } = this.props.forecastWeather;
    // console.log('fiveDayForecast', fiveDayForecast);
    return (
      <div className="App" ref={this.bgRef}>
        <div className='app-container'>
          <section className='left-container'>
            <SearchBar searching={this.handleSearch} />
            {this.props.isLoading && <h1>Loading...</h1>}
            {!this.props.isLoading && <CurrentWeather
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

const mapState = (state) => ({
  searchBarVal: state.weatherReducer.searchBarVal,
  isLoading: state.weatherReducer.isLoading,
  currData: state.weatherReducer.currData,
  currWeatherCondition: state.weatherReducer.currWeatherCondition,
  forecastWeather: state.weatherReducer.forecastWeather,
});

const mapActions = {
  fetchCurrentWeather,
  fetchForecastWeather
}

export default connect(mapState, mapActions)(App);
