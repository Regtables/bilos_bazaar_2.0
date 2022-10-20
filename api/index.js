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
  const response = await fetch(`/api/auth/fetch`, {
    method: 'POST',
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json()

  return data
}

export const signup = async (formData) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json()

  console.log(data)

  return data
}

export const saveBillingInfo = async (data) => {
  const response = await fetch('/api/user/saveBillingInfo', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.user.token}`
    }
  })

  console.log(response)

}

