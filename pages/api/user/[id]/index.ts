import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from "../../../../utils/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
  // console.log(req.body)
  const { id } = req.query
  // console.log(id)
  if(req.method === 'GET'){
    try{
      const user = await client.fetch(`*[_type == "user" && _id == "${id}"]`)

      if(user){
        res.status(200).json(user)
        // res.end()
      }
    } catch (error) {
      console.log(error)
      res.status(404).json({ message: 'something went wrong' })
      res.end()
    }
  }
}