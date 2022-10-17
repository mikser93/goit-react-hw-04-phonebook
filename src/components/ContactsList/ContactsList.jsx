import { Contact } from './Contact';
import PropTypes from 'prop-types';
import s from './ContactsList.module.css';

export function ContactsList({ deleteContact, currentContacts }) {
  return (
    <ul className={s.contactsList}>
      <Contact
        currentContacts={currentContacts}
        deleteContact={deleteContact}
      />
    </ul>
  );
}

ContactsList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  currentContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
