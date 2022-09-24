import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, Button } from '@mui/material';
import { FaLock } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';

import styles from './Auth.module.scss';
import Input from '../../components/Input/Input';
import { signin, signup, selectUser } from '../../redux/auth';

const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

const Auth = () => {
	const dispatch = useDispatch()
	const router = useRouter()
	const user = useSelector(selectUser)
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState(initialState || null);

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e?.target?.name]: e?.target?.value })
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if(isSignup){
			const { payload: { result } }= await dispatch(signup(formData))
			setFormData(initialState)
			router.push(`/user/${result._id}`)
			
		} else {
			dispatch(signin(formData))
			setFormData(initialState)
			// router.push(`/user/${existingUser[0]._id}`)
		}
	}

	const switchMode = () => {
		setIsSignup((prev) => !prev)
	}

	return (
		<div className={styles.auth} style = {{backgroundImage: 'url(/item9.jpeg)'}}>
			<Paper className={styles.container}>
				<div className={styles.heading}>
					<div className = {styles.icon}>
						<FaLock />
					</div>
					<h1>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
				</div>
				<form className={styles.form} onSubmit = {handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									half
									onChange={handleChange}
									autoFocus
									value = {formData.firstName}
									type='text'
								/>
								<Input
									name='lastName'
									label='Last Name'
									half
									value = {formData.lastName}
									onChange={handleChange}
									type='text'
								/>
							</>
						)}
						<Input
							name='email'
							label='Email'
							onChange={handleChange}
							value = {formData.email}
							autoFocus
							type='email'
						/>
						<Input
							name='password' 
							label='Password'
							onChange={handleChange}
							value = {formData.password}
							type='password'
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Confirm Password'
								onChange={handleChange}
								value = {formData.confirmPassword}
								type='password'
							/>
						)}
					</Grid>

            <Button 
							type = 'submit' 
							fullWidth 
							variant = 'contained'
							className = {styles.submit}
						>
								{isSignup ? 'Sign Up': 'Sign In'}
						</Button>
						
						{!isSignup && (
							<GoogleLogin 
								onSuccess={() => {}}
								onFailure={() => {}}
							/> 
						)}
				</form>

				<Button
					onClick = {switchMode}
				>
					{isSignup ? 'Allready have an account? Sign In' : 'Dont have an account? Sign Up'}
				</Button>
			</Paper>
		</div>
	);
};

export default Auth;
