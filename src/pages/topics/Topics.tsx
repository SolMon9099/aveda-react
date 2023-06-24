import { Box, Card, CardContent, CircularProgress, Container, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import AdevaLoading from "src/components/AdevaLoading";
import Page from "src/components/Page";
import Topic from "src/components/Topic";
import { useSelector } from "src/redux/store";
import useTopics from "./hooks/Topics.hook";


export default function Topics(){
    const { topicsHook } = useTopics()
    const { fixedTopics, topics, topicPagination, isLoading } = useSelector((state) => state.topic)

    return(
        <Page title="Tópicos">
            <Container maxWidth='md' sx={{ mt: 3 }}>
                {isLoading ?
                    <AdevaLoading/>
                    :
                    <Stack spacing={3}>
                        <Typography variant='h4'>
                            Tópicos
                        </Typography>
                        <Card sx={{borderRadius: 1}}>
                            <CardContent>
                                <Stack spacing={3} sx={{mb:3}}>
                                    {fixedTopics.map((topic, idx) =>
                                        <Topic key={'TOPIC_'+topic._id+idx} topic={topic}/>
                                    )}
                                </Stack>
                                <InfiniteScroll
                                    pageStart={1}
                                    loadMore={topicsHook.handleGetMoreTopics}
                                    hasMore={!!topicPagination?.nextCursor}
                                    loader={
                                        <Box mt={2} display='flex' alignItems='center' justifyContent='center' >
                                            <CircularProgress/>
                                        </Box>
                                    }
                                >
                                    <Stack spacing={3}>
                                        {topics.map((topic, idx) =>
                                            <Topic key={'TOPIC_'+topic._id+idx} topic={topic}/>
                                        )}
                                    </Stack>
                                </InfiniteScroll>
                            </CardContent>
                        </Card>
                    </Stack>
                }
            </Container>
        </Page>
    )
}