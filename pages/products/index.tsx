import React from 'react'
import Head from 'next/head'
import { Grid } from '@mui/material'

import styles from '../../styles/Products.module.scss'
import { client } from '../../utils/client'
import { HeadMeta, Product } from '../../types'
import { headQuery } from '../../utils/queries'

// import ProductTile from '../../components/ProductTile/ProductTile'

const Products = ({ products, head } : { products: [Product], head: HeadMeta}) => {
  console.log(products)
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
          // <ProductTile product = {product} key = {i} />
          <></>
        ))}
      </div>
    </>
  
  )
}

export const getStaticProps = async () => {
  const productsQuery = '*[_type == "product"]'
  const productsData = await client.fetch(productsQuery)

  const headData = await client.fetch(headQuery('products'))

  return {
    props: {
      products: productsData,
      head: headData[0]
    }
  }
}

export default Products