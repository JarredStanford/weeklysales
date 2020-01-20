import React, { useState, useEffect } from 'react'
import firebase from './firebase'

//Components
import SalesForm from './SalesForm'
import YearSelector from './YearSelector'
import SalesTable from './SalesTable'

//Styles
import { Loader, Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'


const SemanticTable = () => {

    const [sales, setSales] = useState()
    const [newCell, setNewCell] = useState(false)
    const [year, setYear] = useState(2020)
    const [filteredSales, setFilteredSales] = useState()

    //Realtime Firebase connection to load updates to the sales collection automatically.
    useEffect(() => {

        const unsubscribe = firebase.firestore()
            .collection('sales').onSnapshot(snapshot => {
                const sales = []
                snapshot.forEach(doc => sales.push({ id: doc.id, ...doc.data() }))
                setSales(sales)
            })

        return () => unsubscribe()

    }, [])

    //Filters Sales based on the chosen year.
    useEffect(() => {
        if (sales) {
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
                {newCell && <SalesForm setNewCell={setNewCell} sales={sales} />}
            </FormContainer>

            <YearSelector setYear={setYear} />

            <SalesTable filteredSales={filteredSales} sales={sales} />
        </TableContainer>
    )
}

export default SemanticTable

const TableContainer = styled.div`
padding: 5%`

const FormContainer = styled.div`
padding: 1%`