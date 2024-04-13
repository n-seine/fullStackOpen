import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAllContacts = axios.get(baseURL).then((response) => {
  return response.data;
});
const addContact = (person) =>
  axios.post(baseURL, person).then((response) => response.data);

export { getAllContacts, addContact };
