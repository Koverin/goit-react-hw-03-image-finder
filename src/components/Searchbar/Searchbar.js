import PropTypes from 'prop-types';
import {
  SearchShell,
  SearchForm,
  SearchButton,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onHandleSubmit, onSearchQueryChange, value }) => {
  return (
    <SearchShell>
      <SearchForm onSubmit={onHandleSubmit}>
        <SearchButton type="submit" className="button">
          <span>Search</span>
        </SearchButton>

        <SearchInput
          className="input"
          type="text"
          value={value}
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          onChange={onSearchQueryChange}
        />
      </SearchForm>
    </SearchShell>
  );
};

Searchbar.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
  onSearchQueryChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
