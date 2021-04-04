import React from "react";

const Filter = ({ setFilter, filter }) => {
  const handleSearch = (event) => {
    const test = /^[A-Za-z0-9\s_-]+$/g.test(event.target.value);
    test ? setFilter(event.target.value) : setFilter(event.target.value);
  };
  return (
    <div>
      filter shown with
      <input onChange={handleSearch} value={filter} />
    </div>
  );
};

export default Filter;
