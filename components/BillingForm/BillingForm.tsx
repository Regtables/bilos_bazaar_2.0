import React, { useState, useEffect } from 'react';
import type { AppDispatch } from '../../redux/store';
import {
	Grid,
	MenuItem,
	Select,
	InputLabel,
	Button,
	FormControl,
} from '@mui/material';
import { AiFillInfoCircle, AiFillCheckCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';

import styles from './BillingForm.module.scss';
import {
	selectUser,
	setUserBillingInfo,
	saveBillingInfo,
} from '../../redux/auth';

import Input from '../Input/Input';
import { BillingInfo } from '../../types';

const INITIAL_STATE = {
	name: '',
	surname: '',
	email: '',
	phoneNumber: '',
	city: '',
	province: '',
	streetAddress: '',
	apt: '',
	zip: '',
	address: '',
};

const PROVINCES = [
	{
		province: 'Western Cape',
		fee: 400,
	},
	{
		province: 'Northen Cape',
		fee: 300,
	},
	{
		province: 'Eastern Cape',
		fee: 0,
	},
	{
		province: 'Free State',
		fee: 200,
	},
	{
		province: 'Kwazulu-Natal',
		fee: 100,
	},
	{
		province: 'Gauteng',
		fee: 300,
	},
	{
		province: 'Limpopo',
		fee: 500,
	},
	{
		province: 'Mpumalanga',
		fee: 600,
	},
	{
		province: 'North West',
		fee: 100,
	},
];

const BillingForm = ({
	checkout,
	userData,
	billingInformation,
	setBillingInformation,
	setDestinationProvince,
	setBillingProvince,
	setBillingAddress,
  setConfirmedDestination,
}: {
	checkout: boolean;
	userData: any;
	billingInformation: BillingInfo;
	setBillingInformation: any;
	setDestinationProvince: any;
	setBillingProvince: any;
	setBillingAddress: any;
  setConfirmedDestination: any
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [billingInfo, setBillingInfo] = useState<any>(
		billingInformation || INITIAL_STATE
	);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setBillingInfo(billingInformation);

		if (setDestinationProvince) {
			setDestinationProvince(
				PROVINCES.filter(
					(province: any) =>
						province.province === billingInfo.province
				)[0]
			);
		}
	}, [billingInformation]);

	useEffect(() => {
		if (billingInfo !== billingInformation) {
			setSaved(false);
      setConfirmedDestination(false)
		}
	}, [billingInfo]);

	const handleChange = (e: any) => {
		setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
	};

	const handleSave = (e: any) => {
		e.preventDefault();

		const {
			apt,
			streetAddress,
			city,
			province,
			zip,
			name,
			surname,
			email,
			phoneNumber,
		} = billingInfo;

		const data = {
			name,
			surname,
			email,
			phoneNumber,
			city,
			province,
			streetAddress,
			apt: apt ? apt : '',
			zip,
			address: `${
				apt ? apt + ' ' : ' '
			}${streetAddress}, ${city}. ${province}, ${zip}`,
		};

		setBillingProvince(
			PROVINCES.filter(
				(province: any) => province.province === billingInfo.province
			)[0]
		);

		setBillingAddress(
			`${
				apt ? apt + ' ' : ''
			}${streetAddress}, ${city}. ${province}, ${zip}`
		);

		dispatch(setUserBillingInfo(data));
		setBillingInformation(data);
		
		if (userData._id.length > 0) {
      console.log('saving')
			dispatch(saveBillingInfo(data));
		}

		setSaved(true);
	};

	return (
		<div className={styles.container}>
			<div
				className={styles.heading}
				style={
					checkout
						? {
								backgroundColor: 'rgb(228, 229, 230)',
								padding: '0.5rem 1rem',
						  }
						: { backgroundColor: 'white', padding: '0rem' }
				}
			>
				<h3 className='checkout__heading'>
					<AiFillInfoCircle /> Billing Information
				</h3>
			</div>
			<form
				className={styles.form}
				style={checkout ? { padding: '1rem' } : { padding: '0rem' }}
				onSubmit={handleSave}
			>
				<Grid container spacing={2}>
					<Input
						name='name'
						label='Name'
						half={true}
						type='text'
						autoFocus={false}
						onChange={handleChange}
						value={billingInfo?.name}
						handleShowPassword={false}
						required={true}
					/>

					<Input
						name='surname'
						label='Surname'
						half={true}
						type='text'
						autoFocus={false}
						onChange={handleChange}
						value={billingInfo?.surname}
						handleShowPassword={false}
						required={true}
					/>

					<Input
						name='phoneNumber'
						type='text'
						label='Phone Number'
						half={true}
						autoFocus={false}
						onChange={handleChange}
						value={billingInfo?.phoneNumber}
						handleShowPassword={false}
						required={true}
					/>

					<Input
						name='email'
						label='Email'
						type='email'
						half={true}
						autoFocus={false}
						onChange={handleChange}
						value={billingInfo?.email}
						handleShowPassword={false}
						required={true}
					/>

					<Input
						name='city'
						label='City'
						type='text'
						autoFocus={false}
						half={true}
						onChange={handleChange}
						value={billingInfo?.city}
						handleShowPassword={false}
						required={true}
					/>

					<Grid item sm={6} xs = {12}>
						<FormControl fullWidth>
							<InputLabel id='province'>Province</InputLabel>
							<Select
								label='Province'
								fullWidth={true}
								name='province'
								required
								onChange={handleChange}
								value={billingInfo?.province}
								sx={{
									width: '100%',
									minWidth: '100%',
								}}
							>
								{PROVINCES.map((province, i) => (
									<MenuItem
										key={i}
										value={province.province}
										selected={
											billingInfo?.province ===
											province.province
										}
									>
										{province.province}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Input
						name='streetAddress'
						label='Street Address'
						type='text'
						half={true}
						autoFocus={false}
						onChange={handleChange}
						value={billingInfo?.streetAddress}
						handleShowPassword={false}
						required={true}
					/>
					<Grid item sm={6}>
						<Grid container spacing={2}>
							<Grid item sm={6} xs = {6}>
								<Input
									name='apt'
									label='Apartment Number'
									type='text'
									half={false}
									required={false}
									autoFocus={false}
									onChange={handleChange}
									value={billingInfo?.apt}
									handleShowPassword={false}
								/>
							</Grid>
							<Grid item sm={6} xs = {6}>
								<Input
									name='zip'
									label='zip code'
									type='text'
									half={false}
									autoFocus={false}
									required={true}
									onChange={handleChange}
									value={billingInfo?.zip}
									handleShowPassword={false}
								/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs = {12}>
						<div className={styles.save}>
							<Button
								variant='contained'
								type='submit'
								sx={{
									borderRadius: '20px',
									backgroundColor: 'var(--color-primary)',
									width: '150px',
									fontSize: '14px',
									// fontFamily: 'var(--font-family)',
									fontWeight: '500',
								}}
							>
								{saved ? <p style = {{margin: 0}}><AiFillCheckCircle />saved</p> : <p style = {{margin: 0}}>save</p>}
							</Button>
						</div>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

export default BillingForm;
