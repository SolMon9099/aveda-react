import { LoadingButton } from "@mui/lab";
import { Chip } from "@mui/material";
import { Box, Dialog, DialogContent, Grid, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";

export default function TaskModal({ taskHook } : any){
    return(
        <Dialog maxWidth='sm' fullWidth open={taskHook.openModal} onClose={() => taskHook.onClose()}>
            <DialogContent>
                {taskHook.viewMode ? (
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <div>
                                <Typography variant='subtitle2'>{taskHook.values.type === 'task' ? 'Tarefa' : 'Evento'}</Typography>
                                <Typography variant='h6'>
                                    {taskHook.values.name}
                                </Typography>
                            </div>
                            <div className="icons-area">
                                <IconButton
                                    // onClick={() => taskHook.onClose()}
                                >
                                    <Iconify width={24} height={24} icon='mi:delete'/>
                                </IconButton>
                                <IconButton
                                    onClick={() => taskHook.setViewMode(false)}
                                >
                                    <Iconify width={24} height={24} icon='ic:edit'/>
                                </IconButton>
                                <IconButton
                                    onClick={() => taskHook.onClose()}
                                >
                                    <Iconify width={24} height={24} icon='ic:close'/>
                                </IconButton>
                            </div>
                        </Stack>
                        <Stack spacing={2}>
                            <Typography variant='body2' color='text.secondary' fontWeight='500' sx={{background:'#F4F6F8', width:'45%', padding:'5px', borderRadius:'6px'}}>
                                {taskHook.values.status === 'toDo' ? 'A Fazer' : taskHook.values.status === 'onDoing' ? 'Fazendo' : 'Feito'}
                            </Typography>
                            <Box flexGrow={1}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Descrição</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        <Typography variant='body2' color='text.secondary' fontWeight='500'>
                                            {taskHook.values.description}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Processo</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        <Typography variant='body2' color='text.secondary' fontWeight='500'>
                                            {taskHook.values.processOrCase}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Etiquetas</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        {taskHook.values.tags && taskHook.values.tags.map((tag_item:any) => {
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
                                        {taskHook.values.responsible && taskHook.values.responsible.map((respon_item:any) => {
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
                                        <Typography variant='body2' color='text.secondary'>{taskHook.values.date_str}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Stack>
                ) : (
                    <FormProvider methods={taskHook.methods} 
                        // onSubmit={taskHook.handleSubmit(taskHook.onSubmit)}
                    >
                        <Stack spacing={3}>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='h6'>
                                    Adicionar Atividade
                                </Typography>
                                <div>
                                    {taskHook.values && taskHook.values.name !== '' && (
                                        <IconButton
                                            onClick={() => taskHook.setViewMode(true)}
                                        >
                                            <Iconify width={24} height={24} icon='mdi:eye-outline'/>
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => taskHook.onClose()}
                                    >
                                        <Iconify width={24} height={24} icon='ic:close'/>
                                    </IconButton>
                                </div>
                            </Stack>
                            <Stack spacing={2}>
                                <ToggleButtonGroup value={taskHook.values.type} color='primary' sx={{ border: 'none' }}>
                                    <ToggleButton value='task' onClick={() => taskHook.setValue('type', 'task')}>
                                        Tarefa
                                    </ToggleButton>
                                    <ToggleButton value='event' onClick={() => taskHook.setValue('type', 'event')}>
                                        Evento
                                    </ToggleButton>
                                </ToggleButtonGroup>
                                <RHFTextField
                                    name='name'
                                    label={taskHook.values.type === 'task' ? 'Nome da Tarefa' : 'Nome do Evento'}
                                />
                                {taskHook.values.type === 'task' &&
                                    <RHFSelect
                                        name='status'
                                        label='Status'
                                    >
                                        {taskHook.STATUS_OPTIONS.map((opt: any) =>
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
                                    options={taskHook.TAGS_OPTIONS}
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
                                <RHFTextField
                                    name='description'
                                    label='Descrição'
                                />
                                <RHFAutoComplete
                                    multiple
                                    options={taskHook.RESPONSIBLE_OPTIONS}
                                    name='responsible'
                                    label='Responsável'
                                />
                                <Box flexGrow={1}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <RHFTextField
                                                type='date'
                                                name='date'
                                                label='Data'
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <RHFSelect
                                                name='hour'
                                                label='Hora'
                                            >
                                                {taskHook.HOUR_OPTIONS.map((opt: any) =>
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                )}
                                            </RHFSelect>
                                        </Grid>
                                    </Grid>
                                </Box>
                                {taskHook.values.type === 'event' &&
                                    <RHFSelect
                                        name='visibility'
                                        label='Visibilidade do Evento'
                                    >
                                        {taskHook.VISIBILITY_OPTIONS.map((opt: any) =>
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        )}
                                    </RHFSelect>
                                }
                            </Stack>
                            <Stack direction='row'>
                                <Box flexGrow={1}/>
                                <LoadingButton
                                    type='submit'
                                    loading={taskHook.isSubmitting}
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