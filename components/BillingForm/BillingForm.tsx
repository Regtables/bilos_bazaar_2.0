import React, { useState, useEffect } from 'react'
import type { AppDispatch } from '../../redux/store'
import { Grid, MenuItem, Select, InputLabel, Button } from '@mui/material'
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

const BillingForm = ({ checkout, user } : {checkout: boolean, user: any }) => {
  const dispatch = useDispatch<AppDispatch>()
  const userData = useSelector(selectUser)
  const [billingInfo, setBillingInfo] = useState(INITIAL_STATE)

  // useEffect(() => {
  //   if(user.user.billingInfo){
  //     setBillingInfo(user.user.billingInfo)
  //   }
  // })

  const handleChange = (e: any) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value })
  }
  const handleSave = (e: any) => {
    e.preventDefault();

    dispatch(setUserBillingInfo)

    const data = {
      billingInfo: billingInfo,
      user: userData
    }
    dispatch(saveBillingInfo(data))

    console.log(billingInfo)
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
            value = {billingInfo.name}
            handleShowPassword = {false}
          />
          <Input 
            name = 'surname'
            label='Surname'
            half = {true}
            type = 'text'
            autoFocus = {false}
            onChange = {handleChange}
            value = {billingInfo.surname}
            handleShowPassword = {false}
          />
          <Input 
            name = 'phoneNumber'
            type = 'text'
            label='Phone Number'
            half = {true}
            autoFocus = {false}
            onChange = {handleChange}
            value = {billingInfo.phoneNumber}
            handleShowPassword = {false}
          />  
          <Input 
            name = 'email'
            label='Email'
            type = 'email'
            half = {true}
            autoFocus = {false}
            onChange = {handleChange}
            value = {billingInfo.email}
            handleShowPassword = {false}
          />
          <Input 
            name = 'city'
            label='City'
            type = 'text'
            autoFocus = {false}
            half = {true}
            onChange = {handleChange}
            value = {billingInfo.city}
            handleShowPassword = {false}
          />
          <Grid item sm = {6}>
            {/* <InputLabel id = 'province'>Province</InputLabel> */}
            <Select
              label = 'Province'
              fullWidth = {true}
              // labelId = 'province'
              defaultValue = {billingInfo.province}
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
            name = 'streetAddress'
            label='Street Address'
            type = 'text'
            half = {true}
            autoFocus = {false}
            onChange = {handleChange}
            value = {billingInfo.streetAddress}
            handleShowPassword = {false}
          />
          <Grid item sm = {6} sx = {{display: 'flex', justifyContent: 'space-between'}}>
            <Input 
              name = 'apt'
              label='apartment number'
              type = 'text'
              half = {true}
              autoFocus = {false}
              onChange = {handleChange}
              value = {billingInfo.apt}
              handleShowPassword = {false}
            />
            <Grid item sm = {6}>
              <Input 
                name = 'zip'
                label='zip code'
                type = 'text'
                half = {true}
                autoFocus = {false}
                onChange = {handleChange}
                value = {billingInfo.zip}
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