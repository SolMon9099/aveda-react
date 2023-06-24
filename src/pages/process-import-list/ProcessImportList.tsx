import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdevaLoading from "src/components/AdevaLoading";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import TableRox from "src/components/table-rox/TableRox";
import { useSelector } from "src/redux/store";
import { PATH_ERP } from "src/routes/paths";
import useProcessImportList from "./hooks/ProcessImportList.hook";


export default function ProcessImportList(){
    const navigate = useNavigate()
    const { processImportList, isLoadingProcessImportList } = useSelector((state) => state.processImportList)
    const { processImportListHook } = useProcessImportList()
    
    return(
        <Page title='Lotes de Processos Importados'>
            <Container maxWidth='lg' sx={{ mt: 3 }}>
            {isLoadingProcessImportList ?
                <Box flexGrow={1} display='flex' justifyContent='center' sx={{mt: 40}}>
                    <AdevaLoading/>
                </Box>
                :
                <Stack spacing={3}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <IconButton color="primary" onClick={() => navigate(PATH_ERP.process)}>
                                <Iconify icon='material-symbols:arrow-back'/>
                            </IconButton>
                            <Typography variant='h4'>
                                Lotes de Processos Importados
                            </Typography>
                        </Stack>
                        <Button
                            variant='contained'
                            onClick={() => navigate(PATH_ERP.importProcess)}
                        >
                            Nova Importação
                        </Button>
                    </Stack>
                    <TableRox
                        header={processImportListHook.TABLE_HEADER}
                        data={processImportList}
                        defaultOrderBy='tribunal'
                        onClickKey="_id"
                        onClickFunction={(id) => navigate(PATH_ERP.importProcess + '/' + id)}
                    />
                </Stack>
            }
            </Container>
        </Page>
    )
}