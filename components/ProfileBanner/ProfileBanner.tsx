import React from 'react';
import { Button } from '@mui/material';

import styles from './ProfileBanner.module.scss';
import { User } from '../../types';

const ProfileBanner = ({ user }: { user: any }) => {
	console.log(user);
	const { name, surname, city, province } = user;
	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<h1>{`${name} ${surname}`}</h1>
				<p>{`${city}, ${province}`}</p>
			</div>
			<div className={styles.logout}>
				<Button
					sx={{
						backgroundColor: 'white',
						color: 'var(--color-primary)',
						borderRadius: '20px',
            fontSize: '12px',
            padding: '0.5rem 1.5rem'
					}}
				>
					Logout
				</Button>
			</div>
		</div>
	);
};

export default ProfileBanner;
