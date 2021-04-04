import React, { useEffect, useState } from "react";
import { getTimeCountrie } from "../service/queryCountries";

const OneCountrie = ({ countrie }) => {
  const { languages, name, capital, flag, population } = countrie[0];
  const [timeCoutrie, setTimeCountrie] = useState({});
  useEffect(() => {
    getTimeCountrie(name)
      .then(({ current, request }) => {
        const data = {
          name: request.query,
          state: current.weather_descriptions[0],
          temperature: current.temperature,
          icon: current.weather_icons[0],
          windSpeed: current.wind_speed,
          windDirection: current.wind_dir,
        };
        setTimeCountrie(data);
      })
      .catch((err) => err);
  }, [name]);

  return (
    <div>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>

      <h2>Languages</h2>
      <ul>
        {languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img width="140px" alt={`flag ${name}`} src={flag} />

      {timeCoutrie.name ? (
        <div>
          <h2>
            {timeCoutrie.state} in {timeCoutrie.name}
          </h2>
          <p>
            <strong>Temperature: </strong>
            {timeCoutrie.temperature} Celsius
          </p>
          <img alt={timeCoutrie.state} src={timeCoutrie.icon} />
          <p>
            <strong>Wind: </strong>
            {timeCoutrie.windSpeed} Mph direction {timeCoutrie.windDirection}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OneCountrie;
