import type { NextApiRequest, NextApiResponse } from 'next'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { client } from '../../../utils/client'

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body

  if(req.method === "POST"){
    try{
      const existingUser = await client.fetch(`*[_type == "user" && username == "${email}"]`)

      if(!(existingUser.length > 0)) {
   
        res.status(404).json({error: {title: 'Account not found', content: 'We could not find your account on our system, please check your username or sign up.'}})
        res.end()

      } else {
        const isPasswordCorrect: boolean = await bcrypt.compare(password, existingUser[0].password)

        if(!isPasswordCorrect){
          res.status(401).json({error: {title: 'Incorrect Password', content: 'The password you entered is incorrect, please check it and try again.'}})
          res.end()
        } 
        else{
          const token = jwt.sign({email: email, id: existingUser[0]._id}, 'test', { expiresIn: '1h'})

          res.status(200).json({ user: existingUser[0], token })
        }
      }
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong' })
    }
  }
}