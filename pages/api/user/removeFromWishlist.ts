import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../../utils/client';
import { verify } from '../../../utils/auth';
import { Item, WishlistItem } from '../../../types';
import { json } from 'stream/consumers';

export default async function handler(req: NextApiRequest,result: NextApiResponse){
  const item = req.body
  if(req.method === 'POST'){
    try{
      let id;
      let token;
  
      if(req.headers.authorization){
        token = req.headers.authorization?.split(' ')[1]
        id = verify(token)
      } else {
        result.status(401).json({message: 'not authorized'})
        result.end()
      }
  
      if(id){
        const itemToRemove = [`wishlist[_ref == "${item._id}"]`] 
        client.patch(id).unset(itemToRemove).commit()
          .then((res) => {
            result.status(200).json(res)
            result.end()
          })
      } else{
        result.status(401).json({message: 'not authorized'})
        result.end()
      }
    } catch (error){
      result.status(400).json({message: 'something went wrong', error: error})
      result.end()
    }
  }
}