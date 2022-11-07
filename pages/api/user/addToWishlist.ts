import type { NextApiRequest, NextApiResponse } from 'next'

import { client } from '../../../utils/client';
import { verify } from '../../../utils/auth';
import { Item, WishlistItem } from '../../../types';

export default async function handler(req: NextApiRequest, result: NextApiResponse ) {
  const item: Item = req.body

  console.log(item._id)

  if(req.method === 'POST'){
    try{
      let token;
      let id;

      if(req.headers.authorization){
        token = req.headers.authorization?.split(' ')[1]
        id = verify(token)

        if(id){
          result.status(400).json({message:'error'})
          // console.log('still printing')
          // const user = await client.fetch(`*[_type == "user" && _id == "${id}"]`)

          // if(user.length > 0 ){
          //   // console.log(user[0])
  
          //   const itemToAdd = {
          //     _type: 'reference',
          //     _ref: item._ref,
          //   }

          //   const itemToRemove = [`wishlist[_ref == "${item._id}"]`]
  
          //   console.log(itemToAdd)

          //   if(!user[0].wishlist){
          //     const response = await client.patch(id).setIfMissing({ wishlist: []}).append('wishlist', [itemToAdd]).commit({ autoGenerateArrayKeys: true})

          //     console.log(response)

          //     result.status(200).json(response)
          //     result.end()
          //   } else if(user[0].wishlist){
          //     console.log('wishlist')
          //     console.log(user[0].wishlist)
          //     console.log('same item')
          //     const containsItem = user[0].wishlist.filter((wi: any) => wi._ref === itemToAdd._ref)
          //     console.log(containsItem)

          //     if(containsItem.length > 0){
          //       console.log('contains')
          //       await client.patch(id).unset(itemToRemove).commit() 
          //         .then((res) => {
          //           result.status(200).json(res)
          //           result.end()
          //         })
          //     } else {
          //       await client.patch(id).setIfMissing({ wishlist: []}).append('wishlist', [itemToAdd]).commit({ autoGenerateArrayKeys: true})
          //         .then((res) => {
          //           result.status(200).json(res)
          //           result.end()
          //         })
          //     }
          //   }
          // }



          // if(user.length > 0){
          //   if(!user[0].wishlist){
          //     console.log('first wishlist item')
          //     const response = await client.patch(id).setIfMissing({ wishlist: [] }).append('wishlist', [itemToAdd]).commit({ autoGenerateArrayKeys: true })
          //     console.log(response)
    
          //     result.status(200).json(response)
          //     result.end()

          //   } else {
          //     console.log('wishlist exists')
          //     console.log(item._id)
          //     // console.log(user[0].wishlist.filter((wishlistItem: WishlistItem) => wishlistItem._ref === item._id))
          //     console.log(user[0].wishlist.map(item => item._ref))

          //     const wishlist = user[0].wishlist
          //     // console.log(wishlist)

          //     if(wishlist.filter((wishlistItem: WishlistItem) => wishlistItem._ref === item._id)[0]){
          //       console.log('already in wishlist')
          //       const response = await client.patch(id).unset(itemToRemove).commit()
                
          //       result.status(200).json(response)
          //       result.end()
                
          //     } else {
          //       const response = await client.patch(id).setIfMissing({ wishlist: [] }).append('wishlist', [itemToAdd]).commit({ autoGenerateArrayKeys: true })
                
                
          //       result.status(200).json(response)
          //       result.end()
          //     }
          //   }
          //   console.log(user[0].wishlist)
          // }
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