import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { FormProvider, RHFEditor, RHFSelect, RHFTextField, RHFUploadMultiFile  } from "src/components/hook-form";


export default function ProcessMovimentationForm({processMovimentationHook, type}: any){
    if (type === 'doc' && processMovimentationHook?.values) {
        processMovimentationHook.values.type = "Documento"
    }
    return(
        <Card>
            <CardContent>
                <FormProvider methods={processMovimentationHook.methods} onSubmit={processMovimentationHook.handleSubmit(processMovimentationHook.onSubmit)}>
                    <Stack spacing={2}>
                        <RHFSelect
                            name='type'
                            label='Tipo de Movimentação'
                            value={processMovimentationHook.values.type}
                        >
                            {processMovimentationHook.TYPE_OPTIONS.map((opt: any) =>
                                <option key={'TYPE_'+opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            )}
                        </RHFSelect>
                        {processMovimentationHook.values.type === 'Documento' ?
                            <RHFUploadMultiFile
                                name='documents'
                                onDrop={processMovimentationHook.handleDrop}
                                onRemove={processMovimentationHook.onRemoveFile}
                            />
                            :
                            <Stack spacing={1}>
                                <Typography variant='subtitle2' color='text.secondary' fontWeight='500'>
                                    Descrição
                                </Typography>
                                <RHFEditor
                                    name='description'
                                    simple
                                />
                            </Stack>
                        }
                        <RHFTextField
                            sx={{
                                width:{
                                    sm: '50%',
                                    xs: '100%'
                                }
                            }}
                            type='date'
                            name="date"
                            label='Data da Movimentação'
                        />
                        <Stack direction='row' justifyContent='space-between' spacing={2}>
                            <Box flexGrow={1}/>
                            <Button
                                variant="outlined"
                                color='inherit'
                                onClick={() => processMovimentationHook.onCancel()}
                            >
                                Cancelar
                            </Button>
                            <LoadingButton
                                loading={processMovimentationHook.isSubmitting}
                                type='submit'
                                variant="contained"
                            >
                                Adicionar
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </FormProvider> 
            </CardContent>
        </Card>
    )
}