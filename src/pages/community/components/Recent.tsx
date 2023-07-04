import CardPost from "src/components/post/CardPost"
import { useSelector } from "src/redux/store"
import InfiniteScroll from "react-infinite-scroller"
import { Box, CircularProgress, Stack } from "@mui/material"
import { feedPostType } from "src/@types/feed"
import useAuth from "src/hooks/useAuth"
import CardLive from "src/components/post/CardLive"

type Props = {
    communityHook: any;
}

export default function Recent({ communityHook }: Props) {
    const { user } = useAuth();
    const { communityPosts, communityPagination, admins } = useSelector((state) => state.community);
    const isCommunityAdm = admins.find((id) => id === user?._id) ? true : false;
    const posts = [...communityPosts];

    const comparePosts = (a: feedPostType, b: feedPostType): number => {
        if (a.isFixed && !b.isFixed) {
            return -1; // `a` é fixado, `b` não é fixado - `a` vem antes de `b`
        } else if (!a.isFixed && b.isFixed) {
            return 1; // `b` é fixado, `a` não é fixado - `b` vem antes de `a`
        } else {
            return 0; // Ambos são fixados ou não são fixados - manter a ordem atual
        }
    }

    return <InfiniteScroll
        pageStart={1}
        loadMore={communityHook.handleGetMorePostsCommunity}
        hasMore={!!communityPagination?.nextCursor}
        loader={
            <Box mt={2} display='flex' alignItems='center' justifyContent='center' >
                <CircularProgress />
            </Box>
        }
    >
        <Stack spacing={2}>
            {posts.sort(comparePosts).map((post: feedPostType, idx: number) => {
                if (post.isLive) {
                    return <CardLive
                        key={`CARD_POST_${post._id}${idx}}`} 
                        post={post} 
                        isCommunityAdm={isCommunityAdm} 
                        fromCommunity={true}
                    />
                } else {
                    return <CardPost 
                        key={`CARD_POST_${post._id}${idx}}`} 
                        post={post} 
                        isCommunityAdm={isCommunityAdm} 
                        fromCommunity={true}
                    />
                }
            })}
        </Stack>
    </InfiniteScroll>
}