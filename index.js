const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const contactsOperations = require('./contacts');

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

(async () => {
  const { action, id, name, email, phone } = argv;
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newData = await contactsOperations.addContact(name, email, phone);
      console.log(newData);
      break;
    
    case 'remove':
      const removed = await contactsOperations.removeContact(id);
      if (!removed) {
        console.log(`There is no contact №${id}`);
        return;
    }
      console.log('Contact deleted');
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
})();