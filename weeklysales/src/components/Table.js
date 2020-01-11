import React from 'react'
import firebase from './firebase'
import { Spinner, Table } from 'evergreen-ui'

const SimpleTable = () => {

    const [sales, setSales] = React.useState()

    React.useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore()
            const data = await db.collection('sales').get()
            const totals = data.docs.map(doc => doc.data())
            setSales(totals)
        }

        fetchData()
    }, [])

    if (!sales) return <Spinner />

    console.log(sales)


    return (
        <Table flex={1} display="flex" flexDirection="column">
            <Table.Head>
                <Table.TextHeaderCell>Year</Table.TextHeaderCell>
                <Table.TextHeaderCell>Week</Table.TextHeaderCell>
                <Table.TextHeaderCell>Amount</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body height={240}>
                {sales.map(sale => (
                    <Table.Row isSelectable onSelect={() => alert(sale.notes)}>
                        <Table.TextCell>{sale.year}</Table.TextCell>
                        <Table.TextCell>{sale.week}</Table.TextCell>
                        <Table.TextCell isNumber>{sale.amount}</Table.TextCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default SimpleTable