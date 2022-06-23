import { useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import useLocalStorage from 'hooks/useLocaleStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contactList', []);
  const [filter, setFilter] = useState('');

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = value => {
    const filterNormalize = value.toLowerCase();

    return contacts
      .filter(contact => {
        return contact.name.toLowerCase().includes(filterNormalize);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const formSubmit = ({ name, number }) => {
    const isContact = contacts.find(contact => contact.name === name);

    if (isContact) {
      alert(`${name} is already in contact`);
    } else {
      setContacts(state => {
        const newContact = {
          id: nanoid(),
          name,
          number,
        };
        return [newContact, ...state];
      });
    }
  };

  const contactDelete = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  return (
    <div className="container">
      <h1>Phone Book</h1>
      <ContactForm onSubmit={formSubmit} />

      <h2>Contacts</h2>
      <Filter
        title="Find contact by name"
        onChange={handleFilterChange}
        value={filter}
      />
      <ContactList
        filteredContacts={filteredContacts(filter)}
        onDelete={contactDelete}
      />
    </div>
  );
}

export { App };
