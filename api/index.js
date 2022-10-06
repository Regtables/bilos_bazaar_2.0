// import axios from "axios";

// const API = axios.create({ baseURL: 'http://localhost:3000' })

//authentication
// export const signin = (formData) => API.post('/api/auth/signin', formData)
export const signin =  async (formData) => {
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return response
}

export const fetchUser = async (id) => {
  console.log(id)
  const response = await fetch(`/api/user/${id}`, {
    method: 'GET',
  })

  return response
}
// export const signup = (formData) => API.post('/api/auth/signup', formData)

