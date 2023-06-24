import { LoadingButton } from "@mui/lab";
import { alpha, Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { FormProvider, RHFEditor, RHFTextField } from "src/components/hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import { useSelector } from "src/redux/store";


export default function NewPostForm({newPostHook}: any){
    const { localOptions, topicOptions } = useSelector((state) => state.newPost)
    return(
            <FormProvider methods={newPostHook.methods} onSubmit={newPostHook.handleSubmit(newPostHook.onSubmit)}>
                <Stack spacing={3}>
                    <RHFTextField
                        name='title'
                        label='Título da Publicação'
                        withCount
                    />
                    <Stack spacing={1}>
                        <Typography variant='subtitle2' color='text.secondary'>
                            Mensagem
                        </Typography>
                        <RHFEditor
                            name='body'
                            images={newPostHook.images}
                            setImages={newPostHook.setImages}
                            links={newPostHook.links}
                            setLinks={newPostHook.setLinks}
                        />
                    </Stack>
        
                    <Divider/>
        
                    <RHFAutoComplete
                        name='local'
                        multiple
                        options={localOptions}
                        label='Local da Postagem'
                        renderTags={(value: any, getTagProps: any) =>
                            value.map((option: any, index: any) => (
                                <Chip
                                    key={option.value+index}
                                    sx={{
                                        bgcolor: (theme) => option.value === 'forum' ? null : alpha(theme.palette.secondary.main, 0.12)
                                    }}
                                    label={option.label}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                    />
    
                    <RHFAutoComplete
                        name='topics'
                        multiple
                        options={topicOptions}
                        label='Tópicos'
                        renderTags={(value: any, getTagProps: any) =>
                            value.map((option: any, index: any) => (
                                <Chip
                                    key={option.value+index}
                                    sx={{
                                        bgcolor: (theme) => option.fromCommunity ? alpha(theme.palette.secondary.main, 0.12) : null  
                                    }}
                                    label={option.label}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                    />
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <Box flexGrow={1}/>
                        <Button variant="outlined" color="inherit" onClick={() => newPostHook.onCancel()}>
                            Descartar
                        </Button>
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={newPostHook.isSubmitting}
                        >
                            Postar
                        </LoadingButton>
                    </Stack>
                </Stack>
            </FormProvider>
    )
}