import React from 'react';

const Search = ({ handleSearch }) => {
  const handleChange = (event) => {
    handleSearch(event.target.value); // Call handleSearch function passed from parent component
  };

  return (
    <form className="d-flex" onSubmit={(event) => event.preventDefault()}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search product"
        aria-label="Search"
        onChange={handleChange}
      />
       
    </form>
  );
};

export default Search;
