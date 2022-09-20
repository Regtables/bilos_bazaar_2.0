import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ButtonBase, Grid } from '@mui/material'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './ProductTile.module.scss'
import { client } from '../../utils/client'

const ProductTile = ({ product }) => {
  const { product: name, productImage: image, slug } = product
  const imageProps: any = useNextSanityImage(client, image)

  return (
    <ButtonBase className = {styles.container} href = {`/products/${slug.current}`}>
      {/* <div className='container'> */}
        <div className= {styles.image}>
          <Image 
            { ...imageProps }
            layout = 'fill'
            objectFit='cover'
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

export default ProductTile