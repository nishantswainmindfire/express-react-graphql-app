import { gql } from '@apollo/client'

export const SIGN_IN_USER = gql`
    mutation signInUser(
    $userName:String!
    $password:String
    ){
        signInUser(
        userName:$userName
        password:$password
        ){
        token
  
    }
}
`