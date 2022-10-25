import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, Button } from '@mui/material';
import { FaLock } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion'

import styles from './Auth.module.scss';
import Input from '../../components/Input/Input';
import { signin, signup, selectUser, isLoadingUser, googleAuth } from '../../redux/auth';
import Loader from '../../components/Loader/Loader';

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
	const isLoading = useSelector(isLoadingUser)
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState(initialState || null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e?.target?.name]: e?.target?.value })
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(isSignup){
			await dispatch(signup(formData))
				.then((res) => {
					const { payload } = res
					const id = payload.user._id
					console.log(id)
		
					if(id){
						setFormData(initialState)
						router.push(`/user/${id}`)
					}
				})
			
		} else {
			await dispatch(signin(formData))
				.then((res) => {
					const { payload } = res
					const id = payload.user._id
	
					if(id){
						setFormData(initialState)
						router.push(`/user/${id}`)
					}
				})
		}
	}

	const onGoogleSucess = async (response) => {
		await dispatch(googleAuth(response))
			.then((res) => {
				const { payload } = res
				const id = payload.user._id

				if(id){
					setFormData(initialState)
					router.push(`/user/${id}`)
				}
			})
	}

	const onGoogleFailure = (response) => {
		window.alert('We could not sign you in!')
	}

	const switchMode = () => {
		setIsSignup((prev) => !prev)
	}

	return (
		<div className={styles.auth} style = {{backgroundImage: 'url(/item9.jpeg)'}}>
			<motion.div 
				className={styles.container} 
				style = {isLoading ? {cursor: 'progress'} : {cursor: 'auto'}}
				whileInView = {{y: [50, 0], opacity: [0, 1]}}
				initial = {{y: 50, opacity: 0}}
			>
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
									required = {true}
								/>
								<Input
									name='lastName'
									label='Last Name'
									half
									value = {formData.lastName}
									onChange={handleChange}
									type='text'
									required = {true}
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
							required = {true}
						/>
						<Input
							name='password' 
							label='Password'
							onChange={handleChange}
							value = {formData.password}
							type='password'
							required = {true}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Confirm Password'
								onChange={handleChange}
								value = {formData.confirmPassword}
								type='password'
								required = {true}
							/>
						)}
					</Grid>

            <Button 
							type = 'submit' 
							fullWidth 
							variant = 'contained'
							className = {styles.submit}
							sx = {{
								borderRadius: '20px',
								backgroundColor: 'var(--color-primary)',
								margin: '1rem 0',
								padding: '0.5rem 0',
								fontFamily: 'var(--font-family)',

								"&:hover": {
									color: 'var(--color-primary',
									backgroundColor: 'white'
								}
							}}
						>
								{isSignup ? 'Sign Up': 'Sign In'}
						</Button>
						
						{!isSignup && (
							<GoogleLogin 
								onSuccess={onGoogleSucess}
								onFailure={onGoogleFailure}
							/> 
						)}
				</form>

				<Button
					onClick = {switchMode}
				>
					{isSignup ? 'Allready have an account? Sign In' : 'Dont have an account? Sign Up'}
				</Button>
			</motion.div>
			{isLoading && (
				<Loader isLoading = {isLoading} />
			)}
		</div>
	);
};

export default Auth;
