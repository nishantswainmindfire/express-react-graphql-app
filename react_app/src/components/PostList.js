import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import { useQuery, gql } from '@apollo/client'
import { LOAD_POSTS } from '../GraphQL/Queries/PostQueries'
function PostList() {
    const { loading, error, data, extensions } = useQuery(LOAD_POSTS)
    // console.log(data)
    const [posts, setPosts] = useState([])
    const [host, setHost] = useState([])
    useEffect(() => {
        if (data) {
            setPosts(data.getAllPosts)

            // setHost(extensions.host)
        }
        if (extensions) {
            console.log("dd", extensions)
        }
    }, [loading])

    function renderPosts() {
        if (posts.length > 0)
            return posts.map((post) => {

                return <div className='post-item' key={post.id}><PostItem  {...post} /></div>
            })
        else
            return "null"
    }
    return (
        <>     
            <div  className="post-list">

                {renderPosts()}

            </div>
        </>
    )
}

export default PostList