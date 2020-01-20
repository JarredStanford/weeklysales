import React from 'react'

import { Table } from 'semantic-ui-react'

const SalesTable = props => {

    const [column, setColumn] = React.useState('week')
    const [direction, setDirection] = React.useState('descending')

    const reorder = clickedColumn => {

        const compare = (a, b) => {

            if (direction === 'descending') {
                if (a[clickedColumn] < b[clickedColumn]) return -1
                if (a[clickedColumn] > b[clickedColumn]) return 1
                return 0
            } else {
                if (a[clickedColumn] > b[clickedColumn]) return -1
                if (a[clickedColumn] < b[clickedColumn]) return 1
                return 0
            }
        }

        props.filteredSales.sort(compare)
    }

    const handleSort = clickedColumn => {
        if (column !== clickedColumn) setColumn(clickedColumn)

        setDirection(direction === 'ascending' ? 'descending' : 'ascending')
        reorder(clickedColumn)
    }

    return (
        <Table compact sortable celled fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'week' ? direction : null}
                        onClick={() => handleSort('week')}>
                        Week
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'amount' ? direction : null}
                        onClick={() => handleSort('amount')}>
                        Amount
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'yoyChange' ? direction : null}
                        onClick={() => handleSort('yoyChange')}>
                        YOY %
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.filteredSales.map(sale => (
                    <Table.Row key={sale.id}>
                        <Table.Cell>{sale.week}</Table.Cell>
                        <Table.Cell>${sale.amount.toFixed(2)}</Table.Cell>
                        <Table.Cell
                            positive={sale.yoyChange && sale.yoyChange > 0 ? true : false}
                            negative={sale.yoyChange && sale.yoyChange < 0 ? true : false}>
                            {sale.yoyChange && sale.yoyChange.toFixed(2) + '%'}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default SalesTable