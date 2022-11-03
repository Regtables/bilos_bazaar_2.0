import React from 'react';

import { Contact, Question } from '../../types';
import { client } from '../../utils/client';
import { contactQuery } from '../../utils/queries';
import styles from './Contact.module.scss';

import ContactLocation from '../../components/ContactLocation/ContactLocation';
import ContactDetails from '../../components/ContactDetails/ContactDetails';
import ContactForm from '../../components/ContactForm/ContactForm'

import MotionWrapper from '../../wrappers/MotionWrapper';

const Contact = ({ contact, faq } : { contact: Contact, faq: Question[]}) => {
	return (
    <MotionWrapper>
      <div className={`${styles.container} section__padding`}>
        <div className = {styles.content}>
          <div className= {styles.left}>
            <div className = {styles.heading}>
              <h1>We would <span>love</span> to hear from you</h1>
            </div>
            <div className= {styles.details}>
              <ContactDetails contact = {contact} />
            </div>
            <div className= {styles.form}>
              <ContactForm />
            </div>
          </div>
          <div className= {styles.contactDetails}>
            <ContactLocation contact={contact} />
          </div>
        </div>
      </div>
    </MotionWrapper>
	);
};

export const getStaticProps = async () => {
  const contactData = await client.fetch(contactQuery())
  const faqData = await client.fetch('*[_type == "faq"]')

  return {
    props: {
      contact: contactData[0],
      faq: faqData
    },
    revalidate: 1
  }
}

export default Contact;
