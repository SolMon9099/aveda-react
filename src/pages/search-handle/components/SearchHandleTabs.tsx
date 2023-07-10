import { Tab, Tabs } from "@mui/material";
import Label from "src/components/Label";

export default function SearchHandleTabs({ searchHandleHook }: any){
    return(
        <Tabs
            value={searchHandleHook.currentTab}
            onChange={(_,value) => searchHandleHook.setCurrentTab(value)}
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            sx={{
                borderBottom: '1px solid',
                borderBottomColor: (theme) => theme.palette.divider
            }}
        >
            {searchHandleHook.TABS.map((tab: any) =>
                <Tab
                    disableRipple
                    key={'TAB_'+tab.value+tab.label}
                    value={tab.value}
                    label={tab.label}
                    iconPosition='end'
                    icon={tab.icon &&
                        <Label
                            variant="filled"
                            sx={{
                                ml: 1,
                                borderRadius: '10px'
                            }}
                        >
                            {tab.icon}
                        </Label>
                    }
                />
            )}
        </Tabs>
    )
}