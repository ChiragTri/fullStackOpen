// persons communicating with backend server
// 2.13

import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  // defining the promise as request
  const request = axios.get(baseUrl)
  // sending then promise result
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const del = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  console.log('this is the URL for the PUT: ', `${baseUrl}/${id}`)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, del, update }