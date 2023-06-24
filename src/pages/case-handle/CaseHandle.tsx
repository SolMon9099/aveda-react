import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import CaseForm from "./components/CaseForm";
import useCaseHandle from "./hooks/CaseHandle.hook";


export default function ProcessHandle(){
    const navigate = useNavigate()
    const { isLoadingCaseToEdit } = useSelector((state) => state.caseHandle)
    const { caseHandleHook } = useCaseHandle()
    
    return(
        <Page title={(caseHandleHook.isEdit ? "Editar " : "Novo ") + "Caso"}>
            <Container maxWidth='md' sx={{ mt: 3 }}>
            {(caseHandleHook.isEdit && isLoadingCaseToEdit) ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <IconButton color="primary" onClick={() => navigate((caseHandleHook.isEdit ? PATH_ERP.case + '/' + caseHandleHook.caseManualId : PATH_ERP.process))}>
                            <Iconify icon='material-symbols:arrow-back'/>
                        </IconButton>
                        <Typography variant='h4'>
                            {(caseHandleHook.isEdit ? "Editar " : "Novo ") + "Caso"}
                        </Typography>
                    </Stack>
                    <CaseForm caseHandleHook={caseHandleHook} />
                </Stack>
            }
            </Container>
        </Page>
    )
}