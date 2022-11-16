import React from 'react'
import { Button } from '@mui/material'

const ActionButton = ({ text, handleClick, icon } : { text: string, handleClick: any, icon: any}) => {
  return (
    <Button 
      variant = 'contained'
      sx = {{
        borderRadius: '20px',
        padding: '0.4rem 2rem',
        backgroundColor: 'var(--color-primary)'
      }}
      onClick = {handleClick}
    >
      {text}{icon}
    </Button>
  )
}

export default ActionButton