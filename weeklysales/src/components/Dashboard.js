import React from 'react'

import SalesForm from './SalesForm'
import SimpleTable from './SimpleTable'

import styled from 'styled-components'

const Dashboard = () => {

    return (
        <DashContainer>
            <SalesForm />
            <SimpleTable />
        </DashContainer>
    )
}

export default Dashboard

const DashContainer = styled.div`
display: flex;
flex-direction: row;
padding: 1rem;`