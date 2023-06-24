import { Box, Card, Tab, Tabs, Typography } from "@mui/material";
import Image from "src/components/Image";
import { useSelector } from "src/redux/store";


export default function CardBanner({communityHook} : any){
    const { selectedCommunity } = useSelector((state) => state.community)

    return(
        <Card sx={{borderRadius: 1}}>
            <Image src={selectedCommunity?.banner} sx={{ maxHeight: 400, width: '100%' }}/>
            <Box sx={{ p:3 }}>
                <Typography variant='h4'>
                    {selectedCommunity?.name}
                </Typography>
            </Box>
            <Tabs
                scrollButtons
                visibleScrollbar
                sx={{ pl: 3, pr: 3 }}
                value={communityHook.currentTabCard}
                onChange={(_,value) => communityHook.setCurrentTabCard(value)}
            >
                {communityHook.TABS_CARD.map((tab: any) =>
                    <Tab
                        disableRipple
                        key={'TAB_COMMUNITY_CARD_'+tab.value+tab.label}
                        value={tab.value}
                        label={tab.label}
                    />
                )}
            </Tabs>
        </Card>
    )
}