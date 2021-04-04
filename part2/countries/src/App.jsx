import React, { useState, useEffect } from "react";
import Countries from "./component/Countries";
import SearchCountries from "./component/SearchCountries";
import { getAllCountries } from "./service/queryCountries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const handleSearchChange = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    getAllCountries()
      .then((res) => setCountries(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <SearchCountries
        handleSearchChange={handleSearchChange}
        filter={filter}
      />
      <Countries countries={countries} filter={filter} />
    </div>
  );
};

export default App;
