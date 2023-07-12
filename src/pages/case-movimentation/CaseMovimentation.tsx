import { Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { PATH_ERP } from "src/routes/paths";
import ProcessMovimentationForm from "./components/CaseMovimentationForm";
import useProcessMovimentation from "./hooks/CaseMovimentation.hook";


export default function ProcessMovimentation(){
    const navigate = useNavigate()
    const { processMovimentationHook } = useProcessMovimentation()
    const { caseMovimentationId, type } = useParams()
    
    return(
        <Page title="Adicionar Documento">
            <Container maxWidth='md' sx={{ mt: 3 }}>
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <IconButton color="primary" onClick={() => navigate(PATH_ERP.case + '/' + caseMovimentationId)}>
                            <Iconify icon='material-symbols:arrow-back'/>
                        </IconButton>
                        <Typography variant='h4'>
                            Adicionar Movimentação
                        </Typography>
                    </Stack>
                    <ProcessMovimentationForm processMovimentationHook={processMovimentationHook} type={type ?? ''} />
                </Stack>
            </Container>
        </Page>
    )
}