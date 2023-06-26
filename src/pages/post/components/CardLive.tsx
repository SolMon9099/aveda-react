import { Alert, Box, Button, Card, CardContent, Dialog, DialogContent, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import moment from "moment";
import Image from "src/components/Image";
import Label from "src/components/Label";
import Markdown from "src/components/Markdown";
import UserAvatar from "src/components/UserAvatar";
import { useSelector } from "src/redux/store";
import CardNewComment from "./CardNewComment";
import Comment from "./Comment";
import { useState } from "react";
import Iconify from 'src/components/Iconify'
import LiveChat from './LiveChat'
import LiveActions from 'src/components/post/LiveActions'
import useLive from "../hooks/Live.hook";
import useResponsive from "src/hooks/useResponsive";
import Logo from "src/components/Logo";
import useAuth from 'src/hooks/useAuth'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function CardLive({ postHook }: any) {
    const { selectedPost } = useSelector((state) => state.post)
    const [openModal, setOpenModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const { liveHook } = useLive()
    const isMobile = useResponsive('down', 'sm');
    const today = moment(new Date()).format('LT')
    const { user } = useAuth();
    const finishLive = () => {
        console.log("FINISHING LIVE...")
        liveHook.handleFinishLive(selectedPost?._id)
        window.location.reload()
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        selectedPost &&
        <Stack direction={isMobile ? 'column' : 'row'}>
            {openModal &&
                <Dialog
                    fullWidth
                    maxWidth='sm'
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                >
                    <DialogContent>
                        <Stack spacing={2}>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='h6'>
                                    Deseja encerrar a Live?
                                </Typography>
                                <IconButton
                                    onClick={() => setOpenModal(false)}
                                >
                                    <Iconify icon='ph:x' />
                                </IconButton>
                            </Stack>
                            <Typography variant='body1'>
                                Não será mais possível escrever no chat após o encerramento. Deseja prosseguir com esta ação?
                            </Typography>
                            <Stack direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2}>
                                <Button variant="outlined" sx={{ color: "#212B36" }} onClick={() => setOpenModal(false)}>Não</Button>
                                <Button variant="contained" sx={{ color: "#FFFFFF" }} onClick={() => finishLive()}>Sim, encerrar</Button>
                            </Stack>
                        </Stack>
                    </DialogContent>
                </Dialog>
            }
            {isMobile ?
                <Stack direction={'column'}>
                    {(selectedPost.isLiveNow === 'now') ||
                        (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') &&
                            (selectedPost.scheduleHour <= today)) || (selectedPost.isPanda) ?
                        <Card sx={{ height: "536px !important", width: '100vw' }}>
                            <iframe
                                allowFullScreen={true}
                                title='livePlayer'
                                style={{ width: '100%', height: '100%', zIndex: 100 }}
                                src={selectedPost.link}
                            />
                        </Card>
                        :
                        selectedPost.thumbnail ?
                            <Image src={selectedPost.thumbnail} sx={{ borderRadius: 1, height: "536px !important", width: '100vw' }} />
                            :
                            <Box
                                height={364}
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                sx={{
                                    backgroundColor: (theme) => theme.palette.grey[300],
                                    borderRadius: 1
                                }}
                            >
                                <Logo purple sx={{ width: 180, height: 50 }} />
                            </Box>
                    }
                    <Card sx={{ width: 'width:"calc(100vw - 445px)' }}>
                        <CardContent>
                            <Stack spacing={2}>
                                {(selectedPost.isLiveNow === 'now') || (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (selectedPost.scheduleHour <= today)) ?
                                    <Button disabled sx={{ width: '292px', heigth: '40px', backgroundColor: (theme) => theme.palette.error.main, color: (theme) => theme.palette.common.white + ' !important' }}>
                                        <Iconify sx={{ width: "20px", height: "20px" }} icon={"mdi:access-point"}></Iconify>
                                        <Box ml={1} />
                                        <Typography sx={{ textTransform: 'none !important ' }} variant='subtitle2'>
                                            Ao vivo
                                        </Typography>
                                    </Button>
                                    :
                                    selectedPost.isLiveNow === 'finished' ?
                                        <Button disabled sx={{ width: '292px', heigth: '40px', backgroundColor: (theme) => theme.palette.grey[800], color: (theme) => theme.palette.common.white + ' !important' }}>
                                            <Iconify sx={{ width: "20px", height: "20px" }} icon={"mdi:access-point"}></Iconify>
                                            <Box ml={1} />
                                            <Typography sx={{ textTransform: 'none !important ' }} variant='subtitle2'>
                                                Realizada em {moment(selectedPost.createdAt).format("DD [de] MMMM")}
                                            </Typography>
                                        </Button>
                                        :
                                        <Button disabled sx={{ width: '292px', heigth: '40px', backgroundColor: (theme) => theme.palette.grey[800], color: (theme) => theme.palette.common.white + ' !important' }}>
                                            <Iconify sx={{ width: "20px", height: "20px" }} icon={"mdi:access-point"}></Iconify>
                                            <Box ml={1} />
                                            <Typography sx={{ textTransform: 'none !important ' }} variant='subtitle2'>
                                                Ao vivo em {moment(selectedPost.date).format("DD [de] MMMM")} - {selectedPost.scheduleHour}
                                            </Typography>
                                        </Button>
                                }
                                {((selectedPost.author._id === user?.id) && selectedPost.isPanda) &&
                                    <Stack direction="column">
                                        <Alert color="info">
                                            <Typography>
                                                Chaves de configuração para criação de live:
                                            </Typography>
                                        </Alert>
                                        <Box mt={2} />
                                        <Stack spacing={1} direction="row">
                                            <TextField disabled fullWidth label={'Servidor'} defaultValue={selectedPost.rtmp}>

                                            </TextField>
                                            {/* <Typography>
                            Servidor:{selectedPost.rtmp}
                            </Typography> */}
                                            <TextField
                                                disabled
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                fullWidth label="Chave de transmissão" defaultValue={selectedPost.stream_key} >
                                            </TextField>
                                        </Stack>
                                    </Stack>
                                }
                                <Typography variant='h6'>
                                    {selectedPost.title}
                                </Typography>
                                <Stack sx={{ width: '100%' }} alignItems="center" justifyContent={'space-between'} direction={'row'}>
                                    <UserAvatar
                                        email={selectedPost.author.email}
                                        name={selectedPost.author.name}
                                        sub={moment(selectedPost.createdAt).format('DD [de] MMMM')}
                                        photo={selectedPost.author.photo}
                                        description={selectedPost.author.description}
                                    />
                                    {(selectedPost.isLiveNow === 'now') || (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (selectedPost.scheduleHour <= today)) ?
                                        <LiveActions postHook={postHook} post={selectedPost} postDetails />
                                        :
                                        <LiveActions withComment postHook={postHook} post={selectedPost} postDetails />
                                    }
                                </Stack>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    {selectedPost.communityPhoto &&
                                        <Image src={selectedPost.communityPhoto} sx={{ width: 24, height: 24, borderRadius: 0.5 }} />
                                    }
                                    <Grid container spacing={1}>
                                        {selectedPost.topics.map((topic, idx) => <Grid item>
                                            <Label key={topic.name + selectedPost._id + idx} sx={{ borderRadius: 0.5 }} color={topic.isFromCommunity ? 'secondary' : 'default'}>
                                                <Typography variant='caption'>
                                                    {topic.name}
                                                </Typography>
                                            </Label>
                                        </Grid>)}
                                    </Grid>
                                </Stack>
                                {(selectedPost.isLiveNow === 'now') || (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (selectedPost.scheduleHour <= today)) ?
                                    <Typography variant='subtitle2' color="grey.600">
                                        Transmitido em {moment(selectedPost.createdAt).format("DD [de] MMMM")}
                                    </Typography>
                                    :
                                    selectedPost.isLiveNow === 'finished' ?
                                        <Typography variant='subtitle2' color="grey.600">
                                            Realizada em  {moment(selectedPost.createdAt).format("DD [de] MMMM")}
                                        </Typography>
                                        :
                                        <Typography variant='subtitle2' color="grey.600">
                                            Programado para {moment(selectedPost.date).format("DD [de] MMMM")} - {selectedPost.scheduleHour}
                                        </Typography>


                                }
                                <Markdown children={selectedPost.body} />
                                {/* {selectedPost.attachments &&
                                  <Box justifyContent='center'>
                                      <PostAttatchment attatchments={selectedPost.attachments}/>
                                  </Box>
                              } */}
                                {/* <PostActions postHook={postHook} post={selectedPost} postDetails/> */}
                                <CardNewComment />
                                {selectedPost.comments.map((comment) =>
                                    <Box key={'PRINCIPAL_COMMENT_' + comment._id} sx={{ bgcolor: (theme) => theme.palette.background.neutral, borderRadius: 1 }}>
                                        <Comment comment={comment} />
                                        {comment.children.map((commentChild) =>
                                            <Comment key={'CHILD_COMMENT_' + commentChild._id} isChild comment={commentChild} />
                                        )}
                                    </Box>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
                :
                <Stack direction={'column'}>
                    {(selectedPost.isLiveNow === 'now') ||
                        (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (selectedPost.scheduleHour <= today))
                        || (selectedPost.isPanda) ?
                        <Card sx={{ height: "536px !important", width: 'calc(100vw - 445px)' }}>
                            <iframe
                                allowFullScreen={true}
                                title='livePlayer'
                                style={{ width: '100%', height: '100%', zIndex: 100 }}
                                src={selectedPost.link}
                            />
                        </Card>
                        :
                        selectedPost.thumbnail ?
                            <Image src={selectedPost.thumbnail} sx={{ borderRadius: 1, height: "536px !important", width: 'calc(100vw - 445px)' }} />
                            :
                            <Box
                                height={364}
                                width='calc(100vw - 445px)'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                sx={{
                                    backgroundColor: (theme) => theme.palette.grey[300],
                                    borderRadius: 1
                                }}
                            >
                                <Logo purple sx={{ width: 180, height: 50 }} disabledLink />
                            </Box>
                    }
                    <Card sx={{ width: 'width:"calc(100vw - 445px)' }}>
                        <CardContent>
                            <Stack spacing={2}>
                                {(selectedPost.isLiveNow === 'now') || (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (selectedPost.scheduleHour <= today)) ?
                                    <Button disabled sx={{ width: '292px', heigth: '40px', backgroundColor: (theme) => theme.palette.error.main, color: (theme) => theme.palette.common.white + ' !important' }}>
                                        <Iconify sx={{ width: "20px", height: "20px" }} icon={"mdi:access-point"}></Iconify>
                                        <Box ml={1} />
                                        <Typography sx={{ textTransform: 'none !important ' }} variant='subtitle2'>
                                            Ao vivo
                                        </Typography>
                                    </Button>
                                    :
                                    selectedPost.isLiveNow === 'finished' ?
                                        <Button disabled sx={{ width: '292px', heigth: '40px', backgroundColor: (theme) => theme.palette.grey[800], color: (theme) => theme.palette.common.white + ' !important' }}>
                                            <Iconify sx={{ width: "20px", height: "20px" }} icon={"mdi:access-point"}></Iconify>
                                            <Box ml={1} />
                                            <Typography sx={{ textTransform: 'none !important ' }} variant='subtitle2'>
                                                Realizada em {moment(selectedPost.createdAt).format("DD [de] MMMM")}
                                            </Typography>
                                        </Button>
                                        :
                                        <Button disabled sx={{ width: '292px', heigth: '40px', backgroundColor: (theme) => theme.palette.grey[800], color: (theme) => theme.palette.common.white + ' !important' }}>
                                            <Iconify sx={{ width: "20px", height: "20px" }} icon={"mdi:access-point"}></Iconify>
                                            <Box ml={1} />
                                            <Typography sx={{ textTransform: 'none !important ' }} variant='subtitle2'>
                                                Ao vivo em {moment(selectedPost.date).format("DD [de] MMMM")} - {selectedPost.scheduleHour}
                                            </Typography>
                                        </Button>
                                }
                                {((selectedPost.author._id === user?.id) && selectedPost.isPanda) &&
                                    <Stack direction="column">
                                        <Alert color="info">
                                            <Typography>
                                                Chaves de configuração para criação de live:
                                            </Typography>
                                        </Alert>
                                        <Box mt={2} />
                                        <Stack spacing={1} direction="row">
                                            <TextField disabled fullWidth label={'Servidor'} defaultValue={selectedPost.rtmp}>

                                            </TextField>
                                            {/* <Typography>
                            Servidor:{selectedPost.rtmp}
                            </Typography> */}
                                            <TextField
                                                disabled
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                fullWidth label="Chave de transmissão" defaultValue={selectedPost.stream_key} >
                                            </TextField>
                                        </Stack>
                                    </Stack>
                                }
                                <Typography variant='h6'>
                                    {selectedPost.title}
                                </Typography>
                                <Stack sx={{ width: '100%' }} alignItems="center" justifyContent={'space-between'} direction={'row'}>
                                    <UserAvatar
                                        email={selectedPost.author.email}
                                        name={selectedPost.author.name}
                                        sub={moment(selectedPost.createdAt).format('DD [de] MMMM')}
                                        photo={selectedPost.author.photo}
                                        description={selectedPost.author.description}
                                    />
                                    {(selectedPost.isLiveNow === 'now') || (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (selectedPost.scheduleHour <= today)) ?
                                        <LiveActions postHook={postHook} post={selectedPost} postDetails />
                                        :
                                        <LiveActions withComment postHook={postHook} post={selectedPost} postDetails />
                                    }
                                </Stack>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    {selectedPost.communityPhoto &&
                                        <Image src={selectedPost.communityPhoto} sx={{ width: 24, height: 24, borderRadius: 0.5 }} />
                                    }
                                    <Grid container spacing={1}>
                                        {selectedPost.topics.map((topic, idx) => <Grid item>
                                            <Label key={topic.name + selectedPost._id + idx} sx={{ borderRadius: 0.5 }} color={topic.isFromCommunity ? 'secondary' : 'default'}>
                                                <Typography variant='caption'>
                                                    {topic.name}
                                                </Typography>
                                            </Label>
                                        </Grid>)}
                                    </Grid>
                                </Stack>
                                {(selectedPost.isLiveNow === 'now') || (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (selectedPost.scheduleHour <= today)) ?
                                    <Typography variant='subtitle2' color="grey.600">
                                        Transmitido em {moment(selectedPost.createdAt).format("DD [de] MMMM")}
                                    </Typography>
                                    :
                                    selectedPost.isLiveNow === 'finished' ?
                                        <Typography variant='subtitle2' color="grey.600">
                                            Realizada em  {moment(selectedPost.createdAt).format("DD [de] MMMM")}
                                        </Typography>
                                        :
                                        <Typography variant='subtitle2' color="grey.600">
                                            Programado para {moment(selectedPost.date).format("DD [de] MMMM")} - {selectedPost.scheduleHour}
                                        </Typography>


                                }
                                <Markdown children={selectedPost.body} />
                                {/* {selectedPost.attachments &&
                            <Box justifyContent='center'>
                                <PostAttatchment attatchments={selectedPost.attachments}/>
                            </Box>
                        } */}
                                {/* <PostActions postHook={postHook} post={selectedPost} postDetails/> */}
                                <CardNewComment />
                                {selectedPost.comments.map((comment) =>
                                    <Box key={'PRINCIPAL_COMMENT_' + comment._id} sx={{ bgcolor: (theme) => theme.palette.background.neutral, borderRadius: 1 }}>
                                        <Comment comment={comment} />
                                        {comment.children.map((commentChild) =>
                                            <Comment key={'CHILD_COMMENT_' + commentChild._id} isChild comment={commentChild} />
                                        )}
                                    </Box>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            }
            <Box mr={5} />

            {(selectedPost.isLiveNow === 'now' && selectedPost.isAuthor) || (selectedPost.isLiveNow !== 'finished' && moment(selectedPost.date).format('MM/DD/YYYY') === moment(new Date()).format('MM/DD/YYYY') && (selectedPost.scheduleHour <= today) && selectedPost.isAuthor) ?
                <Stack direction={'column'}>
                    <Button onClick={() => { setOpenModal(true) }} fullWidth variant="contained" sx={{ color: '#ffffff', backgroundColor: "#FF4842" }}>
                        Encerrar Live
                    </Button>
                    <Box mt={2} />
                    <Box sx={{ width: isMobile ? '100%' : '368px', height: '535px' }}>
                        <LiveChat selectedPost={selectedPost} />
                    </Box>
                </Stack>
                :
                <>
                    {isMobile && <Box mt={2} />}
                    <Box sx={{ width: isMobile ? '100%' : '368px', height: '535px' }}>
                        <LiveChat selectedPost={selectedPost} />
                    </Box>
                </>
            }
        </Stack>
    )
}