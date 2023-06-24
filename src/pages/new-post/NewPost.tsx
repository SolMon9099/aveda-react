import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import Page from "src/components/Page";
import NewLiveForm from './components/NewLiveForm'
import NewPostForm from "./components/NewPostForm";
import PostTabs from './components/PostTabs'
import useNewPost from "./hooks/NewPost.hook";


export default function NewPost(){
    const { newPostHook } = useNewPost()

    return(
        <Page title="Nova Publicação">
            <Container maxWidth='md' sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <Typography variant='h4'>
                        Nova Publicação
                    </Typography>
                    <PostTabs newPostHook={newPostHook}/>
                    <Card>
                        <CardContent>
                        {newPostHook.currentTab === 1 ?
                            <NewPostForm newPostHook={newPostHook}/>
                            :
                            <NewLiveForm newPostHook={newPostHook}/>
                        }
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
        </Page>
    )
}