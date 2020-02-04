import React, { useEffect } from 'react'

import { Table, Popup, Icon } from 'semantic-ui-react'
import NoteAdder from './NoteAdder'

const SalesTable = props => {

    const [column, setColumn] = React.useState('week')
    const [direction, setDirection] = React.useState('ascending')

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

        if (column !== clickedColumn) { setColumn(clickedColumn) }

        setDirection(direction === 'ascending' ? 'descending' : 'ascending')

        reorder(clickedColumn)
    }

    useEffect(() => {
        handleSort('week')
    }, [props.filteredSales])

    const addNote = () => {

    }

    return (
        <Table striped sortable celled fixed>
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
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.filteredSales.map(sale => (
                    <Table.Row key={sale.id}>
                        <Table.Cell>{sale.week}</Table.Cell>
                        <Table.Cell textAlign='right'>{sale.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</Table.Cell>
                        <Table.Cell
                            textAlign='right'
                            positive={sale.yoyChange && sale.yoyChange > 0}
                            negative={sale.yoyChange && sale.yoyChange < 0}>
                            {sale.yoyChange && sale.yoyChange.toFixed(2) + '%'}
                        </Table.Cell>
                        <Table.Cell style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <NoteAdder id={sale.id} />
                            {sale.notes && <Popup trigger={<Icon name='sticky note' />}> {sale.notes} </Popup>}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export default SalesTable