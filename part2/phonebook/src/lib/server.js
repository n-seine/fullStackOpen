import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAllContacts = axios.get(baseURL).then((response) => {
  return response.data;
});
const addContact = (person) =>
  axios.post(baseURL, person).then((response) => response.data);
const deleteContact = (id) =>
  axios.delete(`${baseURL}/${id}`).then((response) => response.data);

const updateContact = (newPerson) =>
  axios
    .put(`${baseURL}/${newPerson.id}`, newPerson)
    .then((response) => response.data);

export { getAllContacts, addContact, updateContact, deleteContact };
