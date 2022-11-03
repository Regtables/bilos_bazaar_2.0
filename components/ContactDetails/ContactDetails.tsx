import React from 'react'
import { BsTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { AiFillMessage } from 'react-icons/ai'

import styles from './ContactDetails.module.scss'
import { Contact } from '../../types';
import { Grid } from '@mui/material';

const Details = ({ contact } : { contact: Contact}) => {
  const { email, phoneNumber } = contact

  return (
    <div className={styles.information}>
    {/* <div className= 'contact__heading'>
      <p><AiFillMessage /></p>
      <h3>Get in Touch</h3>
    </div> */}
      <Grid container className={styles.content}>
        <Grid item sm = {6} className={styles.item}>
          <p><BsTelephoneFill /></p>
          <p>{phoneNumber}</p>
        </Grid>
        <Grid item sm = {6} className={styles.item}>
          <p><MdEmail /></p>
          <p>{email}</p>
        </Grid>
        <Grid item sm = {6} className={styles.item}>
          <a href='https://www.facebook.com/profile.php?id=100063704474726' target={'_blank'} rel = 'noreferrer'>
            <p><FaFacebookF /></p>
            <p>facebook/bilosbazaar</p>
          </a>
        </Grid>
        <Grid item sm = {6} className={styles.item}>
          <a href='https://www.instagram.com/bilosbazaar/' target= '_blank' rel = 'noreferrer'>
            <p><AiFillInstagram /></p>
            <p>instagram/bilosbazaar</p>
          </a>
        </Grid>
      </Grid>
    </div>
  )
}

export default Details