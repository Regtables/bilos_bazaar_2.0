import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { BsArrowLeft } from 'react-icons/bs'

import styles from './Breadcrums.module.scss';

const Breadcrums = ({
	product,
	category,
	item,
}: {
	product: string;
	category: string;
	item: string;
}) => {
	const router = useRouter()

	return (
		<div className={styles.container}>
			<div className = {styles.crums}>
				<Link href='/'>
					<p>{`bilos bazaar >`}</p>
				</Link>
				<Link href='/products'>
					<p>{`products >`}</p>
				</Link>
				{product && (
					<Link href={`/products/${product}`}>
						<p>{`${product} >`}</p>
					</Link>
				)}
				{category && (
					<Link href={`/products/${product}`}>
						<p>{`${category} >`}</p>
					</Link>
				)}
				{item && (
					<Link href={`/products/${product}/${item}`}>
						<p>{`${item} >`}</p>
					</Link>
				)}
			</div>
			
			<div className= {styles.back}>
				<p onClick = {() => router.back()}><BsArrowLeft /> back</p>
			</div>
		</div>
	);
};

export default Breadcrums;
