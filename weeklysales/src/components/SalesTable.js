import React from 'react'

import { Table } from 'semantic-ui-react'

const SalesTable = props => {

    console.log(props.filteredSales)

    return (
        <Table compact>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Week</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.filteredSales.map(sale => (
                    <Table.Row key={Math.random()}>
                        <Table.Cell>{sale.week}</Table.Cell>
                        <Table.Cell>${sale.amount}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default SalesTable