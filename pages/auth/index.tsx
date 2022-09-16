import React, { useState } from 'react';
import { Paper, Grid, Button } from '@mui/material';
import { FaLock } from 'react-icons/fa';

import styles from '../../styles/Auth.module.scss';
import Input from '../../components/Input/Input';

const Auth = () => {
	const [isSignup, setIsSignup] = useState(true);

	const handleChange = () => {};

	return (
		<div className={styles.auth}>
			<Paper className={styles.container}>
				<div className={styles.heading}>
					<FaLock />
					<h1>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
				</div>
				<div className={styles.form}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									half
									onChange={handleChange}
									autoFocus
									type='text'
								/>
								<Input
									name='lastName'
									label='Last Name'
									half
									onChange={handleChange}
									autoFocus
									type='text'
								/>
							</>
						)}
						<Input
							name='email'
							label='Email'
							onChange={handleChange}
							autoFocus
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							onChange={handleChange}
							autoFocus
							type='password'
						/>
						<Input
							name='confirmPassword'
							label='Confirm Password'
							onChange={handleChange}
							autoFocus
							type='password'
						/>
					</Grid>

            <Button type = 'submit' fullWidth variant = 'contained'>{isSignup ? 'Sign Up': 'Sign In'}</Button>
				</div>
			</Paper>
		</div>
	);
};

export default Auth;
