import { Tab, Tabs } from "@mui/material";
import Label from "src/components/Label";

export default function PersonTypeTabs({ contactsHandleHook }: any){
    return(
        <Tabs
            value={contactsHandleHook.personType}
            onChange={(_,value) => contactsHandleHook.onChangePersonType(value)}
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            sx={{
                borderBottom: '1px solid',
                borderBottomColor: (theme) => theme.palette.divider
            }}
        >
            {contactsHandleHook.PERSON_TYPES.map((tab: any) =>
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