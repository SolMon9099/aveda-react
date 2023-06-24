import { Box, Card, CardContent, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import moment from "moment";
import Iconify from "src/components/Iconify";
import Image from "src/components/Image";
import Label from "src/components/Label";
import Markdown from "src/components/Markdown";
import MenuPopover from "src/components/MenuPopover";
import PostActions from "src/components/post/PostActions";
import PostAttatchment from "src/components/post/PostAttatchment";
import UserAvatar from "src/components/UserAvatar";
import useAuth from "src/hooks/useAuth";
import { useSelector } from "src/redux/store";
import CardNewComment from "./CardNewComment";
import Comment from "./Comment";


export default function CardPost({postHook}: any){
    const { user } = useAuth()
    const { selectedPost } = useSelector((state) => state.post)

    return(
        selectedPost &&
        <Card>
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <UserAvatar 
                            email={selectedPost.author.email}
                            photo={selectedPost.author.photo} 
                            name={selectedPost.author.name} 
                            sub={moment(selectedPost.createdAt).format('DD [de] MMMM')}
                            description={selectedPost.author.description} 
                        />
                        {(selectedPost.author._id === user?._id) && 
                            <IconButton
                                onClick={(e) => {e.stopPropagation(); postHook.setOpenPopover(e.currentTarget)}}
                            >
                                <Iconify icon='ic:outline-more-vert'/>
                            </IconButton>
                        }
                    </Stack>
                    <Typography variant='h6'>
                        {selectedPost.title}
                    </Typography>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        {selectedPost.communityPhoto &&
                            <Image src={selectedPost.communityPhoto} sx={{width: 24, height: 24, borderRadius: 0.5}} />
                        }
                        {selectedPost.topics.map((topic, idx)=>
                            <Label key={topic.name + selectedPost._id + idx} sx={{ borderRadius: 0.5 }} color={topic.isFromCommunity ? 'secondary' : 'default'}>
                                <Typography variant='caption'>
                                    {topic.name}
                                </Typography>
                            </Label>
                        )}
                    </Stack>
                    <Markdown children={selectedPost.body}/>
                    {selectedPost.attachments &&
                        <Box justifyContent='center'>
                            <PostAttatchment attatchments={selectedPost.attachments}/>
                        </Box>
                    }
                    <PostActions postHook={postHook} post={selectedPost} postDetails/>
                    <CardNewComment/>
                    {selectedPost.comments.map((comment) =>
                        <Box key={'PRINCIPAL_COMMENT_'+comment._id} sx={{bgcolor: (theme) => theme.palette.background.neutral, borderRadius: 1}}>
                            <Comment comment={comment}/>
                            {comment.children.map((commentChild) =>
                                <Comment key={'CHILD_COMMENT_'+commentChild._id} isChild comment={commentChild}/>
                            )}
                        </Box>
                    )}
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
                <MenuItem
                    onClick={(e) => {e.stopPropagation(); postHook.handleDelete()}}
                >
                    Excluir
                </MenuItem>
            </MenuPopover>
        </Card>
    )
}