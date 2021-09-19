const fs = require('fs').promises;
const path = require('path');
const contacts = require('./db/contacts.json');

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => contacts;

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactId = contacts.findIndex(contact => contact.id === id);
  if (contactId === -1) {
    return null;
  }
  return contacts[contactId];
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const removeContact = async (id) => {
  const contacts = await listContacts();
   const contactId = contacts.findIndex(contact => contact.id === id);
  if (contactId === -1) {
    return null;
  }
  contacts.splice(contactId, 1);
  await updateContacts(contacts);
  return true;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
}