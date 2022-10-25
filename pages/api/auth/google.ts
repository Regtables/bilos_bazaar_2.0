import type { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, response: NextApiResponse){
  const { credential } = req.body
  if(req.method === 'POST'){
    try{
      const decoded: any = jwt_decode(credential)

      const { email, sub, given_name, family_name } = decoded

      const existingUser = await client.fetch(`*[_type == "user" && username == "${email}"]`)

      if(existingUser.length > 0){
        response.status(200).json({ user: existingUser[0], token: credential })
        response.end()

      } else {
        const newUser = {
          _type: 'user',
          _id: sub,
          username: email,
          billingInfo: {
            name: given_name,
            surname: family_name,
            email: email
          }
        }

        const result = await client.create(newUser)
        response.status(201).json({ user: result, token: credential })
        response.end()
      }
    } catch (error) {
      console.log(error)
      response.status(401).json({ message: 'We could not authorise your account'})
      response.end()
    } 
  }
}