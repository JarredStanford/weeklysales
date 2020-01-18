import React from 'react'

import firebase from './firebase'

import Chart from './Chart'
import SemanticTable from './SemanticTable'

import { Tablist, Tab, Pane } from 'evergreen-ui'
import { Button, Icon } from 'semantic-ui-react'

const TabsPage = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const tabs = ['Pivot Table', 'Charts']

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
                    <Button negative onClick={() => firebase.auth().signOut()} animated='fade'>
                        <Button.Content visible>Sign Out</Button.Content>
                        <Button.Content hidden><Icon name='sign-out' /></Button.Content>
                    </Button>
                </Tablist>
            </div>
            <div>
                <Pane
                    role='tabpanel'
                    aria-labelledby={'Pivot Table'}
                    aria-hidden={selectedIndex !== 0}
                    display={0 === selectedIndex ? 'block' : 'none'}
                >
                    <SemanticTable />
                </Pane>
                <Pane
                    role='tabpanel'
                    aria-labelledby={'Charts'}
                    aria-hidden={selectedIndex !== 1}
                    display={1 === selectedIndex ? 'block' : 'none'}
                >
                    <Chart />
                </Pane>
            </div>
        </>
    )
}

export default TabsPage