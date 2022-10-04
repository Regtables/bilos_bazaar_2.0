import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import type { GetStaticProps, GetStaticPaths } from 'next';

import { client } from '../../../../utils/client';
import { itemQuery } from '../../../../utils/queries';
import styles from './Item.module.scss';
import { Item, Variant, Color } from '../../../../types'
import { addCartItem } from '../../../../redux/cart';

import ItemInfo from '../../../../components/ItemInfo/ItemInfo';
import ImageCarousel from '../../../../components/ImageCarousel/ImageCarousel'
import ItemColors from '../../../../components/ItemColors/ItemColors';
import Quantity from '../../../../components/Quantity/Quantity';
import AddToCart from '../../../../components/AddToCart/AddToCart';
import BuyNow from '../../../../components/BuyNow/BuyNow';
import Breadcrums from '../../../../components/Breadcrums/Breadcrums';

const colors = [
	'#33ab9f',
	'#0276aa',
	'#8561c5',
	'#f44336',
	'#ffcd38',
	'#ffeb3b',
];

interface Params {
  slug: string,
  product: string
}

const Item = ({ item } : {item: Item}) => {
  const { images, variants } = item
  const dispatch = useDispatch()
  const [activeVariant, setActiveVariant] = useState(item.variants[0])
  const [qty, setQty] = useState(1)
  const itemColors = item.variants.map((variant) => variant.color)

  console.log(itemColors)

  const handleVariantChange = (color: Color) => {
    console.log(color)
    const activeColor = variants.find((variant: Variant) => variant.color === color)
    setActiveVariant(activeColor)

    console.log(activeVariant)
  }

  const incQty = () => {
    setQty((prev) => prev+1)
  }

  const decQty = () => {
    setQty((prev) => prev-1)
  }

  const addItemToCart = () => {
    dispatch(addCartItem({
      item,
      variant: activeVariant,
      qty
    }))
  }
  

  console.log(item)

  return (
    <div className= {`section__padding ${styles.container}`}>
      <div className= {styles.breadcrums}>
        <Breadcrums 
          product='beach'
          category='towels'
          item = {item.name}
        />
      </div>

      <div className= {styles.itemContent}>
        <div className= {styles.imageCarousel}>
          <ImageCarousel 
            images={images} 
            activeVariant = {activeVariant}
          />
        </div>

        <div className= {styles.itemInfo}>
          <div className= {styles.information}>
            <ItemInfo item= {item} />
          </div>
          <div className= {styles.colors}>
            <ItemColors 
              colors = {itemColors} 
              size = {25} 
              activeColor = {activeVariant.color} 
              setActiveColor = {handleVariantChange} 
            />
          </div>
          <div className= {styles.cart}>
            <div className= {styles.qty}>
              <Quantity 
                qty={qty}
                incQty = {incQty} 
                decQty = {decQty}  
              />
            </div>
            <div className= {styles.add}>
              <AddToCart
                item={item}
                activeVariant = {activeVariant}
                qty = {qty}
              />
            </div>
          </div>
          <div className= {styles.buy}>
            <BuyNow />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ params } : { params: any}) => {
  const { slug } = params

  // const itemQuery = `*[_type == "item" && slug.current == "${slug}"]`
  const itemData = await client.fetch(itemQuery(slug))

  return {
    props: {
      item: itemData[0]
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
	const itemsQuery =
		'*[_type == "item"]{slug{current}, product->{slug{current}}}';
	const itemsData = await client.fetch(itemsQuery);

	const paths = itemsData.map((item: Item) => ({
		params: {
			slug: item.slug.current,
			product: item.product.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export default Item