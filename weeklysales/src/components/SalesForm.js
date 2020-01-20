import React from 'react'
import firebase from './firebase'
import useForm from "./utils/useForm";
import moment from 'moment'

import { Form, Button, Icon, Message } from 'semantic-ui-react'

const SalesForm = props => {

    //Imports form custom hook to handle state, form entry and form submission.
    const { values, handleChange, handleSubmit, setError, setLoading, isError } = useForm(insertRecord);

    async function insertRecord() {
        try {
            const date = Date.now()
            const week = moment(date).week()
            const year = moment(date).year()

            const newRecord = {
                year: year,
                week: week,
                timestamp: date,
                amount: Number(values.amount),
                notes: values.notes || ''
            }

            //Checks to see if the record for the current week has already been set.
            const db = firebase.firestore()
            const checkIfRecordExists = db.collection('sales').doc(`${year}${week}`).get()

            if (!checkIfRecordExists) db.collection('sales').doc(`${year}${week}`).set(newRecord)

            setLoading(false)
            setError(false)
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
                    <label>Amount</label>
                    <input
                        type='number'
                        step='.01'
                        min='0'
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