import { Tab, Tabs } from "@mui/material";
import Iconify from "src/components/Iconify";


export default function CommunityTabs({communityHook}: any){
    return(
        <Tabs
            value={communityHook.currentTab}
            onChange={(_,value) => communityHook.setCurrentTab(value)}
            sx={{
                borderBottom: '1px solid',
                borderBottomColor: (theme) => theme.palette.divider
            }}
        >
            {communityHook.TABS.map((tab: any) =>
                <Tab
                    disableRipple
                    key={'TAB_COMMUNITY_'+tab.value+tab.label}
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