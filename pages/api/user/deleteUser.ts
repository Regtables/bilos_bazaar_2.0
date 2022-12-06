import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../../utils/client';
import { verify } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, result: NextApiResponse ) {
  // const id = req.body
  // console.log(id)

  if(req.method === 'POST'){
    try{
      let token;
      let id;

      if(req.headers.authorization){
        token = req.headers.authorization?.split(' ')[1]
        id = verify(token)

        if(id){
          const response = await client.delete({query: `*[_type == "user" && _id =="${id}"]`})
          result.status(200).json({title: 'Account deleted', content: 'Your account was successfully deleted. Go well!'})
          result.end()
          
        }
      }
      
    } catch (error) {
      console.log(error)
      result.status(400).json({ error: 'We could not delete your account' })
      result.end()
    }
  }
}