import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { client } from '../../../utils/client'
import { SanityDocument } from '@sanity/client'

type Data = {
  name: string,
  message: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  const { firstName, lastName, password, confirmPassword, email } = req.body

  if(req.method === "POST"){
    try{
      const existingUser = await client.fetch(`*[_type == "user" && username == "${email}"]`)

      if(existingUser.length > 0) {
        res.status(400).json({ message: 'User already exists' })
        res.end()

      } else if(password !== confirmPassword){
        res.status(400).json({ message: 'Your passwords do not match' })
        res.end()

      } else {
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = {
          _type: 'user',
          username: email,
          password: hashedPassword,
          billingInfo: {
            name: firstName,
            surname: lastName,
            email: email
          }
        }
          
        const result: SanityDocument = await client.create(newUser)
        const token = jwt.sign({ email: email, id:result._id }, 'test', { expiresIn: '1h'})
       
        res.status(201).json({ result, token })
        res.end()
      }
      
    } catch (error) {
      res.status(500).json({ error })
      res.end()
    }
  }
  // res.status(200).json({ name: 'signing in' })
}