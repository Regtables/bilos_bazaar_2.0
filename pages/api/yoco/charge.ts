import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

import { client } from '../../../utils/client'

const SECRET_KEY = 'sk_test_74a9c7223mG058n577f4bd2b4214'

export default async function handler(req: NextApiRequest, result: NextApiResponse ) {
  const { amount, deliveryFee, token, user, items } = req.body

  if(req.method === 'POST'){
    
    //Final stock check

    try{
      axios.post(
        'https://online.yoco.com/v1/charges/',
        {
          token: token,
          amountInCents: amount,
          currency: 'ZAR',
        },
        {
          headers: {
            'X-Auth-Secret-Key': SECRET_KEY,
          },
        },
      ).then(async (res) => {
          const date = new Date()
          const day = date.getDate()
          const month = date.getMonth()
          const now = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${date.getFullYear()}`

          let stock: any = []

          for(let i = 0; i <items.length; i++){
            await client.patch(items[i].variant._id).dec({ itemQuantity: items[i].qty}).commit()
              .then(async (res) => {
                const item = await client.fetch(`*[_type == "variant" && _id == "${items[i].variant._id}"]{_id, color->,itemQuantity, sku, item->{name}}`)
                  .then((res) => {
                    const { color, sku, itemQuantity, item : { name }} = res[0]
                    if(itemQuantity <= 10){

                      const data = {
                        item: name,
                        variant: color.color,
                        count: itemQuantity,
                        sku: sku
                      }
              
                      stock.push(data)
                    }
                  })
              })
          }

          const payment = {
            _type: 'payment',
            _createdAt: date,
            amount: res.data.amountInCents / 100,
            deliveryFee: deliveryFee,
            chargeId: res.data.chargeId,
            date: now,
            items: items,
          };

          if(user?._id?.length > 0){
            const response = await client.patch(user._id).setIfMissing({ payments: [] }).append('payments', [payment]).commit({ autoGenerateArrayKeys: true })

            result.status(200).json({payment: payment, message: "Thank you for your purchace with Bilo's Bazaar", stock: stock})
            result.end()

          } else {
            result.status(200).json({payment: payment, message: "Thank you for your purchace with Bilo's Bazaar", stock: stock})
            result.end()
          }
      })
      
    } catch (error) {
      console.log(error)
      result.status(400).json({ error: 'something went wrong', errorMessage: error })
      result.end()
    }
  }
}