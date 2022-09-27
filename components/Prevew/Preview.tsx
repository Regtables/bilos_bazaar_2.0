import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Backdrop, Button } from '@mui/material';
import { useNextSanityImage } from 'next-sanity-image';
import { IoIosCloseCircleOutline} from 'react-icons/io'
import { TiWeatherWindy } from 'react-icons/ti'

import styles from './Preview.module.scss';
import { client } from '../../utils/client';
import { itemSlug } from '../../utils/helpers';
import { Item, Variant } from '../../types';

import Quantity from '../Quantity/Quantity';
import AddToCart from '../AddToCart/AddToCart';
import BuyNow from '../BuyNow/BuyNow';

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
  setQty,
  activeVariant,
  setActiveVariant,
  addItemToCart
}: {
	item: Item;
	showPreview: boolean;
	setShowPreview: any;
  qty: number;
  setQty: any;
  activeVariant: Variant,
  setActiveVariant: any
  addItemToCart: any
}) => {
  const { name, price, images } = item

  console.log(item)

  const imageProps: any = useNextSanityImage(client, images[0].image)
 
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
          <Image 
            { ...imageProps }
            layout = 'fill'
            objectFit='cover'
            objectPosition= '70%'
            priority
            alt = {item.name}
          />
        </div>
				<div className={styles.information}>
          <h6>Towel</h6>
          <h3>{name}</h3>
          <h4>R {price}</h4>
          <p> Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. In fermentum et sollicitudin ac orci phasellus egestas tellus.</p>

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
            {colors.map((color, i) => (
              <div 
                key = {i} 
                className = {styles.color} 
                style = {{backgroundColor: `${color}`}}
              ></div>
            ))}
          </div>
          
          <div className= {styles.cart}>
            <div className = {styles.qty}>
              <Quantity qty = {qty} setQty = {setQty} />
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
