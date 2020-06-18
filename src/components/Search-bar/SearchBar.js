import React from 'react';
import { connect } from 'react-redux';
import { createSearch, clearSearch } from '../../redux/actions/weatherActions';

import './search-bar.scss';
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    this.props.createSearch(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault(); // prevent jumping to a new page
    this.props.searching(this.props.searchBarVal);
    // clear search bar
    this.props.clearSearch();
  }

  handleClick = () => {
    // handle cancel click
    this.props.clearSearch();
  }

  render () {
    return (
      <section className='search-bar'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Searching...'
            value={this.props.searchBarVal}
            onChange={this.handleChange} />
          <div className="search-bar__close-btn" onClick={this.handleClick}>
            <div className="cross-line"></div>
            <div className="cross-line"></div>
          </div>
        </form>
      </section >
    )
  }
}

const mapState = (state) => ({
  searchBarVal: state.weatherReducer.searchBarVal,
});

const mapActions = {
  createSearch, clearSearch
}

export default connect(mapState, mapActions)(SearchBar);