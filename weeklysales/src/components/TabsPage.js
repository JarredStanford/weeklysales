import React from 'react'

import firebase from './firebase'

import PivotTable from './PivotTable'
import Chart from './Chart'
import SalesForm from './SalesForm'
import SimpleTable from './Table'

import { Tablist, Tab, Pane, Paragraph } from 'evergreen-ui'

const TabsPage = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const tabs = ['Pivot Table', 'Charts', 'Enter Sales', 'Table']

    return (
        <>
            <div>
                <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
                    {tabs.map((tab, index) => (
                        <Tab
                            key={tab}
                            id={tab}
                            onSelect={() => setSelectedIndex(index)}
                            isSelected={index === selectedIndex}
                            aria-controls={`panel-${tab}`}
                        >
                            {tab}
                        </Tab>
                    ))}
                    <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
                </Tablist>
            </div>
            <div>
                <Pane
                    role='tabpanel'
                    aria-labelledby={'Pivot Table'}
                    aria-hidden={selectedIndex !== 0}
                    display={0 === selectedIndex ? 'block' : 'none'}
                >
                    <PivotTable />
                </Pane>
                <Pane
                    role='tabpanel'
                    aria-labelledby={'Charts'}
                    aria-hidden={selectedIndex !== 1}
                    display={1 === selectedIndex ? 'block' : 'none'}
                >
                    <Chart />
                </Pane>
                <Pane
                    role='tabpanel'
                    aria-labelledby={'Enter Sales'}
                    aria-hidden={selectedIndex !== 2}
                    display={2 === selectedIndex ? 'block' : 'none'}
                >
                    <SalesForm />
                </Pane>
                <Pane
                    role='tabpanel'
                    aria-labelledby={'Table'}
                    aria-hidden={selectedIndex !== 3}
                    display={3 === selectedIndex ? 'block' : 'none'}
                >
                    <SimpleTable />
                </Pane>
            </div>
        </>
    )
}

export default TabsPage