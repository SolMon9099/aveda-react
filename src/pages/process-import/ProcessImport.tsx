import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { PATH_ERP } from "src/routes/paths";
import ProcessImportForm from "./components/ProcessImportForm";
import useProcessImport from "./hooks/ProcessImport.hook";


export default function ProcessImport(){
    const navigate = useNavigate()
    const { processImportHook } = useProcessImport()
    
    return(
        <Page title='Importar Processos'>
            <Container maxWidth='md' sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <IconButton color="primary" onClick={() => processImportHook.step === 0 ? navigate(PATH_ERP.process) : processImportHook.setStep(0)}>
                            <Iconify icon='material-symbols:arrow-back'/>
                        </IconButton>
                        <Typography variant='h4'>
                            Importar Processos
                        </Typography>
                    </Stack>
                    <ProcessImportForm processImportHook={processImportHook} />
                </Stack>
            </Container>
        </Page>
    )
}