import { Tab, Tabs } from "@mui/material";
import Label from "src/components/Label";

export default function CaseDetailTabs({ caseDetailHook }: any){
    return(
        <Tabs
            value={caseDetailHook.currentTab}
            onChange={(_,value) => caseDetailHook.setCurrentTab(value)}
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            sx={{
                borderBottom: '1px solid',
                borderBottomColor: (theme) => theme.palette.divider
            }}
        >
            {caseDetailHook.TABS.map((tab: any) =>
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