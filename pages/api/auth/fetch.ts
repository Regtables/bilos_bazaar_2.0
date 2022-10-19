import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, result: NextApiResponse ) {
  const id = req.body

  if(req.method === 'POST'){
    try{
      await client.fetch(`*[_type == "user" && _id == "${id}"]`)
      .then((res) => {
        if(res[0]._id){
          result.status(200).json(res[0])
        }
      })
      
    } catch (error) {
      console.log(error)
      result.status(400).json({ message: 'something went wrong' })
      result.end()
    }
  }
}