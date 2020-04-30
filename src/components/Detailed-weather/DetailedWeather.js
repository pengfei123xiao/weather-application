import React from 'react';
import './detailed-weather.css';

class DetailedWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { sunrise, sunset } = this.props;
    return (
      <div className='detailed-weather-container'>
        <section className="sun-container">
          <p className="sun-container__sunrise">{`SUNRISE ${sunrise}`}</p>
          <p className="sun-container__sunset">{`SUNSET ${sunset}`}</p>
        </section>
      </div>
    )
  }
}

export default DetailedWeather;