// const { v4 } = require('uuid');
const updateContacts = require('./updateContacts');

const listContacts = require('./listContacts');

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

module.exports = addContact;