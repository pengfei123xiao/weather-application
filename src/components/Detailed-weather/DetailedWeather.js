import React from 'react';
// import { Doughnut } from 'react-chartjs-2';
import './detailed-weather.scss';

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

  dateConverter = (UNIX_timestamp, timezone) => {
    // Create a new JavaScript Date object based on the timestamp,
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    // const { timezone } = this.state.currData;
    const res = new Date((UNIX_timestamp + timezone) * 1000);
    const monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // getMonth() returns an integer number between 0 and 11, 0 corresponds to January. 
    const month = monthsArr[res.getUTCMonth()];
    const date = res.getUTCDate();
    const resDate = `${date} ${month}`;
    return resDate;
  }

  render () {
    const { sunrise, sunset, clouds, humidity, wind,
      fiveDayForecast, timezone } = this.props;

    const clouds_data = {
      labels: [`Clouds: ${clouds}%`],
      datasets: [{
        data: [(clouds / 100), 1 - (clouds / 100)],
        backgroundColor: [
          '#36A2EB',
          'gray'
        ],
      }]
    };

    const humidity_data = {
      labels: [`Humidity: ${humidity}%`],
      datasets: [{
        data: [(humidity / 100), 1 - (humidity / 100)],
        backgroundColor: [
          '#36A2EB',
          'gray'
        ],
      }]
    };

    const wind_level = this.windSpd2Lvl(wind);
    const wind_data = {
      labels: [`Wind Level: ${wind_level}/12`],
      datasets: [{
        data: [(wind_level / 12), 1 - (wind_level / 12)],
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
          fontSize: 11
        },
        responsive: false,
        maintainAspectRatio: true,
      },
    }
    let filteredForecast = []
    for (let i = 4; i < JSON.parse(fiveDayForecast).length; i += 10) {
      filteredForecast.push(JSON.parse(fiveDayForecast)[i])
    }
    // console.log('filteredForecast', filteredForecast)

    return (
      <div className='detailed-weather-container' >
        <section className="sun-container">
          <p className="sun-container__sunrise">{`SUNRISE ${sunrise}`}</p>
          <p className="sun-container__sunset">{`SUNSET ${sunset}`}</p>
        </section>
        <section className="other-weather-info-container">
          <p id='clouds'>{`Clouds - ${clouds}%`}</p>
          {/* <div>
            <Doughnut data={clouds_data} width={130} height={110} options={optionsDo} />
          </div> */}
          <p id='humidity'>{`Humidity - ${humidity}%`} </p>
          {/* <div>
            <Doughnut data={humidity_data} width={130} height={110} options={optionsDo} />
          </div> */}
          <p>{`Wind Level - ${this.windSpd2Lvl(wind)}`}</p>
          {/* <div>
            <Doughnut data={wind_data} width={130} height={110} options={optionsDo} />
          </div> */}
        </section>
        <section className="forcast-container">
          {JSON.parse(fiveDayForecast)[0] !== undefined ?
            filteredForecast.map((ele, idx) =>
              (<ForecastList key={idx} date={this.dateConverter(ele.dt, timezone)}
                temp={(ele.main.temp).toFixed(0)}
                weatherIcon={`http://openweathermap.org/img/wn/${ele.weather[0].icon}.png`} />
              )
            )
            : ''}
        </section>
      </div >
    )
  }
}

const ForecastList = (props) => (
  <p>
    <span>{props.date}</span>
    <span>{props.temp}&#176;C</span>
    <img src={props.weatherIcon} alt="weatherIcon" />
  </p>
)

export default DetailedWeather;