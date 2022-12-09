import React, { useEffect } from 'react'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { Grid } from '@mui/material'

import styles from './Products.module.scss'
import { client } from '../../utils/client'
import { Contact, HeadMeta, Product, Item } from '../../types'
import { contactQuery, headQuery, itemsQuery, productsQuery } from '../../utils/queries'
import { setContact } from '../../redux/info'
import { setAllItems, setProducts } from '../../redux/items'

import ProductTile from '../../components/ProductTile/ProductTile'

const Products = ({ products, head, items, contact } : { products: Product[], head: HeadMeta, items: Item[], contact: Contact }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAllItems(items))
    dispatch(setProducts(products))
    dispatch(setContact(contact))

  }, [items, products, contact])

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name = 'decription' content= {head.description}/>
      </Head>
      <div className= {`${styles.container} section__padding`}>
        <header>
          <h1 className= 'section__heading'>Our Products</h1>
        </header>
        {products.map((product, i) => (
          <ProductTile product = {product} key = {i} />
        ))}
      </div>
    </>
  
  )
}

export const getStaticProps = async () => {
  const productsData = await client.fetch(productsQuery())
  const itemsData = await client.fetch(itemsQuery())
  const contactData = await client.fetch(contactQuery())

  const headData = await client.fetch(headQuery('products'))

  return {
    props: {
      products: productsData,
      items: itemsData,
      contact: contactData[0],
      head: headData[0]
    }
  }
}

export default Products