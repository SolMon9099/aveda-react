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
                                    name="coperateName"
                                    label='Razão Social'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <RHFTextField
                                    name="CNPJ"
                                    label='CNPJ'
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