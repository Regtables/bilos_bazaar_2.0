import React, { useState } from 'react'
import { Grid, Button } from '@mui/material'

import styles from './ContactForm.module.scss'

const INITIAL_STATE = {
  name: '',
  email: '',
  message: ''
}

const ContactForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE)

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name] : e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    //send email
  }

  return (
    <form className= {styles.container} onSubmit = {handleSubmit}>
      <Grid container spacing = {1}>
        <Grid item sm = {6} xs = {12}>
          <input 
            placeholder='Your Name'
            name = 'name'
            type = 'text'
            required
            value = {formData.name}
            onChange = {handleChange}
          />
        </Grid>
        <Grid item sm = {6} xs = {12}>
          <input 
            placeholder='Your Email'
            type = 'email'
            name = 'email'
            required
            value = {formData.email}
            onChange = {handleChange}
          />
        </Grid>
        <Grid item sm = {12} xs = {12}>
          <textarea 
            rows={4} 
            placeholder = 'Your Message' 
            name = 'message'
            required 
            value = {formData.message}
            onChange = {handleChange}
          >
          </textarea>
        </Grid>
        <Grid item sm = {6} xs = {12} className = {styles.submit}>
          <Button 
            variant = 'contained' 
            type = 'submit' 
            fullWidth
            sx = {{
              backgroundColor: 'var(--color-primary)',
              color: '#f6f6f6',
              fontFamily: 'var(--font-family)',
              border: '1px solid #f6f6f6',
              padding: '0.5rem 5rem',
              boxShadow: 'none',

              "&:hover": {
                backgroundColor: '#f6f6f6',
                color: 'var(--color-primary)'
              }
            }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default ContactForm