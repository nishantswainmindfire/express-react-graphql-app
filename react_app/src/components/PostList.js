import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import { useQuery, gql } from '@apollo/client'
import { LOAD_POSTS } from '../GraphQL/Queries/PostQueries'
function PostList() {
    const { loading, error, data, extensions ,refetch,} = useQuery(LOAD_POSTS)
    const res = useQuery(LOAD_POSTS)
    // console.log("**",res)
    const p = useQuery(LOAD_POSTS)
    const [posts, setPosts] = useState([])
    const [host, setHost] = useState([])
    // console.log("&&&&&&&&",p,refetch.toString())
    useEffect(() => {
        if (data) {
            setPosts(data.getAllPosts)
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
            return "Loading Posts..."
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