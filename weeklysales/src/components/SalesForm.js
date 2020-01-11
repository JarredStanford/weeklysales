import React from 'react'
import firebase from './firebase'
import useForm from "./utils/useForm";
import { Pane, TextInput } from 'evergreen-ui'
import styled from 'styled-components'

const SalesForm = props => {

    //Imports form custom hook to handle state, form entry and form submission.
    const { values, handleChange, handleSubmit, setError, setLoading, SubmitButton, ErrorMessage, setValues } = useForm(insertRecord);

    async function insertRecord() {
        try {
            const newRecord = {
                year: Number(values.year),
                week: Number(values.week),
                amount: Number(values.amount),
                notes: values.notes || ''
            }
            const db = firebase.firestore()
            const apple = db.collection('sales').add(newRecord)
            setLoading(false)
        }
        catch {
            setError(true)
            setLoading(false)
        }
    }

    return (
        <Pane>
            <Form onSubmit={handleSubmit}>
                <TextInput
                    placeholder='Enter year...'
                    onChange={handleChange}
                    value={values.year || ''}
                    name='year'
                    type='number' />
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
                <TextInput
                    placeholder='Enter notes...'
                    onChange={handleChange}
                    value={values.notes || ''}
                    name='notes'
                    type='text' />
                <ErrorMessage />
                <SubmitButton />
            </Form>
        </Pane>
    )
}

export default SalesForm

const Form = styled.form`
display: flex;
flex-direction: column
width: 280px`