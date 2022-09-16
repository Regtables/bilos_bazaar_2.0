import React from 'react'
import { TextField, Grid } from '@mui/material'

const Input = ({ name, type, half, autoFocus, label, onChange, handleShowPassword }) => {
  return (
    <Grid item xs = {12} sm = { half ? 6 : 12 }>
      <TextField
        name = {name}
        label = {label}
        autoFocus = {autoFocus}
        type = {type}
        onChange = {onChange}
        variant = 'outlined'
        fullWidth
        required
      />
    </Grid>
  )
}

export default Input