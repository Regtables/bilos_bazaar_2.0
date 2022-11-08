import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { client } from '../../../utils/client';
import { SanityDocument } from '@sanity/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { firstName, lastName, password, confirmPassword, email } = req.body;

	if (req.method === 'POST') {
		try {
			const existingUser = await client.fetch(
				`*[_type == "user" && username == "${email}"]`
			);

			if (existingUser.length > 0) {
				res.status(400).json({ error: {title: 'User already exists', content: 'The email address is already in use with an existing account. Please login with that account or use a different email address'} });
				res.end();
			} else if (password !== confirmPassword) {
				res.status(400).json({
					error: {
						title: 'Passwords do not match',
						content: 'The passwords you entered do not match. Please check them and confirm that they are the same and then try again'
					}
				});
				res.end();

			} else {
				const hashedPassword = await bcrypt.hash(password, 12);

				const newUser = {
					_type: 'user',
					username: email,
					password: hashedPassword,
					billingInfo: {
						name: firstName,
						surname: lastName,
						email: email,
					},
				};

				const result: SanityDocument = await client.create(newUser);

				const token = jwt.sign(
					{ email: email, id: result._id },
					'test',
					{ expiresIn: '1h' }
				);

				res.status(201).json({ user: result, token: token });
				res.end();
			}
      
		} catch (error) {
			res.status(500).json({ error: { title: 'Something went wrong', content: 'Something went wrong while we were trying to create your account. Please try again'} });
			res.end();
		}
	}
	// res.status(200).json({ name: 'signing in' })
}
