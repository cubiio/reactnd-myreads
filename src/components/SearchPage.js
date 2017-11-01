import React from 'react';
import styled from 'styled-components';
// import Icon from '../icons/icons';

const SearchBooksBar = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
`;

const SearchBooksBarInput = styled.input`
  width: 100%;
  padding: 15px 10px;
  font-size: 1.25em;
  border: none;
  outline: none;
`;

const SearchBooksInputWrapper = styled.div`
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

// const CloseSearch = styled.div`
//   display: block;
//   top: 20px;
//   left: 15px;
//   width: 50px;
//   height: 53px;
//   background: white;
//   background-image: url(${Icon.arrowBackIcon});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: 28px;
//   font-size: 0;
// `;

const SearchPage = () => (
  <div className="search-books">
    <SearchBooksBar>
      <SearchBooksInputWrapper>
        <SearchBooksBarInput
          type="text"
          placeholder="Search by title or author"
        />
      </SearchBooksInputWrapper>
    </SearchBooksBar>
    <SearchBooksResults>
      <BooksGridOL />
    </SearchBooksResults>
  </div>
);

export default SearchPage;
