import React, { useState } from 'react'
import firebase from 'firebase'

import SalesForm from './SalesForm'

import { Table, Loader, Form } from 'semantic-ui-react'


const SemanticTable = () => {

    const [sales, setSales] = useState()
    const [newCell, setNewCell] = useState(false)
    const [year, setYear] = useState()
    const [filteredSales, setFilteredSales] = useState()

    React.useEffect(() => {

        const unsubscribe = firebase.firestore()
            .collection('sales').onSnapshot(snapshot => {
                const sales = []
                snapshot.forEach(doc => sales.push(doc.data()))
                setSales(sales)
            })

        return () => unsubscribe()

    }, [])

    React.useEffect(() => {
        if (year) {
            setFilteredSales(sales.filter(sale => sale.year === year))
        } else { setFilteredSales(sales) }

    }, [year, sales])

    const toggleNewCell = () => {
        setNewCell(!newCell)
    }

    if (!filteredSales) return <Loader />

    return (
        <>
            <button onClick={() => toggleNewCell()}>New Cell</button>

            <Table compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Form>
                                <Form.Field onChange={(e) => setYear(Number(e.target.value))} control='select' name='year'>
                                    <option value={null} />
                                    <option value={2017}>2017</option>
                                    <option value={2018}>2018</option>
                                    <option value={2019}>2019</option>
                                </Form.Field>
                            </Form>
                        </Table.HeaderCell>
                        <Table.HeaderCell>Week</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {newCell && <SalesForm setNewCell={setNewCell} />}
                    {filteredSales.map(sale => (
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