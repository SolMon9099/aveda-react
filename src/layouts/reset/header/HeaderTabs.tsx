import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs, Typography } from '@mui/material';

export default function HeaderTabs(){
    const [ selectedTab, setSelectedTab ] = useState(1)
    const TABS = [
        {label: 'Fórum', to: '/forum', value: 1}
    ]

    return(
        <Tabs
            value={selectedTab}
            onChange={(_, value) => setSelectedTab(value)}
            indicatorColor='secondary'
            sx={{
                '.MuiTabs-indicator':{
                    top: 0
                },
                height: 60
            }}
        >
            {TABS.map((tab) =>
                <Tab
                    key={'Tabs_'+tab.value}
                    component={Link}
                    to={tab.to}
                    value={tab.value}
                    sx={{
                        height: 60
                    }}
                    label={
                        <Typography variant='subtitle2' color='grey.0'>
                            {tab.label}
                        </Typography>
                    }
                />
            )}
        </Tabs>
    )
}