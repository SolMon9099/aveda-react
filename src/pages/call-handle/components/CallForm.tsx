import { LoadingButton } from "@mui/lab"
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography, InputAdornment } from "@mui/material"
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
                            <Grid item xs={12} sm={12}>
                                <RHFAutoComplete
                                    name="processOrCase"
                                    label='Processo / Caso'
                                    multiple
                                    freeSolo
                                    options={[
                                        {value: '2021-32550', label: '2021-32550'},
                                        {value: '00076-49.2021.8.16.0169', label: '00076-49.2021.8.16.0169'},
                                    ]}
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
                            <Grid item xs={12} sm={12}>
                                <RHFTextField
                                    InputProps={{
                                        endAdornment:(
                                            <InputAdornment position="end">
                                                <Iconify icon='ri:search-line' width={24} height={24}/>
                                            </InputAdornment>
                                        )
                                    }}
                                    name="client"
                                    label='Nome do Cliente'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RHFTextField
                                    withCount
                                    name="title"
                                    label='Título do Atendimento'
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
                            <Grid item xs={12} sm={6}>
                                <RHFSelect
                                    name="type"
                                    label='Tipo'
                                >
                                    {callHandleHook.ENDTYPE_OPTIONS.map((opt: any) =>
                                        <option key={'part'+opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    )}
                                </RHFSelect>
                            </Grid>                            
                            <Grid item xs={12}>
                                <RHFTextField
                                    name="message"
                                    label='Mensagem'
                                    multiline
                                    rows={3}
                                />
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