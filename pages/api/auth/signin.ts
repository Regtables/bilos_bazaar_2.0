import type { NextApiRequest, NextApiResponse } from 'next'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { client } from '../../../utils/client'

// type Data = {
//   name: string,
//   message: string
// }

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  console.log(req.body)

  if(req.method === "POST"){
    try{
      const existingUser = await client.fetch(`*[_type == "user" && username == "${email}"]`)

      if(!(existingUser.length > 0)) {
   
        res.status(404).json({ message: 'Your account was not found in our system' })
        res.end()
        // return Promise.reject()
      } else {
        const isPasswordCorrect: boolean = await bcrypt.compare(password, existingUser[0].password)

        if(!isPasswordCorrect){
          res.status(401).json({ message: 'Invalid password'})
          res.end()
        } 
        else{
          const token = jwt.sign({email: email, id: existingUser._id}, 'test', { expiresIn: '1h'})

          res.status(200).json({ user: existingUser, token })
        }
      }
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' })
    }
  }
}