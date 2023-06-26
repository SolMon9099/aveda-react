import { Card, CardContent, Stack, Typography, Box, Button, IconButton, MenuItem, Alert, Grid } from "@mui/material"
import UserAvatar from "src/components/UserAvatar"
import moment from 'moment'
import Label from "src/components/Label"
import TextMaxLine from "src/components/TextMaxLine"
import Image from "src/components/Image"
import PostActions from "./PostActions"
import { feedPostType } from "src/@types/feed"
import usePost from "src/hooks/usePost"
import Markdown from "../Markdown"
import Iconify from '../Iconify'
import useAuth from "src/hooks/useAuth"
import MenuPopover from "../MenuPopover"
import Logo from "../Logo"

type Props = {
    post: feedPostType
}

export default function CardLive({ post }: Props) {
    const { postHook } = usePost(post)
    const { user } = useAuth()
    const today = moment(new Date()).format('LT')
    moment.locale('pt-br')
    moment.updateLocale('pt-br', {
        months: [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
            "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ]
    });
    
    return (
        <Card
            sx={{ borderRadius: 1, '&:hover': { cursor: 'pointer', boxShadow: 'none' }}}
            onClick={() => postHook.handleGoToLive()}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <UserAvatar email={post.author.email} description={post.author.description} photo={post.author.photo} name={post.author.name} sub={moment(post.createdAt).format('DD [de] MMMM')} />
                        {post.author._id === user?._id &&
                            <IconButton
                                onClick={(e) => { e.stopPropagation(); postHook.setOpenPopover(e.currentTarget) }}
                            >
                                <Iconify icon='ic:outline-more-vert' />
                            </IconButton>
                        }
                    </Stack>
                    {((post.author._id === user?._id) && post.isPanda) &&
                        <Alert color="info">
                            Para ver suas chaves de configuração da live entre no post!
                        </Alert>
                    }
                    <TextMaxLine line={1} variant='h6'>
                        {post.title}
                    </TextMaxLine>
                    <Stack direction='row' spacing={1} alignItems='center'>
                        {post.communityPhoto &&
                            <Image src={post.communityPhoto} sx={{ width: 24, height: 24, borderRadius: 0.5 }} />
                        }
                        <Grid container spacing={1}>
                            {post.topics.map((topic, idx) => <Grid item>
                                <Label key={topic.name + post._id + idx} sx={{ borderRadius: 0.5 }} color={topic.isFromCommunity ? 'secondary' : 'default'}>
                                    <Typography variant='caption'>
                                        {topic.name}
                                    </Typography>
                                </Label>
                            </Grid>)}
                        </Grid>
                    </Stack>
                    {/* {post.attachments &&
                            <Box justifyContent='center'>
                            <PostAttatchment attatchments={post.attachments}/>
                            </Box>
                        } */}
                    {post.thumbnail ?
                        <Image src={post.thumbnail} sx={{ borderRadius: 1, height: "364px" }} />
                        :
                        <Box
                            height={364}
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{ backgroundColor: (theme) => theme.palette.grey[300], borderRadius: 1 }}
                        >
                            <Logo purple sx={{ width: 180, height: 50 }} />
                        </Box>
                    }
                    {(post.isLiveNow === 'now') || (post.isLiveNow !== 'finished' && moment(post.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (post.scheduleHour <= today)) ?
                        <Button fullWidth disabled sx={{ backgroundColor: (theme) => theme.palette.error.main, color: (theme) => theme.palette.common.white + ' !important' }}>
                            <Iconify sx={{ width: "20px", height: "20px" }} icon={"mdi:access-point"}></Iconify>
                            <Box ml={1} />
                            <Typography sx={{ textTransform: 'none !important ' }} variant='subtitle2'>
                                Ao vivo
                            </Typography>
                        </Button>
                        :
                        post.isLiveNow === 'finished' ?
                            <Button fullWidth disabled sx={{ backgroundColor: (theme) => theme.palette.grey[800], color: (theme) => theme.palette.common.white + ' !important' }}>
                                <Iconify sx={{ width: "20px", height: "20px" }} icon={"mdi:access-point"}></Iconify>
                                <Box ml={1} />
                                <Typography sx={{ textTransform: 'none !important ' }} variant='subtitle2'>
                                    Realizada em {moment(post.createdAt).format("DD [de] MMMM")}
                                </Typography>
                            </Button>
                            :
                            <Button fullWidth disabled sx={{ backgroundColor: (theme) => theme.palette.grey[800], color: (theme) => theme.palette.common.white + ' !important' }}>
                                <Iconify sx={{ width: "20px", height: "20px" }} icon={"mdi:access-point"}></Iconify>
                                <Box ml={1} />
                                <Typography sx={{ textTransform: 'none !important ' }} variant='subtitle2'>
                                    Ao vivo em {moment(post.date).format("DD [de] MMMM")} - {post.scheduleHour}
                                </Typography>
                            </Button>
                    }
                    <Markdown maxline={3} children={post.body} />
                    <PostActions postHook={postHook} post={post} />
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
                <MenuItem onClick={(e) => { e.stopPropagation(); postHook.handleDelete() }}>
                    Excluir
                </MenuItem>
            </MenuPopover>
        </Card>
    )

}