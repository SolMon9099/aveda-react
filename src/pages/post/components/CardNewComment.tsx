import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, Stack, TextField } from "@mui/material";
import { FormProvider, RHFEditor } from "src/components/hook-form";
import MyAvatar from "src/components/MyAvatar";
import useComment from "../hooks/Comment.hook";


export default function CardNewComment(){
    const { commentHook } = useComment(null)

    return(
        <Card sx={{backgroundColor: (theme) => theme.palette.background.neutral, boxShadow: 'none'}}>
            <FormProvider methods={commentHook.methods} onSubmit={commentHook.handleSubmit(commentHook.onSubmit)}>
                <Stack spacing={2} direction='row' sx={{padding: 2, width: '100%'}} alignItems={commentHook.show ? undefined : 'center'}>
                    <MyAvatar sx={{width: 36, height: 36}}/>
                    {commentHook.show ?
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
                        :
                        <TextField
                            sx={{
                                backgroundColor: (theme) => theme.palette.background.default,
                                borderRadius: 1,
                                '.MuiOutlinedInput-input':{
                                    cursor: 'text'
                                }
                            }}
                            onClick={() => commentHook.handleShow()}
                            size="small"
                            fullWidth
                            disabled
                            label='Escrever um Comentário...'
                        />
                    }
                </Stack>
            </FormProvider>
        </Card>
    )
}