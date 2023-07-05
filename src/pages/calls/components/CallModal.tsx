import { LoadingButton } from "@mui/lab";
import { Chip } from "@mui/material";
import { Box, Dialog, DialogContent, Grid, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";

export default function CallModal({ callHook } : any){
    return(
        <Dialog maxWidth='sm' fullWidth open={callHook.openModal} onClose={() => callHook.onClose()}>
            <DialogContent>
                {callHook.viewMode ? (
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <div>
                                <Typography variant='subtitle2'>{callHook.values.type === 'call' ? 'Tarefa' : 'Evento'}</Typography>
                                <Typography variant='h6'>
                                    {callHook.values.name}
                                </Typography>
                            </div>
                            <div className="icons-area">
                                <IconButton
                                    // onClick={() => callHook.onClose()}
                                >
                                    <Iconify width={24} height={24} icon='mi:delete'/>
                                </IconButton>
                                <IconButton
                                    onClick={() => callHook.setViewMode(false)}
                                >
                                    <Iconify width={24} height={24} icon='ic:edit'/>
                                </IconButton>
                                <IconButton
                                    onClick={() => callHook.onClose()}
                                >
                                    <Iconify width={24} height={24} icon='ic:close'/>
                                </IconButton>
                            </div>
                        </Stack>
                        <Stack spacing={2}>
                            <Typography variant='body2' color='text.secondary' fontWeight='500' sx={{background:'#F4F6F8', width:'45%', padding:'5px', borderRadius:'6px'}}>
                                {callHook.values.status === 'toDo' ? 'A Fazer' : callHook.values.status === 'onDoing' ? 'Fazendo' : 'Feito'}
                            </Typography>
                            <Box flexGrow={1}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Descrição</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        <Typography variant='body2' color='text.secondary' fontWeight='500'>
                                            {callHook.values.description}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Processo</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        <Typography variant='body2' color='text.secondary' fontWeight='500'>
                                            {callHook.values.processOrCase}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Etiquetas</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        {callHook.values.tags && callHook.values.tags.map((tag_item:any) => {
                                            return(
                                                <Label variant="filled" color={tag_item.color} sx={{marginRight:'10px'}}>
                                                    {tag_item.title}
                                                </Label>
                                            )
                                        })}
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Responsável</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        {callHook.values.responsible && callHook.values.responsible.map((respon_item:any) => {
                                            return(
                                                <Label sx={{marginRight:'10px'}}>
                                                    {respon_item.label}
                                                </Label>
                                            )
                                        })}
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Data / Hora</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        <Typography fontWeight='500' variant='body2' color='text.secondary'>{callHook.values.date_str}</Typography>
                                    </Grid>

                                    {callHook.values.type === 'event' && (
                                        <>
                                        <Grid item xs={12} sm={4} md={3}>
                                            <Typography variant='body2' color='text.secondary'>Visibilidade</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={8} md={9}>
                                            <Typography fontWeight='500' variant='body2' color='text.secondary'>{callHook.values.visibility}</Typography>
                                        </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Box>
                        </Stack>
                    </Stack>
                ) : (
                    <FormProvider methods={callHook.methods} 
                        // onSubmit={callHook.handleSubmit(callHook.onSubmit)}
                    >
                        <Stack spacing={3}>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='h6'>
                                    Adicionar Atividade
                                </Typography>
                                <div>
                                    {callHook.values && callHook.values.name !== '' && (
                                        <IconButton
                                            onClick={() => callHook.setViewMode(true)}
                                        >
                                            <Iconify width={24} height={24} icon='mdi:eye-outline'/>
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => callHook.onClose()}
                                    >
                                        <Iconify width={24} height={24} icon='ic:close'/>
                                    </IconButton>
                                </div>
                            </Stack>
                            <Stack spacing={2}>
                                <ToggleButtonGroup value={callHook.values.type} color='primary' sx={{ border: 'none' }}>
                                    <ToggleButton value='call' onClick={() => callHook.setValue('type', 'call')}>
                                        Tarefa
                                    </ToggleButton>
                                    <ToggleButton value='event' onClick={() => callHook.setValue('type', 'event')}>
                                        Evento
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <RHFTextField
                                    name='title'
                                    label={callHook.values.type === 'call' ? 'Nome da Tarefa' : 'Nome do Evento'}
                                />
                                {callHook.values.type === 'call' &&
                                    <RHFSelect
                                        name='status'
                                        label='Status'
                                    >
                                        {callHook.STATUS_OPTIONS.map((opt: any) =>
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        )}
                                    </RHFSelect>
                                }
                                <RHFAutoComplete
                                    name="tags"
                                    label='Etiquetas'
                                    multiple
                                    options={callHook.TAGS_OPTIONS}
                                    renderTags={(value: any, getTagProps: any) =>
                                        value.map((option: any, index: any) => (
                                            <Chip
                                                color={option.color}
                                                variant="contained"
                                                label={option.label}
                                                {...getTagProps({ index })}
                                            />
                                        ))
                                    }
                                />
                                {/* <RHFTextField
                                    name='description'
                                    label='Descrição'
                                /> */}
                                
                                <Box flexGrow={1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                type='date'
                                                name='date'
                                                label='Data'
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Stack>
                            <Stack direction='row'>
                                <Box flexGrow={1}/>
                                <LoadingButton
                                    type='submit'
                                    loading={callHook.isSubmitting}
                                    variant='contained'
                                >
                                    Salvar
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </FormProvider>
                )}
            </DialogContent>
        </Dialog>
    )
}