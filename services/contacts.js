import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createContact = newContactObject => {
  const request = axios.post(baseUrl, newContactObject)
  return request.then(response => response.data)
}

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response)
}

const updateContact = (updatedContactObject, id) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedContactObject)
  return request.then(response => response.data)
  /* return axios.put(`${baseUrl}/${id}`, updatedContactObject)
    .then(response => response.data)
    .catch(error => error) */
}

export default {
  getAllContacts,
  createContact,
  deleteContact,
  updateContact
}