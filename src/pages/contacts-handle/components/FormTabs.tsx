import { Tab, Tabs } from "@mui/material";
import Label from "src/components/Label";

export default function FormTabs({ contactsHandleHook }: any){
    return(
        <Tabs
            value={contactsHandleHook.formTab}
            onChange={(_,value) => contactsHandleHook.setFormTab(value)}
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            sx={{
                borderBottom: '1px solid',
                borderBottomColor: (theme) => theme.palette.divider
            }}
        >
            {contactsHandleHook.FORM_TABS.map((tab: any) =>
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