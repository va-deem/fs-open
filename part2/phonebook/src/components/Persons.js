import React from 'react';

const Persons = ({ persons, deleteEntry }) => (
  <ul>
    {persons.map(person =>
      <li key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deleteEntry(person.id)}>delete</button>
      </li>)}
  </ul>
);

export default Persons;
