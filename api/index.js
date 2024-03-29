export const signin = async (formData) => {
	const response = await fetch('/api/auth/signin', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response;
};

export const signup = async (formData) => {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	return data;
};

export const googleAuth = async (data) => {
	const response = await fetch('/api/auth/google', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const user = await response.json();

	return user;
};

export const fetchUser = async (id) => {
	const response = await fetch(`/api/auth/fetch`, {
		method: 'POST',
		body: JSON.stringify(id),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	return data;
};

export const saveBillingInfo = async (data) => {
	if (localStorage.getItem('biloToken')) {
		const token = JSON.parse(localStorage.getItem('biloToken'));

		console.log('saving')
		const response = await fetch('/api/user/saveBillingInfo', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const billingInfo = await response.json();

		return billingInfo;
	}
};

export const deleteUser = async () => {
	if(localStorage.getItem('biloToken')){
		const token = JSON.parse(localStorage.getItem('biloToken'));

		const response = await fetch('/api/user/deleteUser', {
			method: 'POST',
			// body: JSON.stringify(id),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			}
		})

		const data = await response.json()
		console.log(data)
		return data
	}
}

export const addToWishlist = async (item) => {
	console.log(item);
	if (localStorage.getItem('biloToken')) {
		const token = JSON.parse(localStorage.getItem('biloToken'));

		const response = await fetch('/api/user/addToWishlist', {
			method: 'POST',
			body: JSON.stringify(item),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();

		return data;
	}
};

export const removeFromWishlist = async (item) => {
	console.log(item);
	if (localStorage.getItem('biloToken')) {
		const token = JSON.parse(localStorage.getItem('biloToken'));

		const response = await fetch('/api/user/removeFromWishlist', {
			method: 'POST',
			body: JSON.stringify(item),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();

		return data;
	}
};

export const yocoCharge = async (amount, deliveryFee, token, user = null, items) => {
	const response = await fetch('/api/yoco/charge', {
		method: 'POST',
		body: JSON.stringify({ amount, deliveryFee, token, user, items }),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	const data = await response.json()

	return data
};

export const yocoRefund = async (chargeId, date) => {
	const response = await fetch('/api/yoco/refund', {
		method: 'POST',
		body: JSON.stringify({ chargeId, date }),
		headers: {
			'Content-Type': 'application/json'
		}
	})

	console.log(response)
}

