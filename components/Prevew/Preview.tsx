import React, { useState } from 'react';
import Link from 'next/link';
import { Backdrop, Button } from '@mui/material';
import { IoIosCloseCircleOutline} from 'react-icons/io'
import { TiWeatherWindy } from 'react-icons/ti'
import { motion } from 'framer-motion'

import styles from './Preview.module.scss';
import { itemSlug } from '../../utils/helpers';
import { Item, Variant } from '../../types';

import Quantity from '../Quantity/Quantity';
import AddToCart from '../AddToCart/AddToCart';
import BuyNow from '../BuyNow/BuyNow';
import SlideShowImage from '../SlideShowImage/SlideShowImage';
import Wishlist from '../Wishlist/Wishlist';

import MotionWrapper from '../../wrappers/MotionWrapper';
import ColorSelect from '../ColorSelect/ColorSelect';

const colors = [
	'#33ab9f',
	'#0276aa',
	'#8561c5',
	'#f44336',
	'#ffcd38',
	'#ffeb3b',
];

const Preview = ({
	item,
	showPreview,
	setShowPreview,
  qty,
  incQty,
  decQty,
  activeVariant,
  handleVariantChange,
  setActiveVariant,
  addItemToCart,
  isLoved,
  setIsLoved
}: {
	item: Item;
	showPreview: boolean;
	setShowPreview: any;
  qty: number;
  incQty: any,
  decQty: any,
  activeVariant: Variant,
  setActiveVariant: any
  handleVariantChange: any,
  addItemToCart: any,
  isLoved: boolean,
  setIsLoved: any
}) => {
  const { name, price, images, description, category: { category }, variants } = item
  const [animateImage, setAnimateImage] = useState<any>()

  const handleVariantClick = (variant: Variant) => {
    setAnimateImage({opacity: 0.2})

    setTimeout(() => {
      handleVariantChange(variant)
      
    }, 200);

    setTimeout(() => {
      setAnimateImage({opacity: 1})
    }, 300);
  }

	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={showPreview}
			className={styles.container}
		>
      <motion.div 
        className={styles.preview}
        whileInView = {{opacity: [0,1]}}
        initial = {{opacity: 0}}
        transition = {{duration: 0.5}}
      >
        <div 
          className= {styles.close}
          onClick={() => setShowPreview(false)}
        >
          <IoIosCloseCircleOutline />
        </div>
        <motion.div className={styles.banner} animate = {animateImage} transition = {{duration: 0.3}}>
          <SlideShowImage
            image={activeVariant.image}
            priority = {true}
          />
        </motion.div>

        <div className={styles.information}>
          <h6>{category}</h6>
          <div className = {styles.name_wrapper}>
            <h3>{name}</h3>
            <Wishlist 
              isLoved = {isLoved}
              setIsLoved = {setIsLoved}
              handleToggle = {() => {}}
            />
          </div>
          <h4>R {price}</h4>
          <p>{description.short}</p>

          <Button 
            variant = 'text'
            className = {styles.moreInformation}
          >
            <Link href = {itemSlug(item)}> More Information</Link>
          </Button>

          <div className= {styles.partition}>
            <div className= {styles.line}>
            </div>
            <TiWeatherWindy />
            <div className= {styles.line}>
            </div>
          </div>

          <div className = {styles.colors}>
            <ColorSelect 
              activeVariant={activeVariant}
              setActiveVariant = {handleVariantClick}
              variants = {item.variants}
              size = {28}
              setIndex = {false}
            />
          </div>
          
          <div className= {styles.cart}>
            <div className = {styles.qty}>
              <Quantity
                qty = {qty} 
                incQty = {incQty}
                decQty = {decQty}
              />
            </div>
            <div className= {styles.add} onClick = {() => setShowPreview(false)}>
              <AddToCart
                item={item}
                activeVariant = {activeVariant}
                qty = {qty}
              />
            </div>
          </div>

          <div className= {styles.buyNow}>
            <BuyNow />
          </div>
        </div>
      </motion.div>
		</Backdrop>
	);
};

export default Preview;
