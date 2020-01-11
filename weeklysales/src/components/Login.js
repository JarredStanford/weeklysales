import React from 'react'
import useForm from "./utils/useForm";
import { TextInput } from 'evergreen-ui';
import styled from 'styled-components'

const Login = () => {

    //Imports form custom hook to handle state, form entry and form submission.
    const { values, handleChange, handleSubmit, setError, setLoading, SubmitButton, ErrorMessage } = useForm(log);

    function log() {
        console.log(values)
    }

    return (
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
    )
}

export default Login

const Form = styled.form`
display: flex;
flex-direction: column
width: 280px`