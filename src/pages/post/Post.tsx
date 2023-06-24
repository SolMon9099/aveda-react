import { Box, Button, Container, Grid, Stack } from "@mui/material";
import AdevaLoading from "src/components/AdevaLoading";
import Page from "src/components/Page";
import useResponsive from "src/hooks/useResponsive";
import { useSelector } from "src/redux/store";
import CardPost from "./components/CardPost";
import CardRelatedPubs from "./components/CardRelatedPubs";
import usePost from "./hooks/Post.hook";
import CardWhoLiked from "./components/CardWhoLiked";


export default function Post(){
    const { relatedPosts, isLoadingPost, isLoadingRelated, likes } = useSelector((state) => state.post)
    const { postHook } = usePost()
    const isDesktop = useResponsive('up', 'lg');

    return(
        <Page title="Publicação">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                {(isLoadingPost || isLoadingRelated) ?
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box> 
                    :
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <CardPost postHook={postHook}/>
                        </Grid>
                        {isDesktop &&
                            <Grid item lg={4}>
                                <Stack spacing={2}>
                                    <Button size="large" variant='contained' onClick={() => postHook.goToNewPost()}>
                                        Criar Publicação
                                    </Button>
                                    {relatedPosts.length > 0 &&
                                        <CardRelatedPubs/>
                                    }
                                    {likes.length > 0 &&
                                        <CardWhoLiked/>
                                    }
                                </Stack>
                            </Grid>
                        }
                    </Grid>
                }
            </Container>
        </Page>
    )
}