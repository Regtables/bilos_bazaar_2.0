import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import type { GetStaticProps, GetStaticPaths } from 'next';

import { client } from '../../../../utils/client';
import { contactQuery, itemQuery, itemsQuery, productsQuery } from '../../../../utils/queries';
import styles from './Item.module.scss';
import { Item, Variant, Color, Product, Contact } from '../../../../types'
import { addCartItem } from '../../../../redux/cart';
import { setAllItems, setProducts } from '../../../../redux/items';
import { setContact } from '../../../../redux/info';
import { selectUser, removeFromWishlist, addToWishlist, addItemToWishlist } from '../../../../redux/auth';
import { setToggleAlert } from '../../../../redux/altert';

import ItemInfo from '../../../../components/ItemInfo/ItemInfo';
import ImageCarousel from '../../../../components/ImageCarousel/ImageCarousel'
import Quantity from '../../../../components/Quantity/Quantity';
import AddToCart from '../../../../components/AddToCart/AddToCart';
import BuyNow from '../../../../components/BuyNow/BuyNow';
import Breadcrums from '../../../../components/Breadcrums/Breadcrums';
import SimilarItems from '../../../../components/SimilarItems/SimilarItems';
import Wishlist from '../../../../components/Wishlist/Wishlist';
import ColorSelect from '../../../../components/ColorSelect/ColorSelect';

import MotionWrapper from '../../../../wrappers/MotionWrapper';
import { AppDispatch } from '../../../../redux/store';
import InStock from '../../../../components/inStock/InStock';


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

const Item = ({ item, items, products, contact } : { item: Item, items: [Item], products: Product[], contact: Contact }) => {
  const { images, variants, category, name, product } = item
  console.log(item)
  const dispatch = useDispatch<AppDispatch>()
  const [activeVariant, setActiveVariant] = useState(item?.variants[0])
  const [activeImage, setActiveImage] = useState(item?.images[0].image)
  const [inStock, setInStock] = useState(activeVariant.itemQuantity > 0 ? true : false)
  const [index, setIndex] = useState(0)
  const [qty, setQty] = useState(1)
  const user = useSelector(selectUser)
  console.log(user)
  const [isLoved, setIsLoved] = useState(user?.wishlist?.filter((wishListedItem: Item) => wishListedItem?.name === item.name).length > 0 ? true : false)
  console.log(isLoved)
  
  const itemVariants = item.variants.map((variant) => variant)
  const similarItems = items.filter((item) => item.category.category === category.category && item.name !== name )

  useEffect(() => {
    dispatch(setAllItems(items))
    dispatch(setProducts(products))
    dispatch(setContact(contact))
  }, [products, items, contact])

  useEffect(() => {
    setActiveVariant(item.variants[0])
    setActiveImage(activeVariant.image)
  }, [item])

  const handleWishlistToggle = async () => {
		if(user._id){
			const wishlist = user?.wishlist

			const existingItem = wishlist?.filter((wishlistItem: any) => wishlistItem?.name === name)[0]
		
			const itemToRemove = [`wishlist[_ref == "${item._id}"]`]

			if(existingItem){
				setIsLoved(false)
				dispatch(addItemToWishlist(item))
				const bResponse = await dispatch(removeFromWishlist(item))

			} else if(!wishlist || !existingItem) {
				setIsLoved(true)	
				dispatch(addItemToWishlist(item))
				const response = await dispatch(addToWishlist(item))
			}

		} else {
			dispatch(setToggleAlert({
				toggle: true,
				title: 'Please login',
				content: 'Please login to use the wishlist feature. Would you like to taken to the login page?',
				option: 'no',
				secondOption: {
					href: '/auth',
					option: 'Log in'
				}
			}))
		}
	}

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
            product= {product.product}
            category= {category.category}
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
                  handleToggle = {handleWishlistToggle}
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
              <div className= {styles.stock}>
                <InStock itemQuantity={activeVariant.itemQuantity} />
              </div>
              <div className= {styles.cart}>
                <div className= {styles.qty}>
                  <Quantity 
                    qty={qty}
                    incQty = {incQty} 
                    decQty = {decQty}
                    itemQuantity = {activeVariant.itemQuantity}  
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
                <BuyNow item = {item} activeVariant = {activeVariant} qty = {qty} />
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
  const productsData = await client.fetch(productsQuery())
  const contactData = await client.fetch(contactQuery())

  return {
    props: {
      item: itemData[0],
      items: itemsData,
      products: productsData,
      contact: contactData[0]
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