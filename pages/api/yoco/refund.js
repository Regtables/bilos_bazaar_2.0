import axios from "axios"

const SECRET_KEY = 'sk_test_8cedaf061eGaVqb06f24ab790cf8;'

export default async function handler(req, response){
  const { chargeId } = req.body

  try{
    axios.post('https://online.yoco.com/v1/refunds/',
    {
      chargeId: chargeId
    },
    {
      headers: {
        'X-Auth-Secret-Key': SECRET_KEY,
      }
    }).then((res) => {
      console.log(res)
    })
  } catch (error) {
    console.log(error)
  }
}