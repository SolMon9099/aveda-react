import { Grid, IconButton, Stack, Typography, Box, Tooltip } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import { feedPostType } from "src/@types/feed";
import { postDetailType } from "src/@types/post";
import Iconify from "src/components/Iconify";
import { BASE_URL } from "src/config";
import { PATH_FORUM } from "src/routes/paths";

type Props = {
    post: feedPostType | postDetailType,
    postHook: any,
    postDetails?: boolean
}

export default function PostActions({post, postHook, postDetails = false}: Props){
    return(
        <Box flexGrow={1} id='box_da_mutreta' onClick={(e) => e.stopPropagation()}>
            <Grid container alignItems='center'>
                <Stack direction='row' spacing={2} sx={{ mr: 2 }}>
                    <Stack direction='row' alignItems='center'>
                        <IconButton
                            sx={{color: (theme) => postHook.liked ? theme.palette.primary.main : null, borderRadius:'10% !important'}}
                            onClick={(e) => {e.stopPropagation(); postHook.handleLike()}}
                        >
                            <Iconify icon={postHook.liked ? 'mdi:like' : 'mdi:like-outline'}/>
                            <Box ml={1} />
                        <Typography color='text.secondary' fontWeight='medium' variant='subtitle2'>
                            {postHook.likeCount === 1 ? `${postHook.likeCount} Curtida` : `${postHook.likeCount} Curtidas`} 
                        </Typography>
                        </IconButton>
                    </Stack>
                    <Stack direction='row' alignItems='center'>
                        <IconButton
                            disabled={!!postDetails}
                            sx={{color: (theme) => theme.palette.text.secondary + ' !important', borderRadius:'10% !important'}}
                            onClick={(e) => {e.stopPropagation(); postHook.handleGoToPost()}}
                        >
                            <Iconify icon='ri:chat-1-line'/>
                            <Box ml={1} />
                        <Typography color='text.secondary' fontWeight='medium' variant='subtitle2'>
                            
                            {// @ts-ignore 
                            (post.commentCount === 0 || post.commentCount) ?
                            // @ts-ignore
                            post.commentCount === 1 ? `${post.commentCount} Comentário` : `${post.commentCount} Comentários`
                            :
                            post.comments === 1 ? `${post.comments} Comentário` : `${post.comments} Comentários`
                        } 
                        </Typography>
                        </IconButton>
                    </Stack>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <IconButton 
                        sx={{color: (theme) => postHook.saved ? theme.palette.primary.main : null}}
                        onClick={(e) => {e.stopPropagation(); postHook.handleSave()}}
                    >
                        <Iconify icon={postHook.saved ? 'material-symbols:bookmark' : 'ic:baseline-bookmark-border'}/>
                    </IconButton>
                    <CopyToClipboard
                        text={BASE_URL+PATH_FORUM.post+post._id}
                        onCopy={() => {document.getElementById('box_da_mutreta')?.click(); postHook.handleCopy()}}
                    >
                        <Tooltip title="Copiar Link do Post">
                            <IconButton>
                                <Iconify icon='mdi:link-variant'/>
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                </Stack>
            </Grid>
        </Box>
    )
}