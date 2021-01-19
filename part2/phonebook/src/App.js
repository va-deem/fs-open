import React, { useState, useEffect } from 'react';

import contactsService from './services/phonebook';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const filteredPersons = (persons.filter(({ name }) =>
    name.toLowerCase().includes(newFilter)));

  useEffect(() => {
    contactsService.getAllEntries()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const foundPerson = persons.find(person => person.name === newName);
    const updatedPerson = { ...foundPerson, number: newNumber };

    if (foundPerson) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace phone number to new one?`
      )) {
        contactsService.updateEntry(foundPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.data.id
              ? person
              : response.data));
          })
          .catch(error => {
            setNotification({
                type: 'error',
                message: `Contact '${foundPerson.name}' was already deleted from server`
              }
            );
            setPersons(persons.filter(person => person.id !== foundPerson.id));
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          });
      }
    } else {
      const person = { name: newName, number: newNumber };

      contactsService.createEntry(person)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNotification({
              type: 'success',
              message: `Contact '${response.data.name}' was added successfully`
            }
          );
          setTimeout(() => {
            setNotification(null);
          }, 3000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
  };

  const deleteEntry = (id) => {
    if (window.confirm(`Really delete ${persons.find(person => person.id === id).name}?`)) {
      contactsService.deleteEntry(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
  };

  const handleFieldsChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'name':
        setNewName(value);
        break;
      case 'number':
        setNewNumber(value);
        break;
      case 'filter':
        setNewFilter(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter handleChange={handleFieldsChange} />
      <h3>Add a new</h3>
      <PersonForm handleChange={handleFieldsChange} newName={newName}
                  newNumber={newNumber} handlePersonAdd={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deleteEntry={deleteEntry} />
    </div>
  );
};

export default App;
