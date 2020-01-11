import React, { useContext } from 'react'
import useForm from "./utils/useForm";
import { TextInput } from 'evergreen-ui';
import styled from 'styled-components'
import firebase from './firebase'
import { AuthContext } from './utils/Auth';
import { withRouter, Redirect } from 'react-router-dom';


const Login = ({ history }) => {

    //Imports form custom hook to handle state, form entry and form submission.
    const { values, handleChange, handleSubmit, setError, setLoading, SubmitButton, ErrorMessage } = useForm(login);

    async function login() {
        try {
            const signIn = await firebase.auth().signInWithEmailAndPassword(values.username, values.password)
            history.push('/')
        }
        catch { }
    }

    const { currentUser } = useContext(AuthContext)

    if (currentUser) return <Redirect to='/' />

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <TextInput
                    placeholder='Username'
                    onChange={handleChange}
                    value={values.username || ''}
                    aria-label='username'
                    name='username'
                    type='text' />
                <TextInput
                    placeholder='Password'
                    onChange={handleChange}
                    value={values.password || ''}
                    aria-label='password'
                    name='password'
                    type='password' />
                <ErrorMessage />
                <SubmitButton />
            </Form>
        </div>
    )
}

export default withRouter(Login)

const Form = styled.form`
display: flex;
flex-direction: column
width: 280px`