import React from 'react'
import firebase from './firebase'
import useForm from "./utils/useForm";

import { Form, Button, Icon } from 'semantic-ui-react'

const SalesForm = props => {

    //Imports form custom hook to handle state, form entry and form submission.
    const { values, handleChange, handleSubmit, setError, setLoading } = useForm(insertRecord);

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
            props.setNewCell(false)
        }
        catch {
            setError(true)
            setLoading(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group inline>
                <Form.Field>
                    <label>Year</label>
                    <input
                        control='text'
                        type='number'
                        placeholder='Year'
                        name='year'
                        onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Date</label>
                    <input
                        control='text'
                        type='number'
                        placeholder='Date'
                        name='date'
                        onChange={handleChange} />
                </Form.Field>

                <Form.Field>
                    <label>Amount</label>
                    <input
                        control='text'
                        type='number'
                        placeholder='Amount'
                        name='amount'
                        onChange={handleChange} />
                </Form.Field>
                <Button animated='vertical' positive>
                    <Button.Content visible>Add</Button.Content>
                    <Button.Content hidden>
                        <Icon name='check circle' />
                    </Button.Content>
                </Button>
            </Form.Group>
        </Form>
    )
}

export default SalesForm