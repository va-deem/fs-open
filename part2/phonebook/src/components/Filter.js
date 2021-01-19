import React from 'react';

const Filter = ({ handleChange }) => (
  <div>
    filter shown with: <input name="filter" onChange={handleChange} />
  </div>
);

export default Filter;
