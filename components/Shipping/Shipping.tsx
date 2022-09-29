import React, { useState } from 'react'
import { Grid, Select, MenuItem, Button, Card, Switch } from '@mui/material'

import styles from './Shipping.module.scss'
import Input from '../Input/Input'

const Shipping = ({ activeAddress, setActiveAddress }: { activeAddress: string, setActiveAddress: any }) => {
  const [toggleDiff, setToggleDiff] = useState(false)

  const handleToggle = () => {
    setToggleDiff((prev) => !prev)
  }

  return (
    <div className= {styles.container}>
      <div className= {styles.heading}>
        <h3>Shipping</h3>
      </div>

      <div className= {styles.activeAdress}>
        <p className= {styles.to}>Delivering to:</p>
        <p className = {styles.address}>{activeAddress}</p>
      </div>
      <div className = {styles.differentAddress}>
        {/* <div 
          className = {styles.toggle} 
          style = {toggleDiff ? {backgroundColor: 'var(--color-primary)'}: {backgroundColor: 'white'}}
          onClick = {() => setToggleDiff((prev) => !prev)}
        >         
        </div> */}
        <Switch onChange = {handleToggle} />
        <p>Deliver to a different address?</p>
      </div>
      {toggleDiff && (
        <form>
          <Grid container spacing = {2}>
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
          </Grid>
          <Button variant = 'contained'>Save</Button>
        </form>
      )}
      <Card className = {styles.fee} elevation = {3}>
        <div className= {styles.province}>
          Western Cape
        </div>
        <div className = {styles.amount}>
          R400
        </div>
      </Card>

      <div className= {styles.confirm}>
        <Button variant = 'contained'>Confirm</Button>
      </div>
    </div>
  )
}

export default Shipping