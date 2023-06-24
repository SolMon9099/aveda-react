import CardPost from "src/components/post/CardPost"
import { useSelector } from "src/redux/store"
import InfiniteScroll from "react-infinite-scroller"
import { Box, CircularProgress, Stack } from "@mui/material"

type Props = {
    communityHook: any;
}

export default function Recent({ communityHook }: Props){
    const { communityPosts, communityPagination } = useSelector((state) => state.community)

    return(
        <InfiniteScroll
            pageStart={1}
            loadMore={communityHook.handleGetMorePostsCommunity}
            hasMore={!!communityPagination?.nextCursor}
            loader={
                <Box mt={2} display='flex' alignItems='center' justifyContent='center' >
                    <CircularProgress/>
                </Box>
            }
        >
            <Stack spacing={2}>
                {communityPosts.map((post, idx) =>
                    <CardPost key={'CARD_POST_'+post._id+idx} post={post}/>
                )}
            </Stack>
        </InfiniteScroll>
    )
}