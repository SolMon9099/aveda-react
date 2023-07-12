import { LoadingButton } from "@mui/lab";
import { Chip } from "@mui/material";
import { Box, Dialog, DialogContent, Grid, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";

export default function TaskModal({ calendarHook } : any){
    return(
        <Dialog maxWidth='sm' fullWidth open={calendarHook.openModal} onClose={() => calendarHook.onClose()}>
            <DialogContent>
                {calendarHook.viewMode ? (
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <div>
                                <Typography variant='subtitle2'>{calendarHook.values.type === 'task' ? 'Tarefa' : 'Evento'}</Typography>
                                <Typography variant='h6'>
                                    {calendarHook.values.name}
                                </Typography>
                            </div>
                            <div className="icons-area">
                                <IconButton
                                    onClick={() => calendarHook.handleDeleteEvent()}
                                >
                                    <Iconify width={24} height={24} icon='mi:delete'/>
                                </IconButton>
                                <IconButton
                                    onClick={() => calendarHook.setViewMode(false)}
                                >
                                    <Iconify width={24} height={24} icon='ic:edit'/>
                                </IconButton>
                                <IconButton
                                    onClick={() => calendarHook.onClose()}
                                >
                                    <Iconify width={24} height={24} icon='ic:close'/>
                                </IconButton>
                            </div>
                        </Stack>
                        <Stack spacing={2}>
                            <Typography variant='body2' color='text.secondary' fontWeight='500' sx={{background:'#F4F6F8', width:'45%', padding:'5px', borderRadius:'6px'}}>
                                {calendarHook.values.status === 'toDo' ? 'A Fazer' : calendarHook.values.status === 'onDoing' ? 'Fazendo' : 'Feito'}
                            </Typography>
                            <Box flexGrow={1}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Descrição</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        <Typography variant='body2' color='text.secondary' fontWeight='500'>
                                            {calendarHook.values.description}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Processo</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        <Typography variant='body2' color='text.secondary' fontWeight='500'>
                                            {calendarHook.values.processOrCase}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={3}>
                                        <Typography variant='body2' color='text.secondary'>Etiquetas</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} md={9}>
                                        {calendarHook.values.tags && calendarHook.values.tags.map((tag_item:any) => {
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
                                        {calendarHook.values.responsible && calendarHook.values.responsible.map((respon_item:any) => {
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
                                        <Typography fontWeight='500' variant='body2' color='text.secondary'>{calendarHook.values.date_str}</Typography>
                                    </Grid>

                                    {calendarHook.values.type === 'event' && (
                                        <>
                                        <Grid item xs={12} sm={4} md={3}>
                                            <Typography variant='body2' color='text.secondary'>Visibilidade</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={8} md={9}>
                                            <Typography fontWeight='500' variant='body2' color='text.secondary'>{calendarHook.values.visibility}</Typography>
                                        </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Box>
                        </Stack>
                    </Stack>
                ) : (
                    <FormProvider methods={calendarHook.methods} 
                        onSubmit={calendarHook.handleSubmit(calendarHook.onSubmit)}
                    >
                        <Stack spacing={3}>
                            <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography variant='h6'>
                                    Adicionar Evento
                                </Typography>
                                <div>
                                    {calendarHook.values && calendarHook.values.name !== '' && (
                                        <IconButton
                                            onClick={() => calendarHook.setViewMode(true)}
                                        >
                                            <Iconify width={24} height={24} icon='mdi:eye-outline'/>
                                        </IconButton>
                                    )}
                                    <IconButton
                                        onClick={() => calendarHook.onClose()}
                                    >
                                        <Iconify width={24} height={24} icon='ic:close'/>
                                    </IconButton>
                                </div>
                            </Stack>
                            <Stack spacing={2}>
                                <RHFTextField
                                    name='name'
                                    label={calendarHook.values.type === 'task' ? 'Nome da Tarefa' : 'Nome do Evento'}
                                />
                                {calendarHook.values.type === 'task' &&
                                    <RHFSelect
                                        name='status'
                                        label='Status'
                                    >
                                        {calendarHook.STATUS_OPTIONS.map((opt: any) =>
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        )}
                                    </RHFSelect>
                                }
                                <RHFTextField
                                    multiline
                                    rows={3}
                                    name='description'
                                    label='Descrição'
                                />
                                <RHFAutoComplete
                                    name="tags"
                                    label='Etiquetas'
                                    multiple
                                    options={calendarHook.TAGS_OPTIONS}
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
                                <RHFAutoComplete
                                    multiple
                                    options={calendarHook.RESPONSIBLE_OPTIONS}
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
                                                {calendarHook.HOUR_OPTIONS.map((opt: any) =>
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                )}
                                            </RHFSelect>
                                        </Grid>
                                    </Grid>
                                </Box>
                                {calendarHook.values.type === 'event' &&
                                    <RHFSelect
                                        name='visibility'
                                        label='Visibilidade do Evento'
                                    >
                                        {calendarHook.VISIBILITY_OPTIONS.map((opt: any) =>
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
                                    loading={calendarHook.isSubmitting}
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