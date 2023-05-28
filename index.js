const contacts = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.time("speed test");
      contacts.listContacts();
      console.timeEnd("speed test");
      break;

    case "get":
      console.time("speed test");
      contacts.getContactById(id);
      console.timeEnd("speed test");
      break;

    case "add":
      console.time("speed test");
      contacts.addContact(name, email, phone);
      console.timeEnd("speed test");
      break;

    case "remove":
      console.time("speed test");
      contacts.removeContact(id);
      console.timeEnd("speed test");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
