import React from 'react';

const PersonForm = (props) => (
  <form onSubmit={props.handlePersonAdd}>
    <div>
      name: <input name='name' value={props.newName}
                   onChange={props.handleChange} />
    </div>
    <div>
      number: <input name='number' value={props.newNumber}
                     onChange={props.handleChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
