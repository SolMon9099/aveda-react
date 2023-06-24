import CardPost from "src/components/post/CardPost"
import { useSelector } from "src/redux/store"
import InfiniteScroll from "react-infinite-scroller"
import { Box, CircularProgress, Stack } from "@mui/material"
import NoResult from "src/components/post/NoResult"

type Props = {
    myPostsHook: any;
}

export default function MyPubs({ myPostsHook }: Props){
    const { myPosts, myPostsPagination, isLoadingMyPosts } = useSelector((state) => state.myPosts)

    return(
        !isLoadingMyPosts && myPosts.length === 0 ?
            <NoResult/>
            :
            <InfiniteScroll
                pageStart={1}
                loadMore={myPostsHook.handleGetMorePostsMy}
                hasMore={!!myPostsPagination?.nextCursor}
                loader={
                    <Box mt={2} display='flex' alignItems='center' justifyContent='center' >
                        <CircularProgress/>
                    </Box>
                }
            >
                <Stack spacing={2}>
                    {myPosts.map((post, idx) =>
                        <CardPost key={'CARD_MY_POST_'+post._id+idx} post={post}/>
                    )}
                </Stack>
            </InfiniteScroll>
    )
}