import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, Button } from '@mui/material';
import { useNextSanityImage } from 'next-sanity-image';
import { BsEye, BsBagPlus, BsEyeFill } from 'react-icons/bs';

import styles from './ItemCard.module.scss';
import { Item, Variant } from '../../types';
import { client } from '../../utils/client';
import { itemSlug } from '../../utils/helpers';
import { addCartItem, selectCartItems, toggleCart } from '../../redux/cart';

import Preview from '../Prevew/Preview';
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

const ItemCard = ({ item }: { item: Item }) => {
	const { name, variants } = item
	const dispatch = useDispatch()
	const cart = useSelector(selectCartItems)
	const [hover, setHover] = useState(false);
	const [index, setIndex] = useState(0)
	const [isLoved, setIsLoved] = useState(false)
	const [activeVariant, setActiveVariant] = useState(item?.variants[0])
	const [qty, setQty] = useState(1)
	const [showPreview, setShowPreview] = useState(false);

	// useEffect(() => {
	// 	item.variants[0]
	// }, [])

	const handleVariantChange = (variant: Variant) => {
		setActiveVariant(variant)
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
		dispatch(toggleCart(true))
		setQty(1)
	}

	return (
		<>
			<Card
				elevation={hover ? 8 : 0}
				className={styles.card}
				sx = {{
					borderRadius: '20px',
					outline: '1px solid #e3e3e3',

					"&:hover": {
						boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.10)'
					}
					// boxShadow: '0 4px 6px rgb(0 0 0 / 4%)'
				}}
				raised
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className={styles.addToWishlist}></div>
				<div className={styles.overlay}></div>

				<div className={styles.image}>
					{/* <Image {...imageProps} layout='fill' objectFit='cover' /> */}
					<div className= {styles.imageContainer}>
						<SlideShowImage
							image={activeVariant.image}
							priority = {false}
						/>
					</div>
					<div className= {styles.wishlist}>
						<Wishlist
							isLoved = {isLoved}
							setIsLoved = {setIsLoved}
						/>
					</div>
					{hover && (
						<div className={styles.buttons}>
							<motion.div 
								className={styles.addToCart} 
								whileInView = { { x: ['-50px', '0px'], opacity: [0,1] } }
								initial = { { x: '-50px', opacity: 0}}
								transition = { { duration: 0.2 } }
							>
								<Button 
									className={styles.button} 
									onClick = {addItemToCart}
								>
									<BsBagPlus />
								</Button>
							</motion.div>

							<motion.div 
								className={styles.preview}
								whileInView = { { x: ['50px', '0px'], opacity: [0,1] } }
								initial = { { x: '50px', opacity: 0}}
								transition = { { duration: 0.2 } }
							>
								<Button
									className={styles.button}
									onClick={() => setShowPreview(true)}
								>
									<BsEye />
								</Button>
							</motion.div>
						</div>
					)}
				</div>

				<div className={styles.content}>
					<h5 className={styles.category}>{item.category.category}</h5>
					<h3 className={styles.name}> {item.name}</h3>
					<h4 className={styles.price}>R {item.price}</h4>

					<div className={styles.colors}>
						{item?.variants?.map((variant, i) => (
							<div
								style={{ backgroundColor: `${variant.color.colorCode}` }}
								key={i}
								className = {`${styles.color} ${activeVariant?.color?.color === variant?.color?.color ? styles.activeColor : ''}`} 
								onClick = {() => handleVariantChange(variant)}
							></div>
						))}
					</div>

					<div className= {styles.view}>
						<Link href = {itemSlug(item)}>
							<Button sx = {{fontSize: '12px'}}>
								<p>view item</p>
								<BsEyeFill />
							</Button>
						</Link>
					</div>
				</div>
			</Card>

			{showPreview && (
				<Preview
					item={item}
					qty = {qty}
					incQty = {incQty}
					decQty = {decQty}
					activeVariant = {activeVariant}
					setActiveVariant = {setActiveVariant}
					handleVariantChange = {handleVariantChange}
					showPreview={showPreview}
					setShowPreview={setShowPreview}
					addItemToCart = {addItemToCart}
					isLoved = {isLoved}
					setIsLoved = {setIsLoved}
				/>
			)}
		</>
	);
};

export default ItemCard;
