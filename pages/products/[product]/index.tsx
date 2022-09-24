import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Paper, TextField, InputAdornment } from '@mui/material'
import { client, urlFor } from '../../../utils/client'
import { useNextSanityImage } from 'next-sanity-image'
import { BsSearch } from 'react-icons/bs'

import styles from '../../../styles/Product.module.scss'
import { Item, Product } from '../../../types'
import { productItemsQuery } from '../../../utils/queries'
import { selectActiveCategory } from '../../../redux/items'

import CategoryList from '../../../components/CategoryList/CategoryList'
import Breadcrums from '../../../components/Breadcrums/Breadcrums'
import ItemCard from '../../../components/ItemCard/ItemCard'

const Product = ({ product, items } : { product: Product, items: [Item] } ) => {
  const { product: name, productImage: image, categories } = product
  const activeCategory = useSelector(selectActiveCategory)

  const imageProps: any = useNextSanityImage(client, image)
  console.log(product)
  console.log(items)

  return (
    <div className = {`${styles.page} section__padding`}>
      <div className= {styles.breadcrums}>
        <Breadcrums
          product = {name}
          category = {activeCategory}
          item = {''}
        />
      </div>
      <Paper className= {styles.container} elevation = {8}>
          <div 
            className= {styles.banner}
          >
            <div className = {styles.heading}>
              <h1>{name}</h1>
            </div>
            {/* <div className= {styles.search}>
              <TextField 
                size='small' 
                label = 'Search'
                variant='filled'
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsSearch />
                    </InputAdornment>
                  )
                }}
              />
            </div> */}
          </div>

          <div className= {styles.content}>
            <div className = {styles.categories}>
              <CategoryList 
                categories={categories} 
              />
            </div>
            <div className = {styles.items}>
              {items.map((item, i) => (
                <ItemCard item = {item} key = {i} />
              ))}
            </div>
          </div>
      </Paper>
    </div>
  )
}

export const getStaticProps = async ({ params: { product } } : {params: any }) => {
  const productQuery= `*[_type == "product" && product == "${product.replace('-', ' ')}"]{product, categories[]->, productImage}`
  const productData = await client.fetch(productQuery)

 const productItemsData = await client.fetch(productItemsQuery(product))

  return {
    props: {
      product: productData[0],
      items: productItemsData
    }
  }
}

export const getStaticPaths = async () => {
  const productsQuery = '*[_type == "product"]{slug{current}}';
	const products = await client.fetch(productsQuery);

	const paths = products.map((product: any) => ({
		params: {
			product: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}

export default Product