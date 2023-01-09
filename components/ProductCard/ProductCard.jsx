import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonBase, Grid } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './ProductCard.module.scss'
import { client } from '../../utils/client'

const ProductCard = ({ product }) => {
  console.log(product)
  const { product: name, productImage: image, slug } = product
  const imageProps = useNextSanityImage(client, image)

  return (
    <ButtonBase className = {styles.container} href = {`/products/${slug.current}`}>
      {/* <div className='container'> */}
        <div className= {styles.image}>
          <Image 
            { ...imageProps }
            layout = 'fill'
            objectFit='cover'
            alt = {name}
            // className= {styles.image}
          />
        </div>
        <div className= {styles.name}>
            <h2>{name}</h2>
        </div>
      {/* </div> */}
    </ButtonBase>
  )
}

export default ProductCard