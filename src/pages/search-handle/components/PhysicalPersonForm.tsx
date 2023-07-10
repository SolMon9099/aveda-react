import { LoadingButton } from "@mui/lab"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack } from "@mui/material"
import { FormProvider, RHFSelect, RHFTextField } from "src/components/hook-form"
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete"

type Props = {
    searchHandleHook: any
}

export default function CaseForm({ searchHandleHook }: Props){
    return(
        <Card>
            <CardContent>
                <FormProvider methods={searchHandleHook.methods} onSubmit={searchHandleHook.handleSubmit(searchHandleHook.onSubmit)}>
                    <Box flexGrow={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="clientName"
                                    label='Nome completo'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <RHFTextField
                                    name="OABNumber"
                                    label='Número da OAB'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <RHFSelect
                                    name="sectional"
                                    label='Seccional'
                                >
                                    {searchHandleHook.SECTIONAL_OPTIONS.map((opt: any) =>
                                        <option key={'sectional'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>
                            <Grid item xs={6}>
                                <RHFTextField
                                    name="CPF"
                                    label='CPF'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFAutoComplete
                                    name="matter"
                                    label='Matéria'
                                    multiple
                                    options={searchHandleHook.MATTER_OPTIONS}
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
                                <RHFAutoComplete
                                    name="searchScope"
                                    label='Abrangência da Busca'
                                    multiple
                                    options={searchHandleHook?.SEARCHSCOPE_OPTIONS}
                                    renderTags={(value: any, getTagProps: any) =>
                                        value?.map((option: any, index: any) => (
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
                                <RHFAutoComplete
                                    name="recipient"
                                    label='Destinatários da Pesquisa'
                                    multiple
                                    options={searchHandleHook.RECIPIENT_OPTIONS}
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
                                <Stack spacing={2} direction='row'>
                                    <Box flexGrow={1}/>
                                    <Button
                                        variant="outlined"
                                        color='inherit'
                                        onClick={() => searchHandleHook.onCancel()}
                                    >
                                        Cancelar
                                    </Button>
                                    <LoadingButton
                                        loading={searchHandleHook.isSubmitting}
                                        type='submit'
                                        variant='contained'
                                    >
                                        {searchHandleHook.isEdit ? 'Salvar' : 'Pesquisar'}
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