import React, { useState, useEffect } from 'react';
import './App.css';
import ContactList, { ContactItem } from './components/ContactsList';
import ContactForm, { FieldConfig } from './components/ContactForm/index';
import Modal from './components/Modal/index';

const fieldsConfig: FieldConfig[] = [{
  label: 'First Name',
  name: 'firstName',
  required: true,
  errorMessage: 'Enter correct First Name'
}, {
  label: 'Last Name',
  name: 'lastName',
  required: true,
  errorMessage: 'Enter correct Last Name'
}, {
  label: 'Date of Birth',
  name: 'dob',
  type: 'date',
  required: true,
  errorMessage: 'Enter correct Date of Birth'
}, {
  label: 'Phone Number',
  name: 'phone',
  type: 'tel',
  required: true,
  errorMessage: 'Enter correct Phone Number'
}, {
  label: 'E-mail',
  name: 'email',
  type: 'email',
  errorMessage: 'Enter correct E-mail'
}]

function App() {
  const [contacts, setContacts] = useState<ContactItem[]>([])

  const [formVisible, setFormVisible] = useState(false)
  const showForm = () => setFormVisible(true)
  const hideForm = () => setFormVisible(false)

  const saveLocalContacts = () =>
    localStorage.setItem('contants', JSON.stringify(contacts));

  const getLocalContacts = () => {
    const storedItems = localStorage.getItem('contants')
    storedItems === null
      ? localStorage.setItem('contants', JSON.stringify([]))
      : setContacts(JSON.parse(storedItems))
  }

  useEffect(() => getLocalContacts(), [])
  useEffect(() => saveLocalContacts(), [contacts.length])

  const addContact = (obj: object) => {
    const newContact = obj as ContactItem
    setContacts([...contacts, newContact])
    hideForm()
  }

  const removeContact = (id: string) => {
    const filtered = contacts.filter(el => el.id !== id)
    setContacts(filtered)
  }

  return (
    <div className="app-container">
      <h2 className="app-title">Contact List</h2>
      <ContactList items={contacts} onDeleteItem={removeContact} />
      <button onClick={showForm} style={{ margin: '0px auto' }}>Add new contact</button>

      <Modal visible={formVisible} onClose={hideForm}>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ContactForm
            fields={fieldsConfig}
            onSubmit={addContact} />
        </div>
      </Modal>
    </div>
  );
}

export default App;
