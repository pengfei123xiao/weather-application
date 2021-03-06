import React from 'react';
import './cur-weather.scss';

class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { city, temp, description, time, weatherIcon } = this.props;

    return (
      <section className='cur-weather'>
        <div className='weather-info'>
          <h2>{temp}&#176;C</h2>
          <p>{description}</p>
          <img src={weatherIcon} alt="weatherIcon" />
        </div>
        <div className="divide-line"></div>
        <div className='other-info'>
          <p><strong>{city}</strong></p>
          <p>Local Time: {time}</p>
        </div>
      </section>
    )
  };
};

export default CurrentWeather;