import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

class SearchBar extends Component {
  state = {
    searchValue: '',
  };

  static propTypes = {
    onSearch: PropTypes.func,
  };

  handleChange = event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchValue } = this.state;

    if (searchValue.trim() === '') {
      toast.error('Вы ничего не ищете ;)');
      return;
    }

    this.props.onSubmit(searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchValue"
            value={searchValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
