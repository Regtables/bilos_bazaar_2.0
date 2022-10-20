import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, result: NextApiResponse ) {
  console.log('test')
  const { billingInfo, user } = req.body
  console.log(req.body)
  if(req.method === 'POST'){
    try{
     await client.patch(user.user._id).set({ billingInfo: billingInfo}).commit()
      .then((res) => {
        console.log(res)
      })
      
    } catch (error) {
      console.log(error)
      result.status(400).json({ message: 'something went wrong' })
      result.end()
    }
  }
}