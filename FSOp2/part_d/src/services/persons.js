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

export default { getAll, create}