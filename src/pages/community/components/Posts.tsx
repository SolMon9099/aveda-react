import { Stack } from "@mui/material";
import CardNewPub from "./CardNewPub";
import CommunityTabs from "./CommunityTabs";
import Recent from "./Recent";
import Search from "./Search";


export default function Posts({communityHook}: any){
    return(
        <Stack spacing={3}>
            <CardNewPub/>
            <CommunityTabs communityHook={communityHook}/>
            {communityHook.currentTab === 1 ?
                <Recent communityHook={communityHook}/>
                :
                <Search communityHook={communityHook}/>
            }
        </Stack>
    )
}