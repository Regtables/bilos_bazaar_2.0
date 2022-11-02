import React from 'react';

import { Contact } from '../../types';
import { client } from '../../utils/client';
import { contactQuery } from '../../utils/queries';
import styles from './Contact.module.scss';

import ContactDetails from '../../components/ContactDetails/ContactDetails';
import { Question }from '../../types'
import FAQ from '../../components/FAQ/FAQ';
import MotionWrapper from '../../wrappers/MotionWrapper';

const Contact = ({ contact, faq } : { contact: Contact, faq: Question[]}) => {
	return (
    <MotionWrapper>
      <div className={`${styles.container} section__margin`}>
        <header>
          <h1 className='page__heading'>Contact Us</h1>
        </header>
        <main>
          {/* <section className= {styles.faq}>
            <FAQ questions ={faq} />
          </section> */}
          <section className= {styles.contactDetails}>
            <ContactDetails contact={contact} />
          </section>
        </main>
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
