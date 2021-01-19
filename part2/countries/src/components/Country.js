import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const url =
      `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_WEATHER_APPID}&units=metric`;
    axios
      .get(url)
      .then(({ data }) => {
        const { temp } = data.main;
        const { main, icon } = data.weather[0];
        setWeather({ temp, main, icon });
      });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population.toLocaleString('En-en')}</p>
      <b>Languages:</b>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="300px"
           border="1px solid gray" />
      <div>
        <p>Weather in <b>{country.capital}</b>: {weather.main}</p>
        {weather.icon
          ? <img alt="weatherIcon"
                 src={`http://openweathermap.org/img/w/${weather.icon}.png`} />
          : ''}
        <p>Temperature: {weather.temp} C</p>
      </div>
    </div>
  );
};

export default Country;
