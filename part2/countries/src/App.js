import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  let filteredCountries = countries.filter(({ name }) =>
    name.toLowerCase().includes(filter));

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleFieldChange = ({ target }) => {
    setFilter(target.value);
  };

  const handleButtonClick = (country) => {
    const { name } = country;
    setFilter(name.toLowerCase());
  };

  return (
    <div>
      <h2>Countries</h2>
      <Filter handleChange={handleFieldChange} />
      {filteredCountries.length === 1
        ? <Country country={filteredCountries[0]} />
        : <Countries countries={filteredCountries}
                     handleButtonClick={handleButtonClick} />}
    </div>
  );
};

export default App;
