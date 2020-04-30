import React from 'react';
import './cur-weather.css';

class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { city, temp, description, time } = this.props;

    return (
      <section className='cur-weather'>
        <div className='weather-info'>
          <h1>{temp}&#176;C</h1>
          <p>{description}</p>
        </div>
        <div className="divide-line"></div>
        <div className='other-info'>
          <p>{city}</p>
          <p>{time}</p>
        </div>
      </section>
    )
  };
};

export default CurrentWeather;