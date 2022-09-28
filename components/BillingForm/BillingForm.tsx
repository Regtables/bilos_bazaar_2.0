import React from 'react'
import { Grid, MenuItem, Select, InputLabel, Button } from '@mui/material'
import { AiFillInfoCircle } from 'react-icons/ai';

import styles from './BillingForm.module.scss'

import Input from '../Input/Input'
import { minWidth } from '@mui/system'

const BillingForm = () => {
  return (
    <div className= {styles.container}>
      <div className= {styles.heading}>
        <h5><AiFillInfoCircle /> Billing Information</h5>
      </div>
      <form>
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
            size = 'meduim'
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
            size = 'meduim'
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
            size = 'meduim'
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
            size = 'meduim'
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
            size = 'meduim'
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
            size = 'meduim'
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
              size = 'meduim'
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
                size = 'meduim'
              />
            </Grid>
          </Grid>
          <Grid item>
            <div className= {styles.save}>
              <Button variant='contained' type = 'submit'>Save</Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default BillingForm