import { useMutation } from '@apollo/client';
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { SIGN_IN_USER } from '../GraphQL/Mutations/UserMutations';

function LoginForm({setIsLoggedIn}) {
    const [signInData, setSignInData] = useState({ userName: "nswain", password: "123456" });

    const [signInUser, { error }] = useMutation(SIGN_IN_USER)


    const handleSignIn = async () => {
        const { userName, password } = signInData
        if (userName.length > 0 && password.length > 0) {
            let res = await signInUser({
                variables: {
                    userName,
                    password
                }
            })
            console.log(res)
            localStorage.setItem("mlt-token", res.data.signInUser.token)
            setIsLoggedIn(true)
        }

        else {
            window.alert("Username and password cannot be empty!!")
        }
    }
    return (

        <div className='login-form'>
            <TextField
                label="Enter Username"
                value={signInData.userName}
                // id="outlined-basic"
                // multiline label="description"
                variant="outlined"
                // value={creatPostState.description}
                onChange={({ target: { value } }) => {
                    setSignInData({ ...signInData, userName: value })
                }}
            />

            <TextField
                label="Enter password"
                type="password"
                value={signInData.password}
                // id="outlined-basic"
                // multiline label="description"
                variant="outlined"
                // value={creatPostState.description}
                onChange={({ target: { value } }) => {
                    setSignInData({ ...signInData, password: value })
                }}
            />
            <Button variant="contained" color="success"
                onClick={handleSignIn}
            >
                Sign In
            </Button>
        </div>

    )
}

export default LoginForm