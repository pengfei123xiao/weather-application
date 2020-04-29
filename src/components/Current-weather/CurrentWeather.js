import React from 'react';
import './cur-weather.css';

class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <section className='cur-weather'>
        <div className='weather-info'>
          <h1>{this.props.temp}&#176;C</h1>
          <p>{this.props.description}</p>
        </div>
        <div class="divide-line"></div>
        <div className='other-info'>
          <p>{this.props.city}</p>
          <p>{this.props.time}</p>
        </div>
      </section>
    )
  };
};

export default CurrentWeather;