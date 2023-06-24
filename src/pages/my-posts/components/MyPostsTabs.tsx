import { Tab, Tabs } from "@mui/material";
import Iconify from "src/components/Iconify";


export default function MyPostsTabs({myPostsHook}: any){

    return(
        <Tabs
            value={myPostsHook.currentTab}
            onChange={(_,value) => myPostsHook.setCurrentTab(value)}
            sx={{
                borderBottom: '1px solid',
                borderBottomColor: (theme) => theme.palette.divider
            }}
        >
            {myPostsHook.TABS.map((tab: any) =>
                <Tab
                    disableRipple
                    key={'TAB_'+tab.value+tab.label}
                    value={tab.value}
                    label={tab.label}
                    icon={
                        <Iconify icon={tab.icon}/>
                    }
                />
            )}
        </Tabs>
    )
}