import jwtDecode from "jwt-decode"
import jwt from "jsonwebtoken"

export const verify = (token: string) => {
  if(token.length < 500){
    const decoded: any = jwt.verify(token, 'test')
    const { id } = decoded

    return id
  } else {
    const decoded: any = jwtDecode(token)
    const { sub } = decoded

    return sub
  }
}