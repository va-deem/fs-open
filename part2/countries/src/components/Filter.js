import React from 'react';

const Filter = ({ handleChange }) => (
  <div>
    find countries: <input onChange={handleChange} />
  </div>
);

export default Filter;
