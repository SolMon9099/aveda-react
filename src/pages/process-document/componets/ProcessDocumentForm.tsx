import { LoadingButton } from "@mui/lab";
import { Box, Button, Card, CardContent, Stack } from "@mui/material";
import { FormProvider, RHFSelect, RHFTextField, RHFUploadSingleFileSimple,  } from "src/components/hook-form";


export default function ProcessDocumentForm({processDocumentHook}: any){
    return(
        <Card>
            <CardContent>
                <FormProvider methods={processDocumentHook.methods} onSubmit={processDocumentHook.handleSubmit(processDocumentHook.onSubmit)}>
                    <Stack spacing={2}>
                        <RHFUploadSingleFileSimple
                            name='url'
                            onDrop={processDocumentHook.handleDrop}
                        />
                        <RHFSelect
                            name="category"
                            label='Categoria'
                        >
                            {processDocumentHook.CATEGORY_OPTIONS.map((opt: any) =>
                                <option key={'documentCategory_'+opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            )}
                        </RHFSelect>
                        <RHFTextField
                            label='Descrição'
                            name='description'
                        />
                        <Stack direction='row' justifyContent='space-between' spacing={2}>
                            <Box flexGrow={1}/>
                            <Button
                                variant="outlined"
                                color='inherit'
                                onClick={() => processDocumentHook.onCancel()}
                            >
                                Cancelar
                            </Button>
                            <LoadingButton
                                loading={processDocumentHook.isSubmitting}
                                type='submit'
                                variant="contained"
                            >
                                Salvar Arquivo
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </FormProvider> 
            </CardContent>
        </Card>
    )
}