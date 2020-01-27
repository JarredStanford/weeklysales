import React from 'react'
import firebase from './firebase'
import useForm from "./utils/useForm";
import moment from 'moment'

import { Form, Button, Icon } from 'semantic-ui-react'

const SalesForm = props => {

    //Imports form custom hook to handle state, form entry and form submission.
    const { values, handleChange, handleSubmit, setError, setLoading } = useForm(insertRecord);

    async function insertRecord() {
        try {
            //Finds current week and year.
            const date = Date.now()

            //Sets week to the current week minus 1 because sales are entered the week after they occur.
            const week = moment(date).week() - 1
            const year = moment(date).year()

            //When reporting sales during the first week of the year, this will accurately change the reported date to the final week of the prior year.
            if (week === 0) { return week === 52 && year - 1 }

            //Calculates year over year growth.
            const yoy = props.sales.find(sale => sale.id = `${year - 1}${week}`)
            const yoyChange = (Number(values.amount) - yoy.amount) / yoy.amount * 100

            //Record to be added to DB.
            const newRecord = {
                year: year,
                week: week,
                amount: Number(values.amount),
                notes: values.notes || '',
                yoyChange: yoyChange,
                timestamp: date
            }

            //Checks to see if the record for the current week has already been set.
            const db = firebase.firestore()
            const checkIfRecordExists = db.collection('sales').doc(`${year}${week}`).get()

            if (!checkIfRecordExists.exists) db.collection('sales').doc(`${year}${week}`).set(newRecord)

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
