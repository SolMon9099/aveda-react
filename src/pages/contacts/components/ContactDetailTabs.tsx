import { Tab, Tabs } from "@mui/material";
import Label from "src/components/Label";

export default function ContactDetailTabs({ processDetailHook }: any){
    return(
        <Tabs
            value={processDetailHook.currentTab}
            onChange={(_,value) => processDetailHook.setCurrentTab(value)}
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            sx={{
                borderBottom: '1px solid',
                borderBottomColor: (theme) => theme.palette.divider
            }}
        >
            {processDetailHook.TABS.map((tab: any) =>
                <Tab
                    disableRipple
                    key={'TAB_'+tab.value+tab.label}
                    value={tab.value}
                    label={tab.label}
                    iconPosition='start'
                    icon={tab.icon &&
                        <Label
                            variant="filled"
                            sx={{
                                ml: 1
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