import React from 'react';

class CurrentWeather extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <section>
        <h1>{this.props.temp}<span>&#176;C</span></h1>
        <p>{this.props.description}</p>
        <p>{this.props.city}</p>
        <p>{this.props.time}</p>
      </section>
    )
  };
};

export default CurrentWeather;