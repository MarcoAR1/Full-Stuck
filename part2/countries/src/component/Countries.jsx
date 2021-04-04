import React, { useState, useEffect } from "react";
import OneCountrie from "./OneCountrie";
const Countries = ({ countries, filter }) => {
  const [filterCountries, setFilterCountries] = useState([]);
  const handleShow = (i) => {
    setFilterCountries([filterCountries[i]]);
  };

  useEffect(() => {
    const counterFilter = countries.filter(({ name }) => {
      const filterfilter = filter.replace(/\W/g, " ");
      return name.match(RegExp(`^${filterfilter}`, "i"));
    });

    counterFilter.length > 10
      ? setFilterCountries([])
      : setFilterCountries(counterFilter);
  }, [filter, countries]);

  return (
    <div>
      {filterCountries.length ? (
        filterCountries.length === 1 ? (
          <OneCountrie countrie={filterCountries} />
        ) : (
          filterCountries.map(({ name, alpha3Code }, i) => {
            return (
              <div key={alpha3Code}>
                {name}
                <button onClick={() => handleShow(i)}>show</button>
              </div>
            );
          })
        )
      ) : (
        "Too many matches, specify another filter"
      )}
    </div>
  );
};

export default Countries;
