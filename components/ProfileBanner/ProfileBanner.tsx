import React from 'react';
import { Button } from '@mui/material';

import styles from './ProfileBanner.module.scss';
import { User } from '../../types';

const ProfileBanner = ({ user, handleLogout }: { user: User, handleLogout: any }) => {
	
	if(user === undefined){
		return <p>loading</p>
	}
	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<h1>{`${user?.billingInfo?.name} ${user?.billingInfo?.surname}`}</h1>
				<p>{(user?.billingInfo?.city && user?.billingInfo?.province) ? `${user?.billingInfo?.city}, ${user?.billingInfo?.province}` : 'please fill in your billing information'}</p>
			</div>
			<div className={styles.logout}>
				<Button
					sx={{
						backgroundColor: 'white',
						color: 'var(--color-primary)',
						borderRadius: '20px',
            fontSize: '12px',
            padding: '0.5rem 1.5rem',

						"&:hover": {
							backgroundColor: 'red',
							color: 'white'
						}
					}}
					onClick = {handleLogout}
				>
					Logout
				</Button>
			</div>
		</div>
	);
};

export default ProfileBanner;
