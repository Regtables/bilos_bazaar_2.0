import React from 'react'
import { Paper } from '@mui/material';
import { IoLocationSharp } from 'react-icons/io5'

import styles from './ContactLocation.module.scss'
import { Contact } from '../../types';

const ContactLocation = ({ contact } : { contact: Contact }) => {
  const { address } = contact
  return (
    <div className={styles.wrapper}>
      <div className={styles.location}>
        <div className= 'contact__heading'>
          <p><IoLocationSharp /></p>
          <h3>Find Us</h3>
        </div>
        <div>
          <div className={styles.item}>
            <a href = 'https://www.google.com/maps/place/24+Hoof+St,+Bushmans+River,+Boesmansriviermond,+6190/@-33.6845265,26.6513501,17z/data=!3m1!4b1!4m6!3m5!1s0x1e65b19fb48db8cf:0x3a0766206cc66125!8m2!3d-33.684531!4d26.6535388!16s%2Fg%2F11c25h033m' target = '_blank' rel = 'noreferrer'>
              <p>{address}</p>
            </a>
          </div>
          <Paper className={styles.map} elevation = {3}>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d982.7269886548889!2d26.653271934737155!3d-33.68462888277086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e65b19fb48db8cf%3A0x3a0766206cc66125!2s24%20Hoof%20St%2C%20Bushmans%20River%2C%20Boesmansriviermond%2C%206190!5e0!3m2!1sen!2sza!4v1666863248509!5m2!1sen!2sza'
              loading='lazy'
            ></iframe>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default ContactLocation