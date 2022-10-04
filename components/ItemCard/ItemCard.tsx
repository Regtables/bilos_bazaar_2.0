import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Typography, Button, ButtonBase } from '@mui/material';
import { useNextSanityImage } from 'next-sanity-image';
import { BsEye, BsBagPlus } from 'react-icons/bs';

import styles from './ItemCard.module.scss';
import { Item } from '../../types';
import { client } from '../../utils/client';
import { itemSlug } from '../../utils/helpers';
import { addCartItem, selectCartItems, toggleCart } from '../../redux/cart';

import Preview from '../Prevew/Preview';

const colors = [
	'#33ab9f',
	'#0276aa',
	'#8561c5',
	'#f44336',
	'#ffcd38',
	'#ffeb3b',
];

const ItemCard = ({ item }: { item: Item }) => {
	const { name, variants } = item
	const dispatch = useDispatch()
	const cart = useSelector(selectCartItems)
	const [hover, setHover] = useState(false);
	const [activeVariant, setActiveVariant] = useState(item?.variants[0])
	const [qty, setQty] = useState(1)
	const [showPreview, setShowPreview] = useState(false);
	const imageProps: any = useNextSanityImage(client, item?.images[0].image);

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
		dispatch(toggleCart(true))
	}

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
								<Button 
									className={styles.button} 
									onClick = {addItemToCart}
								>
									<BsBagPlus />
								</Button>
							</div>

							<div className={styles.preview}>
								<Button
									className={styles.button}
									onClick={() => setShowPreview(true)}
								>
									<BsEye />
								</Button>
							</div>
						</div>
					)}
				</div>

				<ButtonBase href={itemSlug(item)}>
					<div className={styles.content}>
						<h5 className={styles.category}>Towels</h5>
						<h3 className={styles.name}> {item.name}</h3>
						<h4 className={styles.price}>R {item.price}</h4>

						<div className={styles.colors}>
							{colors.map((color, i) => (
								<div
									className={styles.color}
									style={{ backgroundColor: `${color}` }}
									key={i}
								></div>
							))}
						</div>
					</div>
				</ButtonBase>
			</Card>

			{showPreview && (
				<Preview
					item={item}
					qty = {qty}
					incQty = {incQty}
					decQty = {decQty}
					activeVariant = {activeVariant}
					setActiveVariant = {setActiveVariant}
					showPreview={showPreview}
					setShowPreview={setShowPreview}
					addItemToCart = {addItemToCart}
				/>
			)}
		</>
	);
};

export default ItemCard;
