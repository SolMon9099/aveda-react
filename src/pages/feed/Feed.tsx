import { Typography, Grid, Stack, Container, Box } from "@mui/material";
import Page from "src/components/Page";
import useAuth from "src/hooks/useAuth";
import CardNewPub from "./components/CardNewPub";
import CardTopUsers from "./components/CardTopUsers";
import CardTopTopics from "./components/CardTopTopics";
import FeedTabs from "./components/FeedTabs";
import Recent from "./components/Recent";
import useFeed from "./hooks/Feed.hook";
import Search from "./components/Search";
import useResponsive from "src/hooks/useResponsive";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";


export default function Feed(){
    const { isLoading } = useSelector((state) => state.feed)
    const { feedHook } = useFeed()
    const { isAuthenticated } = useAuth()

    const isDesktop = useResponsive('up', 'lg');
 
    return(
        <Page title="Feed">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                {isLoading ?
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box> 
                    :
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <Stack spacing={3}>
                                <Typography variant="h4">
                                    Feed
                                </Typography>
                                <CardNewPub feedHook={feedHook}/>
                                <FeedTabs feedHook={feedHook}/>
                                {feedHook.currentTab === 1 ?
                                    <Recent feedHook={feedHook}/>
                                    :
                                    <Search feedHook={feedHook}/>
                                }
                            </Stack>
                        </Grid>
                        {isDesktop &&
                            <Grid item lg={4}>
                                <Stack spacing={2}>
                                    {isAuthenticated &&
                                        <CardTopUsers/>
                                    }
                                    <CardTopTopics/>
                                </Stack>
                            </Grid>
                        }
                    </Grid>
                }
            </Container>
        </Page>
    )
}