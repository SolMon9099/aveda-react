import { LoadingButton } from "@mui/lab";
import { Chip } from "@mui/material";
import { Box, Dialog, DialogContent, Grid, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import Iconify from "src/components/Iconify";


export default function ActivityModal({ activitiesListHook } : any){
    return(
        <Dialog maxWidth='sm' fullWidth open={activitiesListHook.openModal} onClose={() => activitiesListHook.onClose()}>
            <DialogContent>
                <FormProvider methods={activitiesListHook.methods} onSubmit={activitiesListHook.handleSubmit(activitiesListHook.onSubmit)}>
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='h6'>
                                Adicionar Atividade
                            </Typography>
                            <IconButton
                                onClick={() => activitiesListHook.onClose()}
                            >
                                <Iconify width={18} height={18} icon='ph:x'/>
                            </IconButton>
                        </Stack>
                        <Stack spacing={2}>
                            <ToggleButtonGroup value={activitiesListHook.values.type} color='primary' sx={{ border: 'none' }}>
                                <ToggleButton value='task' onClick={() => activitiesListHook.setValue('type', 'task')}>
                                    Tarefa
                                </ToggleButton>
                                <ToggleButton value='event' onClick={() => activitiesListHook.setValue('type', 'event')}>
                                    Evento
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <RHFTextField
                                name='name'
                                label={activitiesListHook.values.type === 'task' ? 'Nome da Tarefa' : 'Nome do Evento'}
                            />
                            {activitiesListHook.values.type === 'task' &&
                                <RHFSelect
                                    name='status'
                                    label='Status'
                                >
                                    {activitiesListHook.STATUS_OPTIONS.map((opt: any) =>
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
                                options={activitiesListHook.TAGS_OPTIONS}
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
                                options={activitiesListHook.RESPONSIBLE_OPTIONS}
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
                                            {activitiesListHook.HOUR_OPTIONS.map((opt: any) =>
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            )}
                                        </RHFSelect>
                                    </Grid>
                                </Grid>
                            </Box>
                            {activitiesListHook.values.type === 'event' &&
                                <RHFSelect
                                    name='visibility'
                                    label='Visibilidade do Evento'
                                >
                                    {activitiesListHook.VISIBILITY_OPTIONS.map((opt: any) =>
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
                                loading={activitiesListHook.isSubmitting}
                                variant='contained'
                            >
                                Salvar
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}