import React from 'react'
import { Grid } from '@mui/material'

import styles from '../../styles/Products.module.scss'
import { client } from '../../utils/client'
import ProductTile from '../../components/productTile/ProductTile'


const Products = ({ products }) => {
  console.log(products)
  return (
    <div className= {`${styles.container} section__padding`}>
      <header>
        <h1 className= 'section__heading'>Our Products</h1>
      </header>
      {products.map((product, i) => (
        <ProductTile product = {product} />
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