import { LoadingButton } from "@mui/lab"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from "@mui/material"
import { FormProvider, RHFSelect, RHFTextField, RHFSwitch } from "src/components/hook-form"
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete"

type Props = {
    searchTermHook: any
}

export default function SearchTermForm({ searchTermHook }: Props){
    console.log("slskdoijlsdksdf===", searchTermHook.itemToEdit)
    return(
        <Card>
            <CardContent>
                <FormProvider methods={searchTermHook.methods} onSubmit={searchTermHook.handleSubmit(searchTermHook.onSubmit)}>
                    <Box flexGrow={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant='h6'>
                                    Pessoa Jurídica
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="coperateName"
                                    label='Razão Social'
                                    value={searchTermHook.itemToEdit?.name}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <RHFTextField
                                    name="CNPJ"
                                    label='CNPJ'
                                    value={searchTermHook.itemToEdit?.CPFOrCNPJ}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFAutoComplete
                                    name="searchScope"
                                    label='Abrangência da Busca'
                                    multiple
                                    value={searchTermHook?.SEARCHSCOPE_OPTIONS}
                                    options={searchTermHook?.SEARCHSCOPE_OPTIONS}
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
                                    options={searchTermHook.RECIPIENT_OPTIONS}
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
                                <RHFSwitch
                                    label='Pesquisa Inativada'
                                    name="inactiveSearch"
                                ></RHFSwitch>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={2} direction='row'>
                                    <Box flexGrow={1}/>
                                    <Button
                                        variant="outlined"
                                        color='inherit'
                                        onClick={() => searchTermHook.onCancel()}
                                    >
                                        Cancelar
                                    </Button>
                                    <LoadingButton
                                        loading={searchTermHook.isSubmitting}
                                        type='submit'
                                        variant='contained'
                                    >
                                        {searchTermHook.isEdit ? 'Salvar' : 'Pesquisar'}
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