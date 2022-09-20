import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:3000' })

//authentication
export const signin = (formData) => API.post('/api/auth/signin', formData)
export const signup = (formData) => API.post('/api/auth/signup', formData)

