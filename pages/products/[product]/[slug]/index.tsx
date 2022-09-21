import React, { useState } from 'react'
import type { GetStaticProps, GetStaticPaths } from 'next';

import { client } from '../../../../utils/client';
import styles from '../../../../styles/Item.module.scss';
import { Item } from '../../../../types'

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

const Item = ({ item } : {item: Item}) => {
  const { images } = item

  const [activeVariant, setActiveVariant] = useState('')
  const [qty, setQty] = useState(1)

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
          <ImageCarousel images={images} activeVariant = {activeVariant}/>
        </div>

        <div className= {styles.itemInfo}>
          <div className= {styles.information}>
            <ItemInfo item= {item} />
          </div>
          <div className= {styles.colors}>
            <ItemColors colors = {colors} size = {30} />
          </div>
          <div className= {styles.cart}>
            <Quantity qty={qty} setQty = {setQty} />
            <AddToCart />
          </div>
          <div className= {styles.buy}>
            <BuyNow />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const itemQuery = `*[_type == "item" && slug.current == "${slug}"]`
  const itemData = await client.fetch(itemQuery)

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