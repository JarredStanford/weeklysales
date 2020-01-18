import React from 'react'
import firebase from './firebase'
import useForm from "./utils/useForm";

import { Table, Input } from 'semantic-ui-react'

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
            console.log(newRecord)
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
        <Table.Row >
            <Table.Cell>
                <Input
                    transparent
                    type='number'
                    placeholder='enter year...'
                    name='year'
                    onChange={handleChange} />
            </Table.Cell>
            <Table.Cell>
                <Input
                    transparent
                    type='number'
                    placeholder='enter week...'
                    name='week'
                    onChange={handleChange} />
            </Table.Cell>
            <Table.Cell>
                <Input
                    transparent
                    type='number'
                    placeholder='enter amount...'
                    name='amount'
                    onChange={handleChange} />
            </Table.Cell>
            <Table.Cell>
                <button onClick={handleSubmit}>Hi</button>
            </Table.Cell>
        </Table.Row>
    )
}

export default SalesForm