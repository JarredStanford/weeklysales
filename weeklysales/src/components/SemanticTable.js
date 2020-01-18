import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

//Components
import SalesForm from './SalesForm'

//Styles
import { Table, Loader, Form, Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'


const SemanticTable = () => {

    const [sales, setSales] = useState()
    const [newCell, setNewCell] = useState(false)
    const [year, setYear] = useState()
    const [filteredSales, setFilteredSales] = useState()

    //Realtime Firebase connection to load updates to the sales collection automatically.
    useEffect(() => {

        const unsubscribe = firebase.firestore()
            .collection('sales').onSnapshot(snapshot => {
                const sales = []
                snapshot.forEach(doc => sales.push(doc.data()))
                setSales(sales)
            })

        return () => unsubscribe()

    }, [])

    //Filters Sales based on the chosen year.
    useEffect(() => {
        if (year) {
            setFilteredSales(sales.filter(sale => sale.year === year))
        } else { setFilteredSales(sales) }

    }, [year, sales])

    const toggleNewCell = () => {
        setNewCell(!newCell)
    }

    if (!filteredSales) return <Loader />

    return (
        <TableContainer>
            <Button positive onClick={() => toggleNewCell()}><Icon name='plus' />New Week</Button>
            <FormContainer>
                {newCell && <SalesForm setNewCell={setNewCell} />}
            </FormContainer>

            <Form>
                <Form.Group inline>
                    <Form.Field onChange={(e) => setYear(Number(e.target.value))} control='select' name='year' label='Year'>
                        <option value={2019}>2019</option>
                        <option value={2018}>2018</option>
                        <option value={2017}>2017</option>
                    </Form.Field>
                </Form.Group>
            </Form>


            <Table compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {filteredSales.map(sale => (
                        <Table.Row key={Math.random()}>
                            <Table.Cell>{sale.date}</Table.Cell>
                            <Table.Cell>${sale.amount}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </TableContainer>
    )
}

export default SemanticTable

const TableContainer = styled.div`
padding: 5%`

const FormContainer = styled.div`
padding: 1%`