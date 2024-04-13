import { useEffect } from "react";
import { useState } from "react";
import {
  addContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from "./lib/server";

const Filter = ({ filter, setFilter }) => {
  const handleFilterInput = (event) => {
    setFilter(event.target.value);
  };
  return (
    <div>
      <h2>Search</h2>
      <label htmlFor="search">Search for a name:</label>
      <input
        type="text"
        id="search"
        value={filter}
        onChange={handleFilterInput}
      />
    </div>
  );
};

const AddPerson = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const handleNewNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneInput = (event) => {
    setNewPhone(event.target.value);
  };
  const handleNewPersonSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      console.log("existingPerson", existingPerson);
      confirm(
        `${newName} is already in the phonebook, replace the old number with a new one?`
      ) &&
        updateContact({ ...existingPerson, number: newPhone }) &&
        setPersons(
          persons.map((p) =>
            p.name === newName ? { ...p, number: newPhone } : p
          )
        );
    } else {
      const newPerson = { name: newName, number: newPhone };
      addContact(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
      });
    }
    setNewName("");
    setNewPhone("");
  };

  return (
    <form onSubmit={handleNewPersonSubmit}>
      <h2>Add someone in your phonebook</h2>

      <div>
        <label htmlFor="newName">name:</label>
        <input id="newName" value={newName} onChange={handleNewNameInput} />
      </div>

      <div>
        <label htmlFor="newPhone">phone:</label>
        <input id="newPhone" value={newPhone} onChange={handleNewPhoneInput} />
      </div>

      <div>
        <button type="submit">Add to phonebook</button>
      </div>
    </form>
  );
};
const ContactsList = ({ persons, setPersons, filter }) => {
  const contactsToDisplay =
    filter.length > 0
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  const handleDelete = (person) => {
    confirm(`Delete ${person.name} ?`) && deleteContact(person.id);
    setPersons(persons.filter((p) => p.id !== person.id));
  };
  return (
    <div>
      <h2>Numbers</h2>
      {contactsToDisplay.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <ul>
          {contactsToDisplay.map((person) => (
            <li key={person.id}>
              {person.name} : {person.number}{" "}
              <button onClick={() => handleDelete(person)}>delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    getAllContacts
      .then((data) => setPersons(data))
      .then(console.log("data loaded"));
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <AddPerson persons={persons} setPersons={setPersons} />
      <ContactsList persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
