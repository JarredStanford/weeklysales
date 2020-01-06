import React from 'react'

import useForm from "./utils/useForm";
import { Pane, TextInput, Button } from 'evergreen-ui'
import styled from 'styled-components'

const SalesForm = props => {

    //Imports form custom hook to handle state, form entry and form submission.
    const { values, handleChange, handleSubmit, setValues, setError, setLoading } = useForm(log);

    function log() {
        console.log(values)
    }

    return (
        <Pane>
            <Form onSubmit={handleSubmit}>
                <TextInput
                    placeholder='Enter year...'
                    onChange={handleChange}
                    value={values.year || ''}
                    name='year'
                    type='text' />
                <TextInput
                    placeholder='Enter week...'
                    onChange={handleChange}
                    value={values.week || ''}
                    name='week'
                    type='number' />
                <TextInput
                    placeholder='Enter amount...'
                    onChange={handleChange}
                    value={values.amount || ''}
                    name='amount'
                    type='number' />
                <Button type='primary' intent='success'>Submit</Button>
            </Form>
        </Pane>
    )
}

export default SalesForm

const Form = styled.form`
display: flex;
flex-direction: column
width: 280px`