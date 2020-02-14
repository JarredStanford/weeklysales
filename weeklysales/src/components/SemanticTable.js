import React, { useState, useEffect } from 'react'
import firebase from './firebase'

//Components
import SalesForm from './SalesForm'
import YearSelector from './YearSelector'
import SalesTable from './SalesTable'
import Chart from './Chart'

//Styles
import { Loader, Button, Icon, Statistic } from 'semantic-ui-react'
import styled from 'styled-components'


const SemanticTable = () => {

    const [sales, setSales] = useState()
    const [newCell, setNewCell] = useState(false)
    const [year, setYear] = useState(2020)
    const [filteredSales, setFilteredSales] = useState()
    const [data, setData] = useState([])

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

    //Sorts sales data into an array so Fusion Charts can read it.
    useEffect(() => {

        const chartData = [
            {
                'seriesname': '2018',
                'data': []
            },
            {
                'seriesname': '2019',
                'data': []
            },
            {
                'seriesname': '2020',
                'data': []
            }
        ]

        if (sales) {
            sales.map((sale) => {

                const { week, year, amount } = sale


                if (year === 2018) {
                    return (
                        chartData[0]['data'].push({
                            'label': `Week ${week}`,
                            'value': amount.toString()
                        })
                    )
                } else if (year === 2019) {
                    return (
                        chartData[1]['data'].push({
                            'label': `Week ${week}`,
                            'value': amount.toString()
                        })
                    )
                } else {
                    chartData[2]['data'].push({
                        'label': `Week ${week}`,
                        'value': amount.toString()
                    })
                }
            })
        }

        setData(chartData)

    }, [sales])

    if (!filteredSales) return <Loader />

    //Calculates total for all weeks of the selected year and converts it to USD formatting.
    const yearlyTotal = filteredSales.reduce((a, b) => a + b['amount'], 0).toLocaleString(undefined, { style: 'currency', currency: 'USD' })


    return (
        <TableContainer>
            <Button positive onClick={() => toggleNewCell()} >
                <Icon name='plus' />
                New Week
            </Button>

            <FormContainer>
                {newCell && <SalesForm setNewCell={setNewCell} sales={sales} />}
            </FormContainer>

            <Stats>
                <YearSelector setYear={setYear} />
                <Statistic size='small'>
                    <Statistic.Value>
                        {yearlyTotal}
                    </Statistic.Value>
                    <Statistic.Label>
                        Annual Total
                </Statistic.Label>
                </Statistic>
            </Stats>

            <SalesTable filteredSales={filteredSales} sales={sales} year={year} />
            <Chart data={data} />
        </TableContainer>
    )
}

export default SemanticTable

const TableContainer = styled.div`
        padding: 5%`

const FormContainer = styled.div`
        padding: 1%`

const Stats = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;`