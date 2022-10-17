import { nanoid } from 'nanoid';
import { InputForm } from './InputForm/InputForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import s from './App.module.css';
import { useEffect, useState } from 'react';

function App () {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [mountMarker, setMountMarker] = useState(true);

  // Аналог componentDidMount()
  useEffect(() => {
    const currentLS = localStorage.getItem('contactsList');
    if (currentLS) {
      setContacts(JSON.parse(currentLS));
    };
  }, []);
  
  // Аналог componentDidUpdate
  useEffect(() => {
    if (mountMarker) {
      setMountMarker(false);
      return;
    };
    localStorage.setItem('contactsList', JSON.stringify(contacts));
  }, [contacts, mountMarker]);

  const addContact = (name, number) => {
    if (
      contacts
        .find(item => item.name === name)
    ) {
      alert(`${name} is already in contacts`);
    } else {
      const currentContacts = [
        ...contacts,
        { id: nanoid(), name: name, number: number },
      ];
      setContacts(currentContacts);
    }
  };

  const deleteContact = id => {
    const currentContacts = [...contacts].filter(
      item => item.id !== id
    );
    setContacts(currentContacts);
  };

  const filterOperator = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const currentContacts = contacts.filter(item =>
    item.name.toLowerCase().includes(filter)
  );  
    
    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <InputForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          filterOperator={filterOperator}
        />
        <ContactsList
          currentContacts={currentContacts}
          deleteContact={deleteContact}
        />
      </div>
    );
  }

export default App;
