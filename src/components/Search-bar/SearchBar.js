import React from 'react';
import './search-bar.css';
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault(); // prevent jumping to a new page
    console.log(this.state.query);
    this.props.searching(this.state.query);
    // clear search bar
    this.setState({
      query: '',
    })
  }

  handleClick = () => {
    // handle cancel click
    this.setState({
      query: '',
    })
  }

  render () {
    return (
      <section className='search-bar'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Searching...'
            value={this.state.query}
            onChange={this.handleChange} />
          {/* <span onClick={this.handleClick}></span> */}
          <div class="search-bar__close-btn" onClick={this.handleClick}>
            <div class="cross-line"></div>
            <div class="cross-line"></div>
          </div>
        </form>

      </section >
    )
  }
}

export default SearchBar;