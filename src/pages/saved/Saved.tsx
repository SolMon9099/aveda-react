import { Box, CircularProgress, Container, Stack, Typography, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import CardERP from "src/components/CardERP";
import Page from "src/components/Page";
import CardPost from "src/components/post/CardPost";
import NoResult from "src/components/post/NoResult";
import useResponsive from "src/hooks/useResponsive";
import { useSelector } from "src/redux/store";
import useSaved from "./hooks/Saved.hook";


export default function Topics(){
    const { savedHook } = useSaved()
    const { savedPosts, savedPostsPagination, isLoadingSavedPosts } = useSelector((state) => state.saved)
    const isDesktop = useResponsive('up', 'lg');

    return(
        <Page title="Salvos">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={8}>
                        <Stack spacing={3}>
                            <Typography variant='h4'>
                                Salvos
                            </Typography>
                            {!isLoadingSavedPosts && savedPosts.length === 0 ?
                                <NoResult/>
                                :
                                <InfiniteScroll
                                    pageStart={1}
                                    loadMore={savedHook.handleGetMorePosts}
                                    hasMore={!!savedPostsPagination?.nextCursor}
                                    loader={
                                        <Box mt={2} display='flex' alignItems='center' justifyContent='center' >
                                            <CircularProgress/>
                                        </Box>
                                    }
                                >
                                    <Stack spacing={3}>
                                        {savedPosts.map((post, idx) =>
                                            <CardPost key={'SAVED_POST_'+post._id+idx} post={post}/>
                                        )}
                                    </Stack>
                                </InfiniteScroll>
                            }
                        </Stack>
                    </Grid>
                    {isDesktop &&
                        <Grid item lg={4}>
                            <CardERP banner/>
                        </Grid>
                    }
                </Grid>
            </Container>
        </Page>
    )
}