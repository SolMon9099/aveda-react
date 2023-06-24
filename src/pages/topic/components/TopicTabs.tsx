import { Alert, Typography } from "@mui/material";
import { Tab, Tabs, Stack } from "@mui/material";
import Iconify from "src/components/Iconify";
import { useSelector } from "src/redux/store";


export default function TopicTabs({topicHook}: any){
    const { selectedTopic } = useSelector((state) => state.topic)

    return(
        <>
        {((selectedTopic?.visibleCount / selectedTopic?.activePostCount) < 0.5 && (selectedTopic?.visibleCount !== 0 && selectedTopic?.activePostCount !== 0 )) && 
            <Alert severity="info" >
                Explore novos grupos e comunidades para encontrar conteúdos interessantes que você possa ter perdido!
            </Alert>
        }
        <Stack 
            direction='row'
            alignItems='center'
            justifyContent='space-between' 
            sx={{
                borderBottom: '1px solid',
                borderBottomColor: (theme) => theme.palette.divider
            }}
        >
            <Tabs
                value={topicHook.currentTab}
                onChange={(_,value) => topicHook.setCurrentTab(value)}
            >
                {topicHook.TABS.map((tab: any) =>
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
            <Typography variant='subtitle2' color='text.disabled'>
                {selectedTopic?.visibleCount === 1 ? `${selectedTopic?.visibleCount} Publicação visível para você` : `${selectedTopic?.visibleCount} Publicações visíveis para você`} 
            </Typography>
        </Stack>
        </>
    )
}