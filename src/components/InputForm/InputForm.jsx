import PropTypes from 'prop-types';
import { useState } from 'react';
import s from './InputForm.module.css';

export function InputForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const inputOperator = event => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'number') {
      setNumber(event.target.value);
    } else {
      throw new Error('Unknown input errord');
    }
  };

  const formSubmit = event => {
    event.preventDefault();
    addContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={formSubmit}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. 
                        For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={inputOperator}
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={inputOperator}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}

InputForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
