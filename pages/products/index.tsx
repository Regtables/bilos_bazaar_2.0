import React from 'react'
import { Grid } from '@mui/material'

import styles from '../../styles/Products.module.scss'
import { client } from '../../utils/client'
import { Product } from '../../types'

import ProductTile from '../../components/ProductTile/ProductTile'

const Products = ({ products } : { products: [Product]}) => {
  console.log(products)
  return (
    <div className= {`${styles.container} section__padding`}>
      <header>
        <h1 className= 'section__heading'>Our Products</h1>
      </header>
      {products.map((product, i) => (
        <ProductTile product = {product} key = {i} />
      ))}
    </div>
  
  )
}

export const getStaticProps = async () => {
  const productsQuery = '*[_type == "product"]'
  const productsData = await client.fetch(productsQuery)

  return {
    props: {
      products: productsData
    }
  }
}

export default Products