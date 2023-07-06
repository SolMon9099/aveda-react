import { IconButton, Box, Button, Container, MenuItem, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableRox from "src/components/table-rox/TableRox";
import Page from "src/components/Page";
import useCall from "./hooks/Calls.hook";
import { useSelector } from "src/redux/store";
import AdevaLoading from "src/components/AdevaLoading";
import CallModal from "./components/CallModal";
import { PATH_ERP } from "src/routes/paths"

export default function Calls(){
    const { callHook } = useCall()
    const { callList, isLoadingCallList } = useSelector((state) => state.call)
    const navigate = useNavigate()
    
    return(
        <Page title="atendimento">
            <Container maxWidth='lg' sx={{ mt: 3 }}>
            {isLoadingCallList ? (
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
            ) : (
                <>
                    <Stack spacing={3}>
                        <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Typography variant='h4'>
                                Atendimentos
                            </Typography>
                            <Button
                                onClick={() => navigate(PATH_ERP.callHandle)}
                                variant='contained'
                            >
                                Novo Atendimento
                            </Button>
                        </Stack>
                        
                        <TableRox
                            data={callList}
                            header={callHook.TABLEHEADER}
                            defaultOrderBy='name'
                            hasCount 
                            hasSearch 
                            hasFilter
                            hasDownloadPdf
                            hasDownloadExcel
                            hasRecord
                            labelCount="Atendimentos"
                        />
                    </Stack>
                </>
            )}
            <CallModal callHook={callHook}/>
            </Container>
        </Page>
    )
}