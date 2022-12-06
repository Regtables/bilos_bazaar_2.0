import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { BsInstagram, BsTelephoneFill } from 'react-icons/bs';
import { AiFillMail, AiOutlineMail, AiTwotoneFileExclamation } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go'
import { FaFacebookF, FaQuestion } from 'react-icons/fa';
import { Grid } from '@mui/material';

import styles from './Footer.module.scss';
import { selectContact } from '../../redux/info';
import Facebook from '../Icons/Facebook/Facebook';
import Instagram from '../Icons/Instagram/Instagram';
import { selectProducts } from '../../redux/items';
import { Product } from '../../types';

const SHOP = {
  section: 'shop',
	links: [
		{
			link: 'home decor',
			slug: 'products/home-decor',
		},
		{
			link: 'beach',
			slug: 'products/beach',
		},
	],
};

const COMPLIANCE = {
  section: 'compliance',
	links: [
		{
			link: 'popi compliance',
			slug: '/popi-compliance',
		},
		{
			link: 'terms & conditions',
			slug: '/terms-and-conditions',
		},
    {
      link: 'privacy policy',
      slug: '/privacy-policy'
    }
	],
};

const CONTACT = {
  section: 'contact',
	links: [
    {
      link: 'FAQ',
			icon: <FaQuestion />
    },
		{
			link: '0123456789',
			// icon: <BsTelephone />
		},
		{
			link: 'bilosbazaar@gmail.com',
			icon: <AiOutlineMail />

		},
    {
      link: '123 road, suburb, city, zip',
			icon: <GoLocation />
    }
	],
};

const Section = ({ section, links }: { section: string; links: any[] }) => {
	const { phoneNumber, email, address } = useSelector(selectContact)
	console.log(links)
	return (
		<div className={styles.section}>
			<div className={styles.heading}>
				<h4>{section}</h4>
			</div>
			<div className={styles.links}>
				{links.map((link, i) => (
					<Link href={`${link.slug}`} key = {i}>
						<div 
							className = {styles.link}
							style = { link.icon ? { display: 'flex', alignItems: 'center'} : {display: 'block'}}
						>
								<>
									{link.icon && link.icon}
									<p style = {link.icon ? {margin: '0'} : {margin: ''}}>{link.link}</p>
								</>
						</div>
        	</Link>
				))}
			</div>
		</div>
	);
};

const Footer = () => {
	const products = useSelector(selectProducts)
	const { address, email, phoneNumber }= useSelector(selectContact)
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.left}>
					<div className={styles.logo_wrapper}>
						<Link href='/'>
							<div className={styles.logo}>
								<Image
									src='/logo-no-border.png'
									height={80}
									width={80}
									alt = 'bilos bazaar logo'
								/>
								<div className={styles.logo_text}>
									<h3>Bilos Bazaar</h3>
									<div
										className={styles.logo_partition}
									></div>
									<h4>Turkish Cotton</h4>
								</div>
							</div>
						</Link>
					</div>

					<div className={styles.left_partition}></div>

					<div className={styles.socials}>
						<h3>stay connected</h3>
						<div className={styles.icons}>
							<div className= {styles.icon}>
								<Instagram />
							</div>
							<div className = {styles.icon}>
								<Facebook />
							</div>
						</div>
					</div>
				</div>

				<div className={styles.right}>
          <Grid container className = {styles.sections} spacing = {2} justifyContent = 'center'>
						<Grid item sm = {4} xs = {6}>
							<div className= {styles.section}>
								<Grid item sm = {12} xs = {12}>
									<div className = {styles.heading}>
										<h4>Shop</h4>
									</div>
								</Grid>
								<Grid container className = {styles.links} spacing = {1}>
									{products.map((product: Product, i: number) => (
										<Grid item sm = {12} key = {i} xs= {12}>
											<Link href = {`/products/${product.slug.current}`}>
												<div className= {styles.link}>
													<p>{product.product}</p>
												</div>
											</Link>
										</Grid>
									))}
								</Grid>
							</div>
						</Grid>
						
						<Grid item sm = {4} xs= {6}>
								<div className= {styles.section}>
									<Grid item sm = {12} xs = {12}>
										<div className= {styles.heading}>
											<h4>Complaince</h4>
										</div>
									</Grid>
									<Grid container spacing = {1}>
										{COMPLIANCE.links.map((item, i) => (
											<Grid item sm = {12} xs = {12} key = {i}>
												<Link href = {item.slug}>
													<div className = {styles.link}>
														<p>{item.link}</p>
													</div>
												</Link>
											</Grid>
										))}
									</Grid>
								</div>
						</Grid>

						<Grid item sm = {4} xs = {6} className = {styles.section}>
							<div className= {styles.heading}>
								<h4>Contact</h4>
							</div>
							<Grid container className= {styles.links} spacing = {1}>
								<Grid item sm = {12} xs = {12}>
									<div className= {styles.link}>
										<p><FaQuestion />FAQ</p>
									</div>
								</Grid>
								<Grid item sm = {12} xs = {12}>
									<div className= {styles.link}>
										<p><BsTelephoneFill />{phoneNumber}</p>
									</div>
								</Grid>
								<Grid item sm = {12} xs = {12}>
									<div className= {styles.link}>
										<p><AiFillMail />{email}</p>
									</div>
								</Grid>
								<Grid item sm = {12} xs = {12}>
									<div className= {styles.link}>
										<p><GoLocation />{address}</p>
									</div>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<div className= {styles.section}>
						<div className = {styles.yoco}>
							<h5>Powered and secured by</h5>
							<Image 
								src = {'/yoco.svg'}
								height = {30}
								width = {100}
								alt = 'yoco logo'
							/>
						</div>
					</div>
			</div>
		</div>
			<div className={styles.copyright}>
        <p>© 2022 BILOS BAZAAR. All Rights Reserved.</p>
      </div>
	</div>
	);
};

export default Footer;
