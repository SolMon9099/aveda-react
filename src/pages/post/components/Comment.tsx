import { LoadingButton } from "@mui/lab";
import { IconButton, Stack, Typography, Button, Box, MenuItem } from "@mui/material";
import moment from "moment";
import { commentType, commentChildrenType } from "src/@types/post"
import { FormProvider, RHFEditor } from "src/components/hook-form";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import Markdown from "src/components/Markdown";
import MenuPopover from "src/components/MenuPopover";
import PostAttatchment from "src/components/post/PostAttatchment";
import UserAvatar from "src/components/UserAvatar";
import useAuth from "src/hooks/useAuth";
import { useSelector } from "src/redux/store";
import useComment from "../hooks/Comment.hook";

type Props = {
    comment: commentType | commentChildrenType;
    isChild?: boolean
}

export default function Comment({comment, isChild}: Props){
    const { user } = useAuth()
    const { commentHook } = useComment(comment)
    const { selectedPost } = useSelector((state) => state.post)

    return(
        <Stack spacing={2} sx={{ p:2, ml: isChild ? 6 : 0 }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <UserAvatar 
                    email={comment.author.email} 
                    name={comment.author.name} 
                    photo={comment.author.photo} 
                    description={comment.author.description} 
                    isRow 
                    subNode={
                        <Stack direction='row' alignItems='center' spacing={0.5}>
                            {selectedPost?.author._id === comment.author._id &&
                                <Label color="secondary">
                                    Autor
                                </Label>
                            }
                            <Typography variant='caption' color='text.secondary'>
                                {'•'}  {moment(comment.createdAt).fromNow()}
                            </Typography>
                        </Stack>
                    }
                />
                {(selectedPost?.author._id === user?._id || comment.author._id === user?._id) && 
                    <IconButton
                        onClick={(e) => {e.stopPropagation(); commentHook.setOpenPopover(e.currentTarget)}}
                    >
                        <Iconify icon='ic:outline-more-vert'/>
                    </IconButton>
                }
            </Stack>
            
            <Markdown children={comment.body}/>
            {comment.attachments?.length > 0 &&
                <Box justifyContent='center'>
                    <PostAttatchment attatchments={comment.attachments}/>
                </Box>
            }
            <Stack direction='row' alignItems='center' spacing={2}>
                <Stack direction='row' alignItems='center'>
                    <IconButton 
                        sx={{color: (theme) => commentHook.liked ? theme.palette.primary.main : null}}
                        onClick={() => commentHook.handleLike(comment._id)}
                    >
                        <Iconify icon={commentHook.liked ? 'mdi:like' : 'mdi:like-outline'}/>
                    </IconButton>
                    <Typography color='text.secondary' fontWeight='medium' variant='subtitle2'>
                        {commentHook.likeCount} 
                    </Typography>
                </Stack>
                <Button 
                    sx={{ 
                        color: (theme) => theme.palette.text.secondary, 
                        '&:hover':{bgcolor: 'transparent'} 
                    }}
                    onClick={() => commentHook.handleShow()}
                >
                    Responder
                </Button>
            </Stack>
                {commentHook.show &&
                    <FormProvider methods={commentHook.methods} onSubmit={commentHook.handleSubmit(commentHook.onSubmit)}>
                        <Box flexGrow={1}>
                            <RHFEditor
                                name='body'
                                simple
                                images={commentHook.images}
                                setImages={commentHook.setImages}
                                links={commentHook.links}
                                setLinks={commentHook.setLinks}
                                sx={{
                                    // @ts-ignore
                                    backgroundColor: (theme: any) => theme.palette.background.default,
                                    width: '100%',
                                }}
                            />
                            <Stack direction='row' spacing={2}>
                                <Box flexGrow={1}/>
                                <Button color='inherit' onClick={() => commentHook.onCancel()}>
                                    Descartar
                                </Button>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    loading={commentHook.isSubmitting}
                                >
                                    Postar
                                </LoadingButton>
                            </Stack>
                        </Box>
                    </FormProvider>
                }
            <MenuPopover
                open={Boolean(commentHook.openPopover)}
                anchorEl={commentHook.openPopover}
                onClose={() => commentHook.setOpenPopover(null)}
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
                    onClick={(e) => {e.stopPropagation(); commentHook.handleDelete(comment._id)}}
                >
                    Excluir
                </MenuItem>
            </MenuPopover>
        </Stack>
    )
}