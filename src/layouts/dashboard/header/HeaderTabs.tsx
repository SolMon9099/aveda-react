import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Tab, Tabs, Typography } from '@mui/material';

export default function HeaderTabs(){
    const {pathname} = useLocation()
    const [ selectedTab, setSelectedTab ] = useState(1)
    const TABS = [
        {label: 'ERP', to: '/erp', value: 0},
        {label: 'Fórum', to: '/forum', value: 1}
    ]

    useEffect(() =>{
        if(pathname.includes('/erp/')){
            setSelectedTab(0)
        }else{
            setSelectedTab(1)
        }
    },[pathname])

    return(
        <Tabs
            value={selectedTab}
            onChange={(_, value) => setSelectedTab(value)}
            indicatorColor='secondary'
            sx={{
                '.MuiTabs-indicator':{
                    top: 0
                },
                height: 60,
                overflow: 'hidden'
            }}
            variant="scrollable"
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