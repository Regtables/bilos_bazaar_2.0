import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, Button } from '@mui/material';
import { BsEye, BsBagPlus } from 'react-icons/bs';

import styles from './ItemCard.module.scss';
import { Item, Variant } from '../../types';
import { itemSlug } from '../../utils/helpers';
import { addCartItem, selectCartItems, toggleCart } from '../../redux/cart';
import { addItemToWishlist, addToWishlist, removeFromWishlist, selectUser } from '../../redux/auth'
import { setToggleAlert } from '../../redux/altert';

import Preview from '../Prevew/Preview';
import SlideShowImage from '../SlideShowImage/SlideShowImage';
import Wishlist from '../Wishlist/Wishlist';
import ColorSelect from '../ColorSelect/ColorSelect';

const colors = [
	'#33ab9f',
	'#0276aa',
	'#8561c5',
	'#f44336',
	'#ffcd38',
	'#ffeb3b',
];

const ItemCard = ({ item }: { item: Item }) => {
	const { name, price, variants, category: { category } } = item
	const dispatch = useDispatch<AppDispatch>()
	const cart = useSelector(selectCartItems)
	const user = useSelector(selectUser)
	const [hover, setHover] = useState(false);
	const [isLoved, setIsLoved] = useState(user?.wishlist?.filter((wishListedItem: Item) => wishListedItem?._id === item._id).length > 0 ? true : false)
	const [activeVariant, setActiveVariant] = useState(item?.variants[0])
	const [qty, setQty] = useState(1)
	const [showPreview, setShowPreview] = useState(false);


	const handleWishlistToggle = async () => {
		if(user._id){
			const wishlist = user?.wishlist

			const existingItem = wishlist?.filter((wishlistItem: any) => wishlistItem.name === name)[0]
		
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
			qty,
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
					borderRadius: '10px',
					outline: '1px solid #e3e3e3',

					"&:hover": {
						boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.10)'
					}
				}}
				raised
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className={styles.addToWishlist}></div>
				<div className={styles.overlay} />

				<div className={styles.image}>
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
							handleToggle = {handleWishlistToggle}
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
					<h5 className={styles.category}>{category}</h5>
					<h3 className={styles.name}> {name}</h3>
					<h4 className={styles.price}>R {price}</h4>

					<div className={styles.colors}>
						<ColorSelect 
							variants={variants}
							activeVariant = {activeVariant}
							setActiveVariant = {setActiveVariant}
							size = {22}
							setIndex = {false}
						/>
					</div>

					<div className= {styles.view}>
						<Link href = {itemSlug(item)}>
							<Button sx = {{fontSize: '12px', display: 'flex', flexDirection: 'column', padding: '1rem', color: 'var(--color-primary)'}}>
								view item
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
