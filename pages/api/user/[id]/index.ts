import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from "../../../../utils/client";

export default async function handler(req: NextApiRequest, result: NextApiResponse ) {
  // console.log(req.body)
  const { id } = req.query
  console.log(id)
  if(req.method === 'GET'){
    try{
      await client.fetch(`*[_type == "user" && _id == "${id}"]`)
      .then((res) => {
        if(res[0]._id){
          result.status(200).json(res[0])
        } else {
          result.status(200).json({ message: 'whaaaat is going on' })
        }
      })

      // if(user){
      //   res.status(200).json(user)
      //   // res.end()
      // }
    } catch (error) {
      console.log(error)
      result.status(400).json({ message: 'something went wrong' })
      result.end()
    }
  }
}