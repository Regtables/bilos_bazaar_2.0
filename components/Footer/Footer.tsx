import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { BsInstagram, BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go'
import { FaFacebookF, FaQuestion } from 'react-icons/fa';

import styles from './Footer.module.scss';
import { selectContact } from '../../redux/info';

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
			icon: <BsTelephone />
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
							<BsInstagram />
							<FaFacebookF />
						</div>
					</div>
				</div>

				<div className={styles.right}>
          <div className = {styles.sections}>
            <Section 
              section= {SHOP.section}
              links = {SHOP.links}
            />
            <Section 
              section= {COMPLIANCE.section}
              links = {COMPLIANCE.links}
            />
            <Section 
              section= {CONTACT.section}
              links = {CONTACT.links}
            />
          </div>
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


			<div className={styles.copyright}>
        <p>© 2022 BILOS BAZAAR. All Rights Reserved.</p>
      </div>
		</div>
	);
};

export default Footer;
