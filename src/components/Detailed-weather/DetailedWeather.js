import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './detailed-weather.css';

class DetailedWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  windSpd2Lvl = (speed) => {
    // convert wind speed to wind level(Beaufort number)
    // Ref: https://en.wikipedia.org/wiki/Beaufort_scale
    const beaufortTable = [
      {
        min: 0,
        max: 0.49,
        level: 0
      },
      {
        min: 0.5,
        max: 1.5,
        level: 1
      },
      {
        min: 1.6,
        max: 3.3,
        level: 2
      },
      {
        min: 3.4,
        max: 5.49,
        level: 3
      },
      {
        min: 5.5,
        max: 7.9,
        level: 4
      },
      {
        min: 8,
        max: 10.7,
        level: 5
      },
      {
        min: 10.8,
        max: 13.8,
        level: 6
      },
      {
        min: 13.9,
        max: 17.1,
        level: 7
      },
      {
        min: 17.2,
        max: 20.7,
        level: 8
      },
      {
        min: 17.2,
        max: 20.7,
        level: 8
      },
      {
        min: 20.8,
        max: 24.4,
        level: 9
      },
      {
        min: 24.5,
        max: 28.4,
        level: 10
      },
      {
        min: 28.5,
        max: 32.6,
        level: 11
      },
      {
        min: 32.7,
        max: Infinity,
        level: 12
      },
    ]
    var res = 0;
    for (let i = 0; i < beaufortTable.length; i++) {
      const beaufort = beaufortTable[i];
      if (speed >= beaufort.min) {
        if (speed > beaufort.max) {
          continue
        }
        res = beaufort.level;
        break;
      }
    }
    return res;
  }

  render () {
    const { sunrise, sunset, clouds, humidity, wind } = this.props;
    const clouds_data = {
      labels: ['Clouds'],
      datasets: [{
        data: [(clouds / 100), 1 - (clouds / 100)],
        backgroundColor: [
          '#36A2EB',
          'gray'
        ],
      }]
    };
    const humidity_data = {
      labels: ['Humidity'],
      datasets: [{
        data: [(humidity / 100), 1 - (humidity / 100)],
        backgroundColor: [
          '#36A2EB',
          'gray'
        ],
      }]
    };

    const optionsDo = {
      legend: {
        display: true,
        labels: {
          fontColor: "white",
          fontSize: 12
        },
        responsive: true,
        maintainAspectRatio: true,
      },
    }

    return (
      <div className='detailed-weather-container' >
        <section className="sun-container">
          <p className="sun-container__sunrise">{`SUNRISE ${sunrise}`}</p>
          <p className="sun-container__sunset">{`SUNSET ${sunset}`}</p>
        </section>
        <section className="other-weather-info-container">
          <p id='clouds'>{`Clouds - ${clouds}%`}</p>
          <Doughnut data={clouds_data} options={optionsDo} />
          <p id='humidity'>{`Humidity - ${humidity}%`} </p>
          <Doughnut data={humidity_data} options={optionsDo} />
          <p>{`Wind Level - ${this.windSpd2Lvl(wind)}`}</p>
        </section>
      </div >
    )
  }
}

export default DetailedWeather;