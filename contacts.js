const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { v4: uuidv4 } = require("uuid");

function listContacts() {
  const data = fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(`Error reading file ${contactsPath}`, err);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  });
}

async function getContactById(contactId) {
  try {
    const data = await fs.promises.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const searchingContact = contacts.find((contact) => contactId === contact.id);
    console.table(searchingContact);
    return searchingContact;
  } catch (err) {
    console.error(`Error reading file ${contactsPath}`, err);
  }
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(`Error reading file ${contactsPath}`, err);
      return;
    }
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((contact) => contactId !== contact.id);

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), (err) => {
      if (err) {
        console.error(`Error writing file ${contactsPath}`, err);
        return;
      }
      console.log(`Contacts with ID ${contactId} succesfully removed`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.error(`Error reading file ${contactsPath}`, err);
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
        console.error(`Error writing file ${contactsPath}`, err);
        return;
      }
      console.table(newContact);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
