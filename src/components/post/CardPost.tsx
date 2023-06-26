import { Card, CardContent, Stack, Typography, Box, IconButton, MenuItem, Grid } from "@mui/material"
import UserAvatar from "src/components/UserAvatar"
import moment from 'moment'
import Label from "src/components/Label"
import TextMaxLine from "src/components/TextMaxLine"
import Image from "src/components/Image"
import PostActions from "./PostActions"
import { feedPostType } from "src/@types/feed"
import PostAttatchment from "./PostAttatchment"
import usePost from "src/hooks/usePost"
import Markdown from "../Markdown"
import CardLive from './CardLive'
import useAuth from "src/hooks/useAuth"
import Iconify from "../Iconify"
import MenuPopover from "../MenuPopover"

type Props = {
    post: feedPostType
}

export default function CardPost({post}: Props){
    const { postHook } = usePost(post)
    const { user } = useAuth()
    
    if(post.isLive){
        return(
            <CardLive post={post}/>
        )
    }else{
        return(
            <Card 
                sx={{  borderRadius: 1, '&:hover':{ cursor:'pointer', boxShadow: 'none' }}}
                onClick={() => postHook.handleGoToPost()}
            >
                <CardContent>
                    <Stack spacing={2}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <UserAvatar email={post.author.email} description={post.author.description} photo={post.author.photo} name={post.author.name} sub={moment(post.createdAt).format('DD [de] MMMM')}/>
                            {post.author._id === user?._id && 
                                <IconButton onClick={(e) => {e.stopPropagation(); postHook.setOpenPopover(e.currentTarget)}}>
                                    <Iconify icon='ic:outline-more-vert'/>
                                </IconButton>
                            }
                        </Stack>
                        <TextMaxLine line={1} variant='h6'>
                            {post.title}
                        </TextMaxLine>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            {post.communityPhoto &&
                                <Image src={post.communityPhoto} sx={{width: 24, height: 24, borderRadius: 0.5}} />
                            }
                            <Grid container spacing={1}>
                                {post.topics.map((topic, idx) => <Grid item>
                                    <Label key={topic.name + post._id + idx} sx={{ borderRadius: 0.5 }} color={topic.isFromCommunity ? 'secondary' : 'default'}>
                                        <Typography variant='caption'>{topic.name}</Typography>
                                    </Label>
                                </Grid>)}
                            </Grid>
                        </Stack>
                        <Markdown maxline={5} children={post.body}/>
                        {post.attachments &&
                            <Box justifyContent='center'>
                                <PostAttatchment attatchments={post.attachments}/>
                            </Box>
                        }
                        <PostActions postHook={postHook} post={post}/>
                    </Stack>
                </CardContent>
                <MenuPopover
                    open={Boolean(postHook.openPopover)}
                    anchorEl={postHook.openPopover}
                    onClose={() => postHook.setOpenPopover(null)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    arrow="right-top"
                    sx={{
                        mt: -1,
                        width: 160,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                            '& svg': { mr: 2, width: 20, height: 20 },
                        },
                    }}
                >
                    <MenuItem onClick={(e) => {e.stopPropagation(); postHook.handleDelete()}}>
                        Excluir
                    </MenuItem>
                </MenuPopover>
            </Card>
        )
    }
}