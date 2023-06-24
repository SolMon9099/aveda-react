import { Box, Card, CardContent, CircularProgress, Stack } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import Topic from "src/components/Topic";
import { useSelector } from "src/redux/store";


export default function Topics({ communityHook }: any){
    const { fixedTopics, topics, topicPagination } = useSelector((state) => state.community)

    return(
        <Card sx={{borderRadius: 1}}>
            <CardContent>
                <Stack spacing={3} sx={{mb:3}}>
                    {fixedTopics.map((topic, idx) =>
                        <Topic key={'TOPIC_'+topic._id+idx} topic={topic}/>
                    )}
                </Stack>
                <InfiniteScroll
                    pageStart={1}
                    loadMore={communityHook.handleGetMoreTopics}
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
    )
}