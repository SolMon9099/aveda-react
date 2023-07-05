import { LoadingButton } from "@mui/lab"
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from "@mui/material"
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form"
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete"
import RHFMoneyField from "src/components/hook-form/RHFMoneyField"
import Iconify from "src/components/Iconify"

type Props = {
    callHandleHook: any
}

export default function CallForm({ callHandleHook }: Props){
    return(
        <Card>
            <CardContent>
                <FormProvider methods={callHandleHook.methods} onSubmit={callHandleHook.handleSubmit(callHandleHook.onSubmit)}>
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
                                    {callHandleHook.QUALIFY_OPTIONS.map((opt: any) =>
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
                                    {callHandleHook.QUALIFY_OPTIONS.map((opt: any) =>
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
                                    options={callHandleHook.TAGS_OPTIONS}
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
                                    {callHandleHook.PART_OPTIONS.map((opt: any) =>
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
                                    {callHandleHook.ACTION_OPTIONS.map((opt: any) =>
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
                                    {callHandleHook.MATTER_OPTIONS.map((opt: any) =>
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
                                    {callHandleHook.COUNTY_OPTIONS.map((opt: any) =>
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
                                    {callHandleHook.INSTANCE_OPTIONS.map((opt: any) =>
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
                                    {callHandleHook.PHASE_OPTIONS.map((opt: any) =>
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
                                    {callHandleHook.RESPONSIBLE_OPTIONS.map((opt: any) =>
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
                                                    {callHandleHook.STATUS_OPTIONS.map((opt: any) =>
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
                                                    {callHandleHook.ENDTYPE_OPTIONS.map((opt: any) =>
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
                                        onClick={() => callHandleHook.onCancel()}
                                    >
                                        Cancelar
                                    </Button>
                                    <LoadingButton
                                        loading={callHandleHook.isSubmitting}
                                        type='submit'
                                        variant='contained'
                                    >
                                        {callHandleHook.isEdit ? 'Salvar' : 'Cadastrar'}
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