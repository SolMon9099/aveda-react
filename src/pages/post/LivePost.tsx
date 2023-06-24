import { Box } from "@mui/material";
import AdevaLoading from "src/components/AdevaLoading";
import Page from "src/components/Page";
import { useSelector } from "src/redux/store";
import usePost from "./hooks/Post.hook";
import CardLive from "./components/CardLive";


export default function LivePost(){
    const { isLoadingPost, isLoadingRelated } = useSelector((state) => state.post)
    const { postHook } = usePost()

    return(
        <Page title="Publicação">
                {(isLoadingPost || isLoadingRelated) ?
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box> 
                    :
                    <CardLive postHook={postHook}/>
                }
        </Page>
    )
}
