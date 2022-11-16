import React, { useState } from 'react'
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import type { GetStaticProps, GetStaticPaths } from 'next';

import { client } from '../../../../utils/client';
import { itemQuery, itemsQuery } from '../../../../utils/queries';
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
import SimilarItems from '../../../../components/SimilarItems/SimilarItems';
import Wishlist from '../../../../components/Wishlist/Wishlist';

import MotionWrapper from '../../../../wrappers/MotionWrapper';
import ColorSelect from '../../../../components/ColorSelect/ColorSelect';

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

const Item = ({ item, items } : { item: Item, items: [Item] }) => {
  const { images, variants, category, name } = item
  const dispatch = useDispatch()
  const [activeVariant, setActiveVariant] = useState(item?.variants[0])
  const [activeImage, setActiveImage] = useState(item?.images[0].image)
  const [index, setIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const [isLoved, setIsLoved] = useState(false)
  
  const itemColors = item.variants.map((variant) => variant.color)
  const itemVariants = item.variants.map((variant) => variant)
  const similarItems = items.filter((item) => item.category.category === category.category && item.name !== name )

  const handleVariantChange = (color: Color) => {
    const activeColor = variants?.find((variant: Variant) => variant?.color === color)

    if(activeColor){
      setActiveVariant(activeColor)
    }
    setActiveImage(activeVariant.image)
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

  return (
    <>
      <Head>
        <title>Bilos Bazaar - {item.name}</title>
        <meta name = 'description' content= {item.description.short} />
      </Head>
      <div className= {`section__padding ${styles.container}`}>
        <div className= {styles.breadcrums}>
          <Breadcrums 
            product='beach'
            category='towels'
            item = {item.name}
          />
        </div>
        <MotionWrapper>
          <div className= {styles.itemContent}>
            <div className= {styles.imageCarousel}>
              <ImageCarousel 
                variants={itemVariants} 
                activeVariant = {activeVariant}
                activeImage = {activeImage}
                setActiveImage = {setActiveImage}
                index = {index}
                setIndex = {setIndex}
              />
              <div className= {styles.wishlist}>
                <Wishlist
                  isLoved = {isLoved}
                  setIsLoved = {setIsLoved}
                  handleToggle = {() => {}}
                />
              </div>
            </div>

            <div className= {styles.itemInfo}>
              <div className= {styles.information}>
                <ItemInfo item= {item} />
              </div>
              <div className= {styles.colors}>
                <ColorSelect 
                  variants={item.variants}
                  activeVariant = {activeVariant}
                  setActiveVariant = {setActiveVariant}
                  size = {30}
                  setIndex = {setIndex}
                />
                <p>{activeVariant.color.color}</p>
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
        </MotionWrapper>

        {similarItems.length > 0 && (
          <div className = {styles.similarItems}>
            <SimilarItems 
              items = {similarItems}
            />
          </div>
        )}
      </div>
    </>
  )
}

export const getStaticProps = async ({ params } : { params: any}) => {
  const { slug } = params

  const itemData = await client.fetch(itemQuery(slug))
  
  const itemsData = await client.fetch(itemsQuery())

  return {
    props: {
      item: itemData[0],
      items: itemsData
    },
    revalidate: 1
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
	const itemsQuery ='*[_type == "item"]{slug{current}, product->{slug{current}}, category->}';
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