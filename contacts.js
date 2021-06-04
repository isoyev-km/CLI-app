const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
// const contactsPath = {};

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile("./db/contacts.json", "utf-8", function (err, data) {
    try {
      const parsedContacts = JSON.parse(data);
      console.table(parsedContacts);
    } catch (error) {
      console.log("listContacts error", err);
    }
  });
}

function getContactById(contactId) {
  fs.readFile("./db/contacts.json", "utf-8", function (err, data) {
    try {
      const parsedContent = JSON.parse(data);
      const findContact = parsedContent.find((item) => item.id === contactId);
      console.log("findContact", findContact);
    } catch (error) {
      console.log("getContactById error", err);
    }
  });
}

function removeContact(contactId) {
  fs.readFile("./db/contacts.json", "utf-8", function (err, data) {
    try {
      const parsedContent = JSON.parse(data);
      const deleteContact = parsedContent.filter(
        (item) => item.id != contactId
      );
      const newContacts = JSON.stringify(deleteContact);
      fs.writeFile(contactsPath, newContacts, () => {
        console.log("remove contact");
      });
      console.table(deleteContact);
    } catch (error) {
      console.log("removeContact error", err);
    }
  });
}

function addContact({ id, name, email, phone }) {
  fs.readFile("./db/contacts.json", "utf-8", function (err, data) {
    try {
      const parsedContent = JSON.parse(data);

      const newContact = {
        id: parsedContent.length + 1,
        name: name,
        email: email,
        phone: phone,
      };

      const addContactt = [...parsedContent, newContact];
      fs.writeFile(contactsPath, JSON.stringify(addContactt), () => {
        console.log("Contact added");
      });
      console.table(addContactt);
    } catch (error) {
      console.log("addContact error", err);
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
