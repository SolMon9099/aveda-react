import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import ProcessForm from "./components/ProcessForm";
import useProcessHandle from "./hooks/ProcessHandle.hook";


export default function ProcessHandle(){
    const navigate = useNavigate()
    const { isLoadingProcessToEdit } = useSelector((state) => state.processHandle)
    const { processHandleHook } = useProcessHandle()
    
    return(
        <Page title={(processHandleHook.isEdit ? "Editar " : "Novo ") + "Processo"}>
            <Container maxWidth='md' sx={{ mt: 3 }}>
            {(processHandleHook.isEdit && isLoadingProcessToEdit) ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <IconButton color="primary" onClick={() => navigate((processHandleHook.isEdit ? PATH_ERP.process + '/' + processHandleHook.processManualId : PATH_ERP.process))}>
                            <Iconify icon='material-symbols:arrow-back'/>
                        </IconButton>
                        <Typography variant='h4'>
                            {(processHandleHook.isEdit ? "Editar " : "Novo ") + "Processo"}
                        </Typography>
                    </Stack>
                    <ProcessForm processHandleHook={processHandleHook} />
                </Stack>
            }
            </Container>
        </Page>
    )
}