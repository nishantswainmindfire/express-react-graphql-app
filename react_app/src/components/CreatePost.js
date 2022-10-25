import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_POST } from '../GraphQL/Mutations/PostMutations';
function CreatePost() {
    const [createPost, { error }] = useMutation(CREATE_NEW_POST)



    const [creatPostState, setCreatePostState] = useState({
        title: "", description: ""
    })

    const addPost = () => {
        const { title, description } = creatPostState
        if (title.length > 0 && description.length > 0)
            createPost({
                variables: {
                    title: title,
                    description: description,
                    rating: 4
                }
            })
            else{
                window.alert("Title and Description cannot be Empty!!")
            }
    }
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