import { Box, Button, Container, Stack, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import CardERP from "src/components/CardERP";
import Page from "src/components/Page";
import useResponsive from "src/hooks/useResponsive";
import { resetCommunity } from "src/redux/slices/community";
import { resetTopic } from "src/redux/slices/topic";
import { useSelector, useDispatch } from "src/redux/store";
import { PATH_FORUM } from "src/routes/paths";
import CommentedPubs from "./components/CommentedPubs";
import MyPostTabs from "./components/MyPostsTabs";
import MyPubs from "./components/MyPubs";
import useMyPosts from "./hooks/MyPosts.hook";


export default function MyPosts(){
    const { myPostsHook } = useMyPosts()
    const { isLoading } = useSelector((state) => state.myPosts)
    const isDesktop = useResponsive('up', 'lg')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return(
        <Page title="Meus Posts">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
                {isLoading ?
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box> 
                    :
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={8}>
                            <Stack spacing={3}>
                                <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between'>
                                    <Typography variant='h4'>
                                        Meus Posts
                                    </Typography>
                                    <Button variant="contained" onClick={() => { dispatch(resetTopic()); dispatch(resetCommunity()); navigate(PATH_FORUM.novoPost) }}>
                                        Criar Publicação
                                    </Button>
                                </Stack>
                                <MyPostTabs myPostsHook={myPostsHook}/>
                                {myPostsHook.currentTab === 1 ?
                                    <MyPubs myPostsHook={myPostsHook}/>
                                    :
                                    <CommentedPubs myPostsHook={myPostsHook}/>
                                }
                            </Stack>
                        </Grid>
                        {isDesktop &&
                            <Grid item lg={4}>
                                <CardERP banner/>
                            </Grid>
                        }
                    </Grid>
                }
            </Container>
        </Page>
    )
}