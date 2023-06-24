import { LoadingButton } from "@mui/lab"
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from "@mui/material"
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form"
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete"
import RHFMoneyField from "src/components/hook-form/RHFMoneyField"
import Iconify from "src/components/Iconify"

type Props = {
    processHandleHook: any
}

export default function ProcessForm({ processHandleHook }: Props){
    return(
        <Card>
            <CardContent>
                <FormProvider methods={processHandleHook.methods} onSubmit={processHandleHook.handleSubmit(processHandleHook.onSubmit)}>
                    <Box flexGrow={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={9}>
                                <RHFTextField
                                    name="clientName"
                                    label='Nome Cliente'
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <RHFSelect
                                    name="clientQualify"
                                    label='Qualificação'
                                >
                                    {processHandleHook.QUALIFY_OPTIONS.map((opt: any) =>
                                        <option key={'clientQualify_'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <RHFTextField
                                    name="counterName"
                                    label='Nome Parte Contrária'
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <RHFSelect
                                    name="counterQualify"
                                    label='Qualificação'
                                >
                                    {processHandleHook.QUALIFY_OPTIONS.map((opt: any) =>
                                        <option key={'counterQualify'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="title"
                                    label='Título do Processo'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="folder"
                                    label='Pasta do Processo'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFAutoComplete
                                    name="tags"
                                    label='Etiquetas'
                                    multiple
                                    options={processHandleHook.TAGS_OPTIONS}
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
                            </Grid>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="number"
                                    label='Número do Processo'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFSelect
                                    name="part"
                                    label='Orgão'
                                >
                                    {processHandleHook.PART_OPTIONS.map((opt: any) =>
                                        <option key={'part'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>                            
                            <Grid item xs={12} sm={6}>
                                <RHFSelect
                                    name="action"
                                    label='Tipo de Ação'
                                >
                                    {processHandleHook.ACTION_OPTIONS.map((opt: any) =>
                                        <option key={'action'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RHFSelect
                                    name="matter"
                                    label='Matéria'
                                >
                                    {processHandleHook.MATTER_OPTIONS.map((opt: any) =>
                                        <option key={'matter'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RHFSelect
                                    name="county"
                                    label='Comarca'
                                >
                                    {processHandleHook.COUNTY_OPTIONS.map((opt: any) =>
                                        <option key={'county'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RHFSelect
                                    name="instance"
                                    label='Instância'
                                >
                                    {processHandleHook.INSTANCE_OPTIONS.map((opt: any) =>
                                        <option key={'instance'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RHFSelect
                                    name="phase"
                                    label='Fase'
                                >
                                    {processHandleHook.PHASE_OPTIONS.map((opt: any) =>
                                        <option key={'phase'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="url"
                                    label='URL do Processo'
                                    type='url'
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RHFMoneyField
                                    name="causeValue"
                                    label='Valor da Causa'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    multiline
                                    name="object"
                                    label='Objeto'
                                    rows={3}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    multiline
                                    name="strategy"
                                    label='Estratégia'
                                    rows={3}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    multiline
                                    name="observations"
                                    label='Observações'
                                    rows={3}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFSelect
                                    name="responsible"
                                    label='Responsável'
                                >
                                    {processHandleHook.RESPONSIBLE_OPTIONS.map((opt: any) =>
                                        <option key={'responsible'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12}>
                                <Accordion
                                    sx={{
                                        '&.Mui-expanded':{
                                            boxShadow: 'none',
                                        },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={
                                            <Iconify icon={'eva:arrow-ios-downward-fill'} width={20} height={20} />
                                        }
                                        sx={{
                                            borderBottom: '1px solid',
                                            borderColor: (theme) => alpha(theme.palette.divider, 0.24),
                                            borderRadius: 0
                                        }}
                                    >
                                        <Typography variant="subtitle1">
                                            Informações de Encerramento
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        sx={{ pt: 2, px: 0 }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <RHFSelect
                                                    name="status"
                                                    label='Status'
                                                >
                                                    {processHandleHook.STATUS_OPTIONS.map((opt: any) =>
                                                        <option key={'status'+opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    )}
                                                </RHFSelect>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <RHFTextField
                                                    name="endDate"
                                                    label='Data do Encerramento'
                                                    type='date'
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <RHFSelect
                                                    name="endType"
                                                    label='Tipo do Encerramento'
                                                >
                                                    {processHandleHook.ENDTYPE_OPTIONS.map((opt: any) =>
                                                        <option key={'endType'+opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    )}
                                                </RHFSelect>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <RHFMoneyField
                                                    name="endValue"
                                                    label='Valor Ganho/Perda'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <RHFTextField
                                                    multiline
                                                    rows={3}
                                                    name="endObject"
                                                    label='Objeto de Decisão'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <RHFTextField
                                                    multiline
                                                    rows={3}
                                                    name="endObservations"
                                                    label='Observações'
                                                />
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={2} direction='row'>
                                    <Box flexGrow={1}/>
                                    <Button
                                        variant="outlined"
                                        color='inherit'
                                        onClick={() => processHandleHook.onCancel()}
                                    >
                                        Cancelar
                                    </Button>
                                    <LoadingButton
                                        loading={processHandleHook.isSubmitting}
                                        type='submit'
                                        variant='contained'
                                    >
                                        {processHandleHook.isEdit ? 'Salvar' : 'Cadastrar'}
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </FormProvider>
            </CardContent>
        </Card>
    )
}