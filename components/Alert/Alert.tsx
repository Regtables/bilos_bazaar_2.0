import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Alert.module.scss'
import { selectAlert, setToggleAlert } from '../../redux/altert'

const ConfirmButton = ({text, handleClick} : {text:string, handleClick: any}) => {
 return (
    <Button 
      onClick = {handleClick}
      sx = {{
        color: 'white',
        backgroundColor: 'var(--color-primary)',
        borderRadius: '20px',
        padding: '0.3rem 2rem',
        border: '2px solid var(--color-primary)',
        
        "&:hover": {
          backgroundColor: 'white',
          color: 'var(--color-primary)'
        }
      }}
    >
      {text}
    </Button>
  )
}

const Alert = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { toggleAlert, title, content, option, secondOption } = useSelector(selectAlert)

  const handleSecondOption = () => {
    router.push(`${secondOption.href}`)
    dispatch(setToggleAlert({
      toggleAlert: false
    }))
  }

  return (
    <Dialog
      open = {toggleAlert}
    >
      <DialogTitle
        sx = {{
          backgroundColor: 'var(--color-primary)',
          fontFamily: 'var(--font-family)',
          color: 'white',
          fontWeight: '400',
          border: '1px solid var(--color-primary)',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx = {{
          marginTop: '1rem',
        }}
      >
        <DialogContentText 
          sx = {{
            fontWeight: '300'
          }}
        >
          {content}
        </DialogContentText>
        <DialogActions 
          sx = {{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {secondOption && (
            <ConfirmButton text = {secondOption.option} handleClick = {handleSecondOption} />
          )}
          <ConfirmButton text = {option} handleClick = {() => dispatch(setToggleAlert({
            toggleAlert: false
          }))} />

        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default Alert