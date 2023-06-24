import { LoadingButton } from "@mui/lab";
import { alpha, Box, Button, Chip, Divider, Stack, TextField, Typography, Tabs, Tab } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { FormProvider, RHFEditor, RHFRadioGroup, RHFTextField, RHFUploadSingleFile } from "src/components/hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import { useSelector } from "src/redux/store";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
        {value === index && (
            children
        )}
        </div>
    );
}

export default function NewLiveForm({newPostHook}: any){
    const { localOptions, topicOptions } = useSelector((state) => state.newPost)
    const watchIsPanda = newPostHook.watch("isPanda")


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        newPostHook.setValue("isPanda", newValue);
    };
    

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
                            simple
                            images={newPostHook.images}
                            setImages={newPostHook.setImages}
                            links={newPostHook.links}
                            setLinks={newPostHook.setLinks}
                        />
                    </Stack>
        
                    <Divider/>

                    <Tabs value={watchIsPanda} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Live Pública" {...a11yProps(0)} />
                        <Tab label="Live Privada" {...a11yProps(1)} />
                    </Tabs>

                    <TabPanel value={watchIsPanda} index={0}>
                        <RHFTextField
                            name='link'
                            label='Link da Live'
                        />
                    </TabPanel>

                    <TabPanel value={watchIsPanda} index={1}>

                    <RHFTextField
                        name='pandaApiKey'
                        label='Chave de API do PandaVideo'
                        />
                        </TabPanel>
                    <RHFTextField
                        name='duration'
                        type="number"
                        sx={{width:"360px"}}
                        label='Duração Estimada (em minutos)'
                    />

                    <Typography variant='subtitle2' color='text.secondary'>
                        Data da Live
                    </Typography>
                    <RHFRadioGroup
                        name='dateLive'
                        defaultValue={'now'}
                        onChange={(e) => newPostHook.setRadio(e.target.value)}
                        options={newPostHook.radioOptions}
                    />
                    {newPostHook.radio === 'schedule' && 
                      <Stack direction={'row'} paddingLeft={2}>
                        <DatePicker
                            label="Data do Evento"
                            inputFormat="DD/MM/YYYY"
                            value={newPostHook.date}
                            minDate={new Date()}
                            onChange={(val:any) => {
                              newPostHook.setDate(val);
                            }}
                            renderInput={(params:any) => <TextField sx={{width:"180px"}} {...params} />}
                        />
                        <Box ml={1}/>
                        <RHFTextField
                        sx={{width:"180px"}}
                          name='scheduleHour'
                          label='Horário do Evento'
                          type="time"
                          defaultValue={moment(new Date()).format('LT')}
                        />
                      </Stack>
                    }
                    <Stack direction={'column'}>
                        <Typography variant='subtitle2' color='text.secondary'>
                            Imagem da Postagem e Pré Live
                        </Typography>
                        <Box mt={1}/>
                        <Typography variant='subtitle2'>
                            Tamanho recomendado: 1280 x 720px
                        </Typography>
                        <Box mt={1}/>
                        <RHFUploadSingleFile
                            name="thumbnail"    
                            maxFiles={1}
                            file={newPostHook.file}       
                            onDrop={newPostHook.handleDrop}
                            error={newPostHook.errorArquivos}
                        />

                    </Stack>

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