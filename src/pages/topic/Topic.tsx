import { Box, Button, CircularProgress, Container, Stack, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import CardPost from "src/components/post/CardPost";
import { useSelector } from "src/redux/store";
import TopicTabs from "./components/TopicTabs";
import useTopic from "./hooks/Topic.hook";
import { useNavigate } from "react-router-dom"
import { PATH_FORUM } from "src/routes/paths"

export default function Topic(){
    const { topicHook } = useTopic()
    const { topicPosts, topicPostsPagination, selectedTopic, isLoading } = useSelector((state) => state.topic)
    const navigate = useNavigate()
    return(
        <Page title="Tópico">
            <Container maxWidth='md' sx={{ mt: 3 }}>
                {isLoading ?
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box> 
                    :
                    <Stack spacing={3}>
                        <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between'>
                            <Stack spacing={1} direction='row' alignItems='center'>
                                <Box width={25} height={25} sx={{ color: (theme) => theme.palette.action.disabled }}>
                                    <Iconify icon='ri:price-tag-3-line' width={25} height={25}/>
                                </Box>
                                <Typography variant='h4'>
                                    {selectedTopic?.name}
                                </Typography>
                            </Stack>
                            <Button variant="contained" onClick={() => topicHook.goToNewPost() }>
                                Criar Publicação
                            </Button>
                        </Stack>
                        <TopicTabs topicHook={topicHook}/>
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={topicHook.handleGetMorePosts}
                            hasMore={!!topicPostsPagination?.nextCursor}
                            loader={
                                <Box mt={2} display='flex' alignItems='center' justifyContent='center' >
                                    <CircularProgress/>
                                </Box>
                            }
                        >
                            <Stack spacing={3}>
                                {topicPosts.length === 0 &&
                                    <Stack alignItems={"center"} mt={10}>
                                    <Iconify width={64} height={64} icon="ri-chat-delete-line" color='text.disabled'/>
                                    <Box mt={1}/>
                                    <Typography
                                    variant="h5"
                                    color='text.disabled'
                                    >
                                       Não existem publicações visíveis para você.
                                    </Typography>
                                    <Button
                                    onClick={() => navigate(PATH_FORUM.descobrir)}
                                    >
                                    Descubra novas comunidades!
                                    </Button>
                                    </Stack>
                                }
                                {topicPosts.map((post, idx) =>
                                    <CardPost key={'TOPIC_POST_'+post._id+idx} post={post}/>
                                )}
                            </Stack>
                        </InfiniteScroll>
                    </Stack>
                }
            </Container>
        </Page>
    )
}