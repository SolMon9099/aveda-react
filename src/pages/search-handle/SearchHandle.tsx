import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import SearchHandleTabs from "./components/SearchHandleTabs";
import PhysicalPersonForm from "./components/PhysicalPersonForm";
import LegalPersonForm from "./components/LegalPersonForm";
import useSearchHandle from "./hooks/SearchHandle.hook";


export default function ProcessHandle(){
    const navigate = useNavigate()
    const { isLoadingCaseToEdit } = useSelector((state) => state.caseHandle)
    const { searchHandleHook } = useSearchHandle()
    
    return(
        <Page title={(searchHandleHook.isEdit ? "Editar " : "Novo ") + "Caso"}>
            <Container maxWidth='md' sx={{ mt: 3 }}>
                {(searchHandleHook.isEdit && isLoadingCaseToEdit) ?
                    <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                        <AdevaLoading/>
                    </Box>
                    :
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <IconButton color="primary" onClick={() => navigate((searchHandleHook.isEdit ? PATH_ERP.movimentatiosn + '/' + searchHandleHook.caseManualId : PATH_ERP.movimentatiosn))}>
                                <Iconify icon='material-symbols:arrow-back'/>
                            </IconButton>
                            <Typography variant='h4'>
                                {'Nova Pesquisa em Diários Oficiais'}
                            </Typography>
                        </Stack>
                        <SearchHandleTabs searchHandleHook={searchHandleHook} />
                        {searchHandleHook.currentTab === 1 && (
                            <PhysicalPersonForm searchHandleHook={searchHandleHook} />
                        )}
                        {searchHandleHook.currentTab === 2 && (
                            <LegalPersonForm searchHandleHook={searchHandleHook} />
                        )}
                        
                    </Stack>
                }
            </Container>
        </Page>
    )
}