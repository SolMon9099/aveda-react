import { Tab, Tabs } from "@mui/material";
import Iconify from "src/components/Iconify";


export default function FeedTabs({feedHook}: any){
    return(
        <Tabs
            value={feedHook.currentTab}
            onChange={(_,value) => feedHook.setCurrentTab(value)}
            sx={{
                borderBottom: '1px solid',
                borderBottomColor: (theme) => theme.palette.divider
            }}
        >
            {feedHook.TABS.map((tab: any) =>
                <Tab
                    disableRipple
                    key={'TAB_'+tab.value+tab.label}
                    value={tab.value}
                    label={tab.label}
                    icon={
                        <Iconify width={16} height={16} icon={tab.icon}/>
                    }
                />
            )}
        </Tabs>
    )
}