import React, { useState } from 'react';
import Image from 'next/image';
import { Backdrop, Button } from '@mui/material';
import { useNextSanityImage } from 'next-sanity-image';
import { IoIosCloseCircleOutline} from 'react-icons/io'
import { TiWeatherWindy } from 'react-icons/ti'

import styles from './Preview.module.scss';
import { client } from '../../utils/client';
import { Item } from '../../types';

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
  addItemToCart
}: {
	item: Item;
	showPreview: boolean;
	setShowPreview: any;
  qty: number;
  setQty: any;
  addItemToCart: any
}) => {
  const { name, price, images } = item

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
            More Information
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
            <Quantity qty = {qty} setQty = {setQty} />
            <AddToCart />
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
