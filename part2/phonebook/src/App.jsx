import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleNewNameInput = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNameSubmit = (event) => {
    event.preventDefault();
    const newPersons = [...persons, { name: newName }];
    setPersons(newPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewNameSubmit}>
        <div>
          <label htmlFor="newName">name:</label>
          <input id="newName" value={newName} onChange={handleNewNameInput} />
        </div>
        <div>
          <button type="submit">Add to phonebook</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
