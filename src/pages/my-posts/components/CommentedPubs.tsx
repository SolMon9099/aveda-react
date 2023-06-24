import CardPost from "src/components/post/CardPost"
import { useSelector } from "src/redux/store"
import InfiniteScroll from "react-infinite-scroller"
import { Box, CircularProgress, Stack } from "@mui/material"
import NoResult from "src/components/post/NoResult"

type Props = {
    myPostsHook: any;
}

export default function CommentedPubs({ myPostsHook }: Props){
    const { commentedPosts, commentedPostsPagination, isLoadingCommentedPosts } = useSelector((state) => state.myPosts)

    return(
        !isLoadingCommentedPosts && commentedPosts.length === 0 ?
            <NoResult/>
            :
            <InfiniteScroll
                pageStart={1}
                loadMore={myPostsHook.handleGetMorePostsCommented}
                hasMore={!!commentedPostsPagination?.nextCursor}
                loader={
                    <Box mt={2} display='flex' alignItems='center' justifyContent='center' >
                        <CircularProgress/>
                    </Box>
                }
            >
                <Stack spacing={2}>
                    {commentedPosts.map((post, idx) =>
                        <CardPost key={'CARD_COMMENTED_POST_'+post._id+idx} post={post}/>
                    )}
                </Stack>
            </InfiniteScroll>
    )
}