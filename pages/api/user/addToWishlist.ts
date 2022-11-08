import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '../../../utils/client';
import { verify } from '../../../utils/auth';
import { Item, WishlistItem } from '../../../types';

export default async function handler(
	req: NextApiRequest,
	result: NextApiResponse
) {
	const item: Item = req.body;

	console.log(item._id);

	if (req.method === 'POST') {
		try {
			let token;
			let id;

			if (req.headers.authorization) {
				token = req.headers.authorization?.split(' ')[1];
				id = verify(token);

				if (id) {
					const user = await client.fetch(
						`*[_type == "user" && _id == "${id}"]`
					);

					if (user.length > 0) {
						const itemToAdd = {
							_type: 'reference',
							_ref: item._id,
						};

						if (!user[0].wishlist) {
							const response = await client
								.patch(id)
								.setIfMissing({ wishlist: [] })
								.append('wishlist', [itemToAdd])
								.commit({ autoGenerateArrayKeys: true });
                
							result.status(200).json(response);
							result.end();
						} else if (user[0].wishlist) {
							await client
								.patch(id)
								.setIfMissing({ wishlist: [] })
								.append('wishlist', [itemToAdd])
								.commit({ autoGenerateArrayKeys: true })
								.then((res) => {
									result.status(200).json(res);
									result.end();
								});
						}
					}
				}
			} else {
				result.status(401).json({ message: 'Unauthorised action' });
				result.end();
			}
		} catch (error) {
			console.log(error);
			result.status(400).json({ message: 'something went wrong' });
			result.end();
		}
	}
}
