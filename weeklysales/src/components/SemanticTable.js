import React from 'react'
import firebase from 'firebase'

import SalesForm from './SalesForm'

import { Table, Loader } from 'semantic-ui-react'


const SemanticTable = () => {

    const [sales, setSales] = React.useState()
    const [newCell, setNewCell] = React.useState(false)

    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection('sales').get()
            const totals = data.docs.map(doc => doc.data())
            setSales(totals)
        }

        fetchData()
    }, [])

    const toggleNewCell = () => {
        setNewCell(!newCell)
    }

    if (!sales) return <Loader />

    console.log(sales)

    return (
        <>
            <button onClick={() => toggleNewCell()}>New Cell</button>

            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Year</Table.HeaderCell>
                        <Table.HeaderCell>Week</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {newCell && <SalesForm />}
                    {sales.map(sale => (
                        <Table.Row key={Math.random()}>
                            <Table.Cell>{sale.year}</Table.Cell>
                            <Table.Cell>{sale.week}</Table.Cell>
                            <Table.Cell>{sale.amount}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}

export default SemanticTable