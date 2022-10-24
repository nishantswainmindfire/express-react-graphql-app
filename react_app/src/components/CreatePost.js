import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_POST } from '../GraphQL/Mutations/PostMutations';
function CreatePost() {
    const [createPost, { error }] = useMutation(CREATE_NEW_POST)

    const addPost = () => {
        createPost({
            variables: {
                title: creatPostState.title,
                description: creatPostState.description,
                rating: 4
            }
        })
    }

    const [creatPostState, setCreatePostState] = useState({
        title: "", description: ""
    })

    return (

        <div className='create-post'>

            <h2>Create a new Post</h2>
            {/* <div> */}
            <TextField
                id="outlined-basic"
                label="title"
                variant="outlined"
                value={creatPostState.title}
                onChange={({ target: { value } }) => { setCreatePostState({ ...creatPostState, title: value }) }} />

            <TextField
                id="outlined-basic"
                multiline label="description"
                variant="outlined"
                value={creatPostState.description}
                onChange={({ target: { value } }) => { setCreatePostState({ ...creatPostState, description: value }) }}
            />

            <Button variant="contained" color="success" onClick={addPost}>
                Create Post
            </Button>
        </div>

    );

}

export default CreatePost