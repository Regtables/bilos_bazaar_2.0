import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../../utils/client';
import { verify } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, result: NextApiResponse ) {
  const billingInfo = req.body
  console.log(billingInfo)

  if(req.method === 'POST'){
    try{
      let token;
      let id;

      if(req.headers.authorization){
        token = req.headers.authorization?.split(' ')[1]
        id = verify(token)

        if(id){
          const response = await client.patch(id).set({ billingInfo: billingInfo}).commit()

          result.status(200).json(response)
          result.end()
        } else {
          result.status(401).json({ message: 'Unauthorised action'})
          result.end()
        }
      }
      
    } catch (error) {
      console.log(error)
      result.status(400).json({ message: 'something went wrong' })
      result.end()
    }
  }
}