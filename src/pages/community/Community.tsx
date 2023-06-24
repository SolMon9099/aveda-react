import { Grid, Stack, Container, Box } from "@mui/material";
import Page from "src/components/Page";
import useResponsive from "src/hooks/useResponsive";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import useCommunity from "./hooks/Community.hook";
import CardBanner from "./components/CardBanner";
import Posts from "./components/Posts";
import CardDetails from "./components/CardDetails";
import Topics from "./components/Topics";
import Members from "./components/Members";


export default function Feed(){
    const { communityHook } = useCommunity()
    const { isLoadingCommunity } = useSelector((state) => state.community)

    const isDesktop = useResponsive('up', 'lg');
 
    return(
        <Page title="Comunidade">
            <Container maxWidth='lg'>
                {isLoadingCommunity ?
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box> 
                    :
                    <Stack spacing={2}>
                        <CardBanner communityHook={communityHook}/>
                        <Box flexGrow={1}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={8}>
                                    {communityHook.currentTabCard === 1 ?
                                        <Posts communityHook={communityHook}/>
                                        :
                                        communityHook.currentTabCard === 2 ?
                                        <Topics communityHook={communityHook}/>
                                        :
                                        <Members communityHook={communityHook}/>
                                    }
                                </Grid>
                                {isDesktop &&
                                    <Grid item lg={4}>
                                        <Stack spacing={2}>
                                            <CardDetails/>
                                        </Stack>
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                    </Stack>
                }
            </Container>
        </Page>
    )
}