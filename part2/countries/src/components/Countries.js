import React from 'react';

const Countries = ({ countries, handleButtonClick }) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches({countries.length}), please specify</p>
    );
  }

  return (
    <ul>
      {countries.map(country =>
        <li key={country.name}>
          {country.name}
          <button onClick={() => handleButtonClick(country)}>show</button>
        </li>)}
    </ul>
  );
};

export default Countries;
