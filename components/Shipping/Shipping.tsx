import React, { useEffect, useState } from 'react';
import {
	Grid,
	Select,
	MenuItem,
	Button,
	Card,
	Switch,
	FormControl,
	InputLabel,
} from '@mui/material';
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdLocalShipping } from 'react-icons/md';
import { GoLocation } from 'react-icons/go';

import styles from './Shipping.module.scss';
import Input from '../Input/Input';
import { useDispatch } from 'react-redux';
import { setToggleAlert } from '../../redux/altert';

const INITIAL_STATE = {
	city: '',
	province: '',
	street: '',
	apt: '',
	zip: '',
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

const Shipping = ({
	confirmedDestination,
	setConfirmedDestination,
	useDifferentAddress,
	setUseDifferentAddress,
	setDifferentProvince,
  differentProvince,
  billingProvince,
  setDifferentAddress,
	differentAddress,
	billingAddress,
}: {
	confirmedDestination: boolean;
	setConfirmedDestination: any;
	useDifferentAddress: boolean;
	setUseDifferentAddress: any;
	setDifferentProvince: any;
  billingProvince: any;
	billingAddress: string;
	differentAddress: string;
  setDifferentAddress: any,
	differentProvince: any;
}) => {
	const [differentDestination, setDifferentDestination] = useState({
		province: '',
		fee: 0,
	});
	const [newBilling, setNewBilling] = useState(INITIAL_STATE);
  const dispatch = useDispatch()

	const handleToggle = () => {
		setUseDifferentAddress((prev: any) => !prev);
		setConfirmedDestination(false);
	};

	const handleChange = (e: any) => {
		setNewBilling({ ...newBilling, [e.target.name]: e.target.value });
	};

	const renderDestination = () => {
    if(useDifferentAddress && differentProvince?.province?.length === 0){
      return (
        <p>Please save your new shipping address</p>
      )
     
    } else if(useDifferentAddress && differentProvince?.province?.length > 0){
      return (
        <>
          <div className= {styles.province}>
            <p>{differentProvince?.province}</p>
          </div>
          <div className = {styles.amount}>
            <p>R {differentProvince?.fee}</p>
          </div>
        </>
      )
    } else if(!useDifferentAddress && billingProvince?.province?.length > 0){
      return (
        <>
          <div className= {styles.province}>
            <p>{billingProvince.province}</p>
          </div>
          <div className = {styles.amount}>
            <p>R {billingProvince.fee}</p>
          </div>
        </>
      )
    } else{
      return (
        <p>Please save your billing information</p>
      )
    }
	};

	const saveNewBilling = () => {
		const address = `${newBilling.apt ? newBilling.apt : ''} ${
			newBilling.street
		}, ${newBilling.city}, ${newBilling.province}, ${newBilling.zip}`;
		setDifferentAddress(address);

		const destination = PROVINCES.filter(
			(province) => province.province === newBilling.province
		)[0];
		// setDifferentDestination(destination)
		setDifferentProvince(destination);

		console.log(differentDestination);
	};

	const handleConfirm = () => {
    if(billingProvince.province.length === 0 || (useDifferentAddress && differentProvince.province.length === 0)) {
      dispatch(setToggleAlert({
        toggle: true,
        title: 'Please confirm your shipping address',
        content: 'Please make sure that your billing informaton is saved or if you are using a different address that that is saved',
        option: 'okay'
      }))
    } else {
		  setConfirmedDestination(true)
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<h3 className='checkout__heading'>
					<MdLocalShipping />
					Shipping
				</h3>
			</div>

			<div className={styles.content}>
				<div className={styles.activeAdress}>
					<p className={styles.to}>Delivering to:</p>
					<p className={styles.address}>
						<GoLocation />
						{useDifferentAddress ? differentAddress : billingAddress}
					</p>
				</div>

				<Card className={styles.fee} elevation={5}>
          {renderDestination()}
				</Card>

				<div className={styles.viewFees}>
					<p>view delivery fees</p>
				</div>

				<div className={styles.differentAddress}>
					<Switch onChange={handleToggle} />
					<p>Deliver to a different address?</p>
				</div>
				{useDifferentAddress && (
					<form>
						<Grid container spacing={2}>
							<Input
								name='city'
								label='City'
								type='text'
								half={true}
								autoFocus={false}
								onChange={handleChange}
								value={newBilling?.city}
								required={true}
								handleShowPassword={false}
							/>
							<Grid item sm={6}>
								<FormControl fullWidth>
									<InputLabel id='province'>
										Province
									</InputLabel>
									<Select
										label='Province'
										fullWidth={true}
										onChange={handleChange}
										name='province'
										value={newBilling?.province}
										// labelId = 'province'
										sx={{
											width: '100%',
											minWidth: '100%',
										}}
									>
										{PROVINCES.map((province, i) => (
											<MenuItem
												key={i}
												value={province.province}
											>
												{province.province}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Input
								name='street'
								label='Street Address'
								type='text'
								half={true}
								autoFocus={false}
								onChange={handleChange}
								value={newBilling?.street}
								handleShowPassword={false}
								required={true}
							/>
							<Grid
								item
								sm={6}
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<Grid container spacing={2}>
									<Grid item sm={6}>
										<Input
											name='apt'
											label='Apartment Number'
											type='text'
											half={false}
											required={false}
											autoFocus={false}
											onChange={handleChange}
											value={newBilling?.apt}
											handleShowPassword={false}
										/>
									</Grid>
									<Grid item sm={6}>
										<Input
											name='zip'
											label='zip code'
											type='text'
											half={false}
											autoFocus={false}
											required={true}
											onChange={handleChange}
											value={newBilling?.zip}
											handleShowPassword={false}
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item sm={12}>
								<Button
									variant='contained'
									onClick={saveNewBilling}
								>
									Save
								</Button>
							</Grid>
						</Grid>
					</form>
				)}

				<div className={styles.confirm}>
					<Button
						variant='contained'
            type = 'submit'
						sx={{
							borderRadius: '20px',
              padding: '0.4rem 3rem',
							backgroundColor: 'var(--color-primary)',
              fontSize: '14px'
						}}
						onClick={handleConfirm}
						// disabled = {activeAddress ? false : true}
					>
						{confirmedDestination ? <p style = {{margin: 0}}>
              <AiFillCheckCircle />confirmed</p> : <p style = {{margin: 0}}>confirm</p>}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Shipping;
