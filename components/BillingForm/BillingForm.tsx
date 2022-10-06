import React from 'react'
import { Grid, MenuItem, Select, InputLabel, Button } from '@mui/material'
import { AiFillInfoCircle } from 'react-icons/ai';

import styles from './BillingForm.module.scss'

import Input from '../Input/Input'

const BillingForm = ({checkout} : {checkout: boolean}) => {
  return (
    <div className= {styles.container}>
      <div 
        className= {styles.heading} 
        style = {checkout ? {backgroundColor: 'rgb(228, 229, 230)', padding: '0.5rem 1rem'} : {backgroundColor: 'white', padding: '0rem'}}
      >
        <h3 className='checkout__heading'><AiFillInfoCircle /> Billing Information</h3>
      </div>
      <form 
        className= {styles.form} 
        style = {checkout ? {padding: '1rem'} : {padding: '0rem'}}
      >
        <Grid container spacing = {2}>
          <Input 
            name = 'name'
            label='Name'
            half = {true}
            type = 'text'
            autoFocus = {true}
            onChange = {() =>{}}
            value = {''}
            handleShowPassword = {false}
          />
          <Input 
            name = 'surname'
            label='Surname'
            half = {true}
            type = 'text'
            autoFocus = {false}
            onChange = {() =>{}}
            value = {''}
            handleShowPassword = {false}
          />
          <Input 
            name = 'phone'
            type = 'text'
            label='Phone Number'
            half = {true}
            autoFocus = {false}
            onChange = {() =>{}}
            value = {''}
            handleShowPassword = {false}
          />  
          <Input 
            name = 'email'
            label='Email'
            type = 'email'
            half = {true}
            autoFocus = {false}
            onChange = {() =>{}}
            value = {''}
            handleShowPassword = {false}
          />
          <Input 
            name = 'city'
            label='City'
            type = 'text'
            half = {true}
            autoFocus = {false}
            onChange = {() =>{}}
            value = {''}
            handleShowPassword = {false}
          />
          <Grid item sm = {6}>
            {/* <InputLabel id = 'province'>Province</InputLabel> */}
            <Select
              label = 'Province'
              fullWidth = {true}
              // labelId = 'province'
              sx = {{
                width: '100%',
                minWidth: '100%'
              }}
              >
                <MenuItem value = 'Western Cape'>Western Cape</MenuItem>
                <MenuItem value = 'Eastern Cape'>Eastern Cape</MenuItem>
                <MenuItem value = 'test'>Northen Cape</MenuItem>
                <MenuItem value = 'test'>Kwazulu Natal</MenuItem>
                <MenuItem value = 'test'>Gauteng</MenuItem>
            </Select>
          </Grid>
          <Input 
            name = 'address'
            label='Street Address'
            type = 'text'
            half = {true}
            autoFocus = {false}
            onChange = {() =>{}}
            value = {''}
            handleShowPassword = {false}
          />
          <Grid item sm = {6} sx = {{display: 'flex', justifyContent: 'space-between'}}>
            <Input 
              name = 'address'
              label='Street Address'
              type = 'text'
              half = {true}
              autoFocus = {false}
              onChange = {() =>{}}
              value = {''}
              handleShowPassword = {false}
            />
            <Grid item sm = {6}>
              <Input 
                name = 'address'
                label='Street Address'
                type = 'text'
                half = {true}
                autoFocus = {false}
                onChange = {() =>{}}
                value = {''}
                handleShowPassword = {false}
              />
            </Grid>
          </Grid>
          <Grid item>
            <div className= {styles.save}>
              <Button variant='contained' type = 'submit' sx = {{borderRadius: '20px', backgroundColor: 'var(--color-primary)'}}>Save</Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default BillingForm