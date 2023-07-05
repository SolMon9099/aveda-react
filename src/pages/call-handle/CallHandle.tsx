import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import CallForm from "./components/CallForm";
import useCallHandle from "./hooks/CallHandle.hook";


export default function CallHandle(){
    const navigate = useNavigate()
    const { isLoadingCallToEdit } = useSelector((state) => state.callHandle)
    const { callHandleHook } = useCallHandle()
    
    return(
        <Page title={(callHandleHook.isEdit ? "Editar " : "Novo ") + "Callo"}>
            <Container maxWidth='md' sx={{ mt: 3 }}>
            {(callHandleHook.isEdit && isLoadingCallToEdit) ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :
                <Stack spacing={3}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <IconButton color="primary" onClick={() => navigate((callHandleHook.isEdit ? PATH_ERP.calls + '/' + callHandleHook.callManualId : PATH_ERP.calls))}>
                            <Iconify icon='material-symbols:arrow-back'/>
                        </IconButton>
                        <Typography variant='h4'>
                            {(callHandleHook.isEdit ? "Editar " : "Novo ") + "Atendimento"}
                        </Typography>
                    </Stack>
                    <CallForm callHandleHook={callHandleHook} />
                </Stack>
            }
            </Container>
        </Page>
    )
}