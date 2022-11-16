import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';

import { Contact, Question, Item, Product } from '../../types';
import { client } from '../../utils/client';
import { setProducts, setAllItems } from '../../redux/items';
import { setContact } from '../../redux/info';
import { contactQuery, productsQuery, itemsQuery } from '../../utils/queries';
import styles from './Contact.module.scss';

import ContactLocation from '../../components/ContactLocation/ContactLocation';
import ContactDetails from '../../components/ContactDetails/ContactDetails';
import ContactForm from '../../components/ContactForm/ContactForm'

import MotionWrapper from '../../wrappers/MotionWrapper';

const Contact = ({ contact, faq, products, items } : { contact: Contact, faq: Question[], products: Product[], items: Item[]}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAllItems(items))
    dispatch(setProducts(products))
    dispatch(setContact(contact))
  }, [contact, products, items])
	return (
    <>
    <Head>
        <title>{"Bilo's Bazaar - Contact Us"}</title>
    </Head>
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
    </>
	);
};

export const getStaticProps = async () => {
  const contactData = await client.fetch(contactQuery())
  const faqData = await client.fetch('*[_type == "faq"]')


 const productsData = await client.fetch(productsQuery())

 const itemsData = await client.fetch(itemsQuery())

  return {
    props: {
      contact: contactData[0],
      products: productsData,
      items: itemsData,
      faq: faqData
    },
    revalidate: 1
  }
}

export default Contact;
