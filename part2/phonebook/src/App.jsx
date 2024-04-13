import { useState } from "react";

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
    const handleDuplicateName = () => {
      alert(`${newName} is already added to phonebook`);
    };
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      handleDuplicateName();
    } else {
      const newPersons = [...persons, { name: newName, phone: newPhone }];
      setPersons(newPersons);
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
const ContactsList = ({ persons, filter }) => {
  const contactsToDisplay =
    filter.length > 0
      ? persons.filter((p) => p.name.includes(filter))
      : persons;
  return (
    <div>
      <h2>Numbers</h2>
      {contactsToDisplay.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <ul>
          {contactsToDisplay.map((person) => (
            <li key={person.name}>
              {person.name} : {person.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "01 23 45 68 90" },
    { name: "Vincent Van Gogh", phone: "06 00 00 00 00" },
    { name: "Gustav Klimt", phone: "07 00 00 00 00" },
    { name: "Pablo Picasso", phone: "08 00 74 34 00" },
    { name: "Claude Monet", phone: "09 00 08 00 00" },
    { name: "Salvador Dali", phone: "10 00 00 00 00" },
    { name: "Edvard Munch", phone: "11 00 00 00 00" },
    { name: "Jackson Pollock", phone: "12 00 00 00 00" },
  ]);
  const [filter, setFilter] = useState("");

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <AddPerson persons={persons} setPersons={setPersons} />
      <ContactsList persons={persons} filter={filter} />{" "}
    </div>
  );
};

export default App;
