import { gql } from '@apollo/client'

export const CREATE_NEW_POST = gql`
    mutation createNewPost(
    $title:String!
    $description:String
    $rating:Int){
        createNewPost(
        title:$title
        description:$description
        rating:$rating){
        id
        title
        description
    }
}
`