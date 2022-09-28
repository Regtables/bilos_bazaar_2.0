import React from 'react';
import { TextField, Grid } from '@mui/material';

const Input = ({
	name,
	type,
	half,
	autoFocus,
	label,
	onChange,
	handleShowPassword,
	value,
	size
}: {
	name: string;
	type: string;
	half: boolean;
	autoFocus: boolean;
	label: string;
	onChange: any;
	handleShowPassword: any;
	value: string;
	size: string
}) => {
	return (
		<Grid item xs={12} sm={half ? 6 : 12}>
			<TextField
				name={name}
				label={label}
				autoFocus={autoFocus}
				type={type}
				onChange={onChange}
				variant='outlined'
				fullWidth
				value={value}
				required
				size= {size}
			/>
		</Grid>
	);
};

export default Input;
