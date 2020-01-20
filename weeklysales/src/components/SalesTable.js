import React from 'react'

import { Table } from 'semantic-ui-react'

const SalesTable = props => {

    return (
        <Table compact>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Week</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>YOY %</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.filteredSales.map(sale => (
                    <Table.Row key={sale.id}>
                        <Table.Cell>{sale.week}</Table.Cell>
                        <Table.Cell>${sale.amount}</Table.Cell>
                        <Table.Cell>{sale.yoyChange && sale.yoyChange + '%'}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default SalesTable