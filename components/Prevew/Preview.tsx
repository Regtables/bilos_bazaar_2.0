import React from 'react';
import Link from 'next/link';
import { Backdrop, Button } from '@mui/material';
import { IoIosCloseCircleOutline} from 'react-icons/io'
import { TiWeatherWindy } from 'react-icons/ti'

import styles from './Preview.module.scss';
import { itemSlug } from '../../utils/helpers';
import { Item, Variant } from '../../types';

import Quantity from '../Quantity/Quantity';
import AddToCart from '../AddToCart/AddToCart';
import BuyNow from '../BuyNow/BuyNow';
import SlideShowImage from '../SlideShowImage/SlideShowImage';
import Wishlist from '../Wishlist/Wishlist';

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
 
	return (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={showPreview}
			className={styles.container}
		>
			<div className={styles.preview}>
        <div 
          className= {styles.close}
          onClick={() => setShowPreview(false)}
        >
          <IoIosCloseCircleOutline />
        </div>
				<div className={styles.banner}>
          <SlideShowImage
            image={activeVariant.image}
            priority = {true}
          />
        </div>

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
            {variants.map((variant, i) => (
              <div 
                key = {i} 
                className = {`${styles.color} ${activeVariant.color.color === variant.color.color ? styles.activeColor : ''}`} 
                style = {{backgroundColor: `${variant.color.colorCode}`}}
                onClick = {() => handleVariantChange(variant)}
              ></div>
            ))}
          </div>
          
          <div className= {styles.cart}>
            <div className = {styles.qty}>
              <Quantity 
                qty = {qty} 
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

          <div className= {styles.buyNow}>
            <BuyNow />
          </div>
        </div>

			</div>
		</Backdrop>
	);
};

export default Preview;
