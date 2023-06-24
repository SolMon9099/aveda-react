import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { PATH_ERP } from "src/routes/paths";
import ProcessDocumentForm from "./componets/ProcessDocumentForm";
import useProcessDocument from "./hooks/ProcessDocument.hook";



export default function ProcessDocument(){
    const navigate = useNavigate()
    const { processDocumentId, caseDocumentId } = useParams()
    const { processDocumentHook } = useProcessDocument()
    
    return(
        <Page title="Adicionar Documento">
            <Container maxWidth='md' sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <IconButton color="primary" onClick={() => processDocumentId ? navigate(PATH_ERP.process + '/' + processDocumentId) : navigate(PATH_ERP.case + '/' + caseDocumentId)}>
                            <Iconify icon='material-symbols:arrow-back'/>
                        </IconButton>
                        <Typography variant='h4'>
                            Adicionar Documento
                        </Typography>
                    </Stack>
                    <ProcessDocumentForm processDocumentHook={processDocumentHook} />
                </Stack>
            </Container>
        </Page>
    )
}