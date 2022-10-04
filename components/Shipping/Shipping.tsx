import React, { useState } from 'react'
import { Grid, Select, MenuItem, Button, Card, Switch } from '@mui/material'
import { MdLocalShipping } from 'react-icons/md'
import { GoLocation } from 'react-icons/go';

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
        <h3 className='checkout__heading'><MdLocalShipping />Shipping</h3>
      </div>

      <div className= {styles.content}>
        <div className= {styles.activeAdress}>
          <p className= {styles.to}>Delivering to:</p>
          <p className = {styles.address}><GoLocation />{activeAddress}</p>
        </div>
        
        <Card className = {styles.fee} elevation = {5}>
          <div className= {styles.province}>
            Western Cape
          </div>
          <div className = {styles.amount}>
            R400
          </div>
        </Card>

        <div className= {styles.viewFees}>
          <p>view delivery fees</p>
        </div>

        <div className = {styles.differentAddress}>
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


        <div className= {styles.confirm}>
          <Button variant = 'contained' sx = {{borderRadius: '20px', backgroundColor: 'var(--color-primary)'}}>Confirm</Button>
        </div>
      </div>
    </div>
  )
}

export default Shipping