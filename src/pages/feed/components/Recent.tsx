import CardPost from "src/components/post/CardPost"
import { useSelector } from "src/redux/store"
import InfiniteScroll from "react-infinite-scroller"
import { Box, CircularProgress, Stack } from "@mui/material"

type Props = {
    feedHook: any;
}

export default function Recent({ feedHook }: Props){
    const { feedPosts, feedPagination } = useSelector((state) => state.feed)

    return(
        <InfiniteScroll
            pageStart={1}
            loadMore={feedHook.handleGetMorePostsFeed}
            hasMore={!!feedPagination?.nextCursor}
            loader={
                <Box mt={2} display='flex' alignItems='center' justifyContent='center' >
                    <CircularProgress/>
                </Box>
            }
        >
            <Stack spacing={2}>
                {feedPosts.map((post, idx) =>
                    <CardPost key={'CARD_POST_'+post._id+idx} post={post}/>
                )}
            </Stack>
        </InfiniteScroll>
    )
}