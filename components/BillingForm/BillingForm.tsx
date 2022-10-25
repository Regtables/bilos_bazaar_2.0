import React, { useState, useEffect } from 'react'
import type { AppDispatch } from '../../redux/store'
import { Grid, MenuItem, Select, InputLabel, Button, FormControl } from '@mui/material'
import { AiFillInfoCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';

import styles from './BillingForm.module.scss'
import { selectUser, setUserBillingInfo, saveBillingInfo } from '../../redux/auth';

import Input from '../Input/Input'

const INITIAL_STATE = {
  name: '',
  surname: '',
  email: '',
  phoneNumber: '',
  city: '',
  province: '',
  streetAddress: '',
  apt: '',
  zip: '',
}

const PROVINCES = [
  'Western Cape',
  'Eastern Cape',
  'Northen Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West'
]

const BillingForm = ({ checkout, userData } : {checkout: boolean, userData: any }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [billingInfo, setBillingInfo] = useState<any>(userData.billingInfo)

  useEffect(() => {
    setBillingInfo(userData.billingInfo)
  },[userData])

  const handleChange = (e: any) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value })
  }

  const handleSave = (e: any) => {
    e.preventDefault();
    dispatch(setUserBillingInfo(billingInfo))
    
    if(localStorage.getItem('biloToken')){
      const data = {
        billingInfo: billingInfo,
      }
  
      dispatch(saveBillingInfo(data))
    } else {
      window.alert('Unauthorized')
    }
  }


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
        onSubmit = {handleSave}
      >
        <Grid container spacing = {2}>
          <Input 
            name = 'name'
            label='Name'
            half = {true}
            type = 'text'
            autoFocus = {true}
            onChange = {handleChange}
            value = {billingInfo?.name}
            handleShowPassword = {false}
            required = {true}
          />

          <Input 
            name = 'surname'
            label='Surname'
            half = {true}
            type = 'text'
            autoFocus = {false}
            onChange = {handleChange}
            value = {billingInfo?.surname}
            handleShowPassword = {false}
            required = {true}
          />

          <Input 
            name = 'phoneNumber'
            type = 'text'
            label='Phone Number'
            half = {true}
            autoFocus = {false}
            onChange = {handleChange}
            value = {billingInfo?.phoneNumber}
            handleShowPassword = {false}
            required = {true}
          />  

          <Input 
            name = 'email'
            label='Email'
            type = 'email'
            half = {true}
            autoFocus = {false}
            onChange = {handleChange}
            value = {billingInfo?.email}
            handleShowPassword = {false}
            required = {true}
          />

          <Input 
            name = 'city'
            label='City'
            type = 'text'
            autoFocus = {false}
            half = {true}
            onChange = {handleChange}
            value = {billingInfo?.city}
            handleShowPassword = {false}
            required = {true}
          />

          <Grid item sm = {6}>
            <FormControl fullWidth>
              <InputLabel id = 'province'>Province</InputLabel>
              <Select
                label = 'Province'
                fullWidth = {true}
                name = 'province'
                required
                onChange = {handleChange}
                value = {billingInfo?.province}
                sx = {{
                  width: '100%',
                  minWidth: '100%'
                }}
                >
                  {PROVINCES.map((province, i) => (
                    <MenuItem 
                      value = {province} 
                      selected = {billingInfo?.province === province}
                    >
                      {province}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Input 
            name = 'streetAddress'
            label='Street Address'
            type = 'text'
            half = {true}
            autoFocus = {false}
            onChange = {handleChange}
            value = {billingInfo?.streetAddress}
            handleShowPassword = {false}
            required = {true}
          />
          <Grid item sm = {6}>
            <Grid container spacing={2} >
              <Grid item sm = {6}>
                <Input 
                  name = 'apt'
                  label='Apartment Number'
                  type = 'text'
                  half = {false}
                  required = {false}
                  autoFocus = {false}
                  onChange = {handleChange}
                  value = {billingInfo?.apt}
                  handleShowPassword = {false}
                />
              </Grid>
              <Grid item sm = {6}>
                <Input 
                  name = 'zip'
                  label='zip code'
                  type = 'text'
                  half = {false}
                  autoFocus = {false}
                  required = {true}
                  onChange = {handleChange}
                  value = {billingInfo?.zip}
                  handleShowPassword = {false}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <div className= {styles.save}>
              <Button 
                variant='contained' 
                type = 'submit' 
                sx = {{
                  borderRadius: '20px', 
                  backgroundColor: 'var(--color-primary)',
                  width: '150px',
                  fontSize: '14px',
                  // fontFamily: 'var(--font-family)',
                  fontWeight: '300'
                }}
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default BillingForm