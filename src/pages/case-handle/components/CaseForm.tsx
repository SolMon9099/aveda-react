import { LoadingButton } from "@mui/lab"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack } from "@mui/material"
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form"
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete"

type Props = {
    caseHandleHook: any
}

export default function CaseForm({ caseHandleHook }: Props){
    return(
        <Card>
            <CardContent>
                <FormProvider methods={caseHandleHook.methods} onSubmit={caseHandleHook.handleSubmit(caseHandleHook.onSubmit)}>
                    <Box flexGrow={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="clientName"
                                    label='Nome Cliente'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="title"
                                    label='Título do Caso'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="folder"
                                    label='Pasta do Caso'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    disabled
                                    name="number"
                                    label='Número Automático do Caso'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFAutoComplete
                                    name="tags"
                                    label='Etiquetas'
                                    multiple
                                    options={caseHandleHook.TAGS_OPTIONS}
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
                            <Grid item xs={12} sm={6}>
                                <RHFSelect
                                    name="matter"
                                    label='Matéria'
                                >
                                    {caseHandleHook.MATTER_OPTIONS.map((opt: any) =>
                                        <option key={'matter'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
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
                                    {caseHandleHook.RESPONSIBLE_OPTIONS.map((opt: any) =>
                                        <option key={'responsible'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={2} direction='row'>
                                    <Box flexGrow={1}/>
                                    <Button
                                        variant="outlined"
                                        color='inherit'
                                        onClick={() => caseHandleHook.onCancel()}
                                    >
                                        Cancelar
                                    </Button>
                                    <LoadingButton
                                        loading={caseHandleHook.isSubmitting}
                                        type='submit'
                                        variant='contained'
                                    >
                                        {caseHandleHook.isEdit ? 'Salvar' : 'Cadastrar'}
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