import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material'

import styles from './Alert.module.scss'
import { selectAlert, setToggleAlert } from '../../redux/altert'

const Alert = () => {
  const dispatch = useDispatch()
  const { toggleAlert, title, content } = useSelector(selectAlert)

  return (
    <Dialog
      open = {toggleAlert}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
        <DialogActions>
          <Button onClick = {() => dispatch(setToggleAlert({ ...title, content, toggle: false }))}>Okay</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default Alert