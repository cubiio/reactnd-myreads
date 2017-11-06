import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import Icon from '../icons/icons';
import Book from './Book';
import * as BooksAPI from '../utils/BooksAPI';

const SearchBooksBar = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
`;

const SearchBooksBarInput = styled(DebounceInput)`
  width: 100%;
  padding: 15px 10px;
  font-size: 1.25em;
  border: none;
  outline: none;
`;

const SearchBooksInputForm = styled.form`
  flex: 1;
  background: #e9e;
`;

const SearchBooksResults = styled.div`
  padding: 80px 10px 20px;
`;

const BooksGridOL = styled.ol`
  list-style-type: none;
  padding: 0;
  margin: 0;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const CloseSearch = styled.div`
  position: fixed;
  right: 25px;
  bottom: 25px;
`;

const CloseSearchLink = styled(Link)`
  display: block;
  top: 20px;
  left: 15px;
  width: 50px;
  height: 53px;
  background: white;
  background-image: url(${Icon.arrowBackIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 28px;
  font-size: 0;
`;

class SearchPage extends Component {
  state = {
    error: false,
    userSearch: '',
    searchResults: [],
  };

  handleUserSearch = (e) => {
    const userSearch = e.target.value;
    if (userSearch === '' || userSearch === undefined) {
      this.setState({ userSearch: '' });
    } else {
      this.setState({ userSearch });
      BooksAPI.search(this.state.userSearch)
        .then((searchResults) => {
          this.assignBookShelf(searchResults);
          this.setState({
            searchResults,
            error: false,
            // userSearch: '',
          });
        })
        .catch((err) => {
          this.setState({
            error: true,
            searchResults: [],
            // userSearch: '',
          });
        });
    }
  };

  assignBookShelf = (searchResults) => {
    if (searchResults.error !== 'error') {
      for (const book of this.props.books) {
        for (const result of searchResults) {
          if (book.id === result.id) {
            result.shelf = book.shelf;
          } else {
            result.shelf = 'none';
          }
        }
      }
    }
  };

  render() {
    return (
      <div className="search-books">
        <SearchBooksBar>
          <SearchBooksInputForm>
            <SearchBooksBarInput
              minLength={2}
              debounceTimeout={300}
              onChange={e => this.handleUserSearch(e)}
              placeholder="Search by title or author"
              value={this.state.userSearch}
            />
          </SearchBooksInputForm>
        </SearchBooksBar>
        <SearchBooksResults>
          <BooksGridOL>
            {this.state.error && <div>Your search returned no results</div>}
            {this.state.searchResults.length > 0 &&
              this.state.searchResults
                .filter(b => b.shelf === 'none')
                .map(b => (
                  <Book
                    key={b.id}
                    book={b}
                    onUpdateBook={this.props.onUpdateBook}
                  />
                ))}
          </BooksGridOL>
        </SearchBooksResults>
        <CloseSearch>
          <CloseSearchLink to="/">Go back</CloseSearchLink>
        </CloseSearch>
      </div>
    );
  }
}

SearchPage.propTypes = {
  books: PropTypes.array,
  onUpdateBook: PropTypes.func.isRequired,
};

SearchPage.defaultProps = {
  books: [],
};

export default SearchPage;
