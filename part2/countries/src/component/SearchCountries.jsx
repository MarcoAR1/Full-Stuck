import React from "react";

const SearchCountries = ({ handleSearchChange, filter }) => {
  return (
    <p>
      Find countries <input onChange={handleSearchChange} value={filter} />
    </p>
  );
};

export default SearchCountries;
