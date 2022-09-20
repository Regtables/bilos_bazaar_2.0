import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Typography, Button, ButtonBase } from '@mui/material';
import { useNextSanityImage } from 'next-sanity-image';
import { BsEye, BsBagPlus } from 'react-icons/bs';

import styles from './ItemCard.module.scss';
import { client } from '../../utils/client';
import Preview from '../Prevew/Preview';

const colors = [
	'#33ab9f',
	'#0276aa',
	'#8561c5',
	'#f44336',
	'#ffcd38',
	'#ffeb3b',
];

const ItemCard = ({ item }) => {
	const [hover, setHover] = useState(false);
  const [showPreview, setShowPreview] = useState(false)
	const imageProps: any = useNextSanityImage(client, item.images[0].image);

	console.log(item);
	return (
    <>
		<Card
			elevation={hover ? 8 : 1}
			className={styles.card}
			raised
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<div className={styles.addToWishlist}></div>
			<div className={styles.overlay}></div>

			<div className={styles.image}>
				<Image {...imageProps} layout='fill' objectFit='cover' />
				{hover && (
					<div className={styles.buttons}>
						<div className={styles.addToCart}>
							<Button className={styles.button}>
								<BsBagPlus />
							</Button>
						</div>

						<div className={styles.preview}>
							<Button 
                className={styles.button}
                onClick = {() => setShowPreview(true)}
              >
								<BsEye />
							</Button>
						</div>
					</div>
				)}
			</div>

			<ButtonBase href = {`/products/beach/${item.slug.current}`}>
				<div className={styles.content}>
					<h5 className={styles.category}>Towels</h5>
					<h3 className={styles.name}> {item.name}</h3>
					<h4 className={styles.price}>R {item.price}</h4>
					
					<div className={styles.colors}>
						{colors.map((color, i) => (
              <div
								className={styles.color}
								style={{ backgroundColor: `${color}` }}
								key = {i}
							></div>
              ))}
					</div>	
				</div>
			</ButtonBase>
		</Card>
  {showPreview && (
    <Preview item = {item} showPreview = {showPreview} setShowPreview = {setShowPreview} />
  )}
  </>
	);
};

export default ItemCard;
