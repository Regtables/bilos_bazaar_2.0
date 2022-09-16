import React, { useState } from 'react'
import Image from 'next/image'
import { Paper } from '@mui/material'
import { client } from '../../../utils/client'
import { useNextSanityImage } from 'next-sanity-image'

import CategoryList from '../../../components/CategoryList/CategoryList'

import styles from '../../../styles/Product.module.scss'

const Product = ({ product }) => {
  const { product: name, productImage: image, categories } = product
  const [activeCategory, setActiveCategory] = useState('')
  const imageProps: any = useNextSanityImage(client, image)
  console.log(product)
  return (
    <div className = {`${styles.page} section__padding`}>
      <div className= {styles.breadcrums}>
      <Paper className= {styles.container}>
          <div className= {styles.banner}>
            <Image 
              { ...imageProps }
              layout = 'fill'
              objectFit='cover'
            />
            <div className = {styles.heading}>
              <h1>{name}</h1>
            </div>
          </div>

          <div className= {styles.content}>
            <div className = {styles.categories}>
              <CategoryList categories={categories} />
            </div>
            <div className = {styles.items}>

            </div>
          </div>
      </Paper>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ params: { product }}) => {
  const productQuery= `*[_type == "product" && product == "${product.replace('-', ' ')}"]{product, categories[]->, productImage}`
  const productData = await client.fetch(productQuery)

  return {
    props: {
      product: productData[0]
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