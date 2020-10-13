import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid'
import ContactList, { ContactItem } from './components/ContactsList';
import ConfigurableForm from './components/ConfigurableForm/index';
import Modal from './components/Modal/index';
import { formConfig } from './formConfig';
import './App.css';

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
    // create a new contact using form's fields and uniq ID
    const newContact = { ...obj, id: uniqid.time() } as ContactItem
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
          <ConfigurableForm
            fields={formConfig}
            onSubmit={addContact} />
        </div>
      </Modal>
    </div>
  );
}

export default App;
